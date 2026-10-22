import { DestroyRef, inject, Service, signal } from '@angular/core';
import { ClassesApiService } from './classes-api.service';
import { Muscle } from '../models/classes.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { DifficultyLevel, Exercise } from '../models/exercises.model';
import { Level } from '../models/levels.models';

@Service()
export class ClassesFacadeService {
  private readonly _classesApi = inject(ClassesApiService);
  private readonly _destroyRef = inject(DestroyRef);

  private _loadMusclesLoading = signal<boolean>(false);
  loadMusclesLoading = this._loadMusclesLoading.asReadonly();

  private _loadWorkoutsLoading = signal<boolean>(false);
  loadWorkoutsLoading = this._loadWorkoutsLoading.asReadonly();

  private _loadExercisesLoading = signal<boolean>(false);
  loadExercisesLoading = this._loadExercisesLoading.asReadonly();

  private _loadLevelsLoading = signal<boolean>(false);
  loadLevelsLoading = this._loadLevelsLoading.asReadonly();

  private _musclesCache: Muscle[] = [];
  private _workoutsCache = new Map<string, Muscle[]>();
  private _exercisesCache = new Map<string, Exercise[]>();
  private _levelsCache = new Map<string, Level[]>();

  private _muscles = signal<Muscle[]>([]);
  muscles = this._muscles.asReadonly();

  private _workouts = signal<Muscle[]>([]);
  workouts = this._workouts.asReadonly();

  private _exercises = signal<Exercise[]>([]);
  exercises = this._exercises.asReadonly();

  private _levels = signal<Level[]>([]);
  levels = this._levels.asReadonly();

  private _selectedMuscle = signal<Muscle | null>(null);
  selectedMuscle = this._selectedMuscle.asReadonly();

  private _selectedWorkout = signal<Muscle | null>(null);
  selectedWorkout = this._selectedWorkout.asReadonly();

  private _selectedExercise = signal<Exercise | null>(null);
  selectedExercise = this._selectedExercise.asReadonly();

  private _selectedLevel = signal<Level | null>(null);
  selectedLevel = this._selectedLevel.asReadonly();

  loadMuscles(): void {
    const hasCache = this._musclesCache.length > 0;

    if (hasCache) {
      this._muscles.set(this._musclesCache);
      return;
    }

    this._loadMusclesLoading.set(true);

    this._classesApi
      .loadMuscles()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadMusclesLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          const list = res.musclesGroup;
          this._muscles.set(list);
          this._musclesCache = list;

          if (list.length > 0) {
            this._selectedMuscle.set(list[0]);
            this.loadWorkouts(list[0]._id);
          }
        },
      });
  }

  loadWorkouts(muscleId: string): void {
    this._loadWorkoutsLoading.set(true);

    this._classesApi
      .loadWorkouts(muscleId)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadWorkoutsLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          // const mapped: MuscleGroupWorkout[] = (res.muscles ?? []).map((item) => ({
          //   _id: item._id,
          //   title: item.name,
          //   image: item.image,
          // }));
          this._workouts.set(res.muscles);
          this._workoutsCache.set(muscleId, res.muscles);
          this._selectedWorkout.set(res.muscles[0]);
          // this.loadWorkoutLevels(mapped[0]._id);
          // this.loadExercises(mapped[0]._id);
        },
      });
  }

  private createExerciseKey(workoutId: string, difficultyId: string): string {
    return `${workoutId}_${difficultyId}`;
  }

  setExercisesCache(workoutId: string, difficultyId: string, exercises: Exercise[]): void {
    const key = this.createExerciseKey(workoutId, difficultyId);
    this._exercisesCache.set(key, exercises);
  }

  loadExercises(workoutId: string = this.workouts()[0]._id, difficultyLevelId: string): void {
    this._loadExercisesLoading.set(true);

    this._classesApi
      .loadExercisesByWorkoutAndDifficulty(workoutId, difficultyLevelId)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadExercisesLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._exercises.set(res.exercises);
          this.setExercisesCache(workoutId, difficultyLevelId, res.exercises);
        },
      });
  }

  loadWorkoutLevels(
    workoutId: string = this.selectedWorkout()?._id ?? this.workouts()[0]._id,
  ): void {
    const hasCache = this._levelsCache.has(workoutId);

    if (hasCache) {
      this._levels.set(this._levelsCache.get(workoutId)!);
      return;
    }

    this._loadLevelsLoading.set(true);

    this._classesApi
      .loadWorkoutLevels(workoutId)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadLevelsLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._levels.set(res.difficulty_levels);
          this._selectedLevel.set(this._levels()[0]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  selectMuscle(muscle: Muscle, initial: boolean = false): void {
    const hasCache = this._workoutsCache.has(muscle._id);
    const refetch = muscle._id === this._selectedMuscle()?._id;

    if (hasCache && !refetch) {
      this._workouts.set(this._workoutsCache.get(muscle._id)!);
      this._selectedMuscle.set(muscle);
    } else {
      this._selectedMuscle.set(muscle);
      this.loadWorkouts(muscle._id);
    }
  }

  selectWorkout(workout: Muscle): void {
    const hasCache = this._exercisesCache.has(workout._id);

    if (hasCache) {
      this._exercises.set(this._exercisesCache.get(workout._id)!);
      this._selectedWorkout.set(workout);
    } else {
      this._selectedWorkout.set(workout);
      this.loadExercises(workout._id, DifficultyLevel.Beginner);
    }
  }

  selectLevel(level: Level): void {
    const key = this.createExerciseKey(this.selectedWorkout()?._id!, level._id);
    const hasCache = this._exercisesCache.has(key);

    if (hasCache) {
      this._exercises.set(this._exercisesCache.get(key)!);
      this._selectedLevel.set(level);
    } else {
      this.loadExercises(this.selectedWorkout()?._id!, level._id);
      this._selectedLevel.set(level);
    }
  }

  loadExercisesFromWorkout(workoutId: string): void {
    this._classesApi
      .loadExercisesFromWorkout(workoutId)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadExercisesLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._levels.set(res.levels);
          this._exercises.set(res.exercises);
          this._selectedLevel.set(res.levels[0]);
          this._selectedExercise.set(res.exercises[0]);
        },
      });
  }

  loadExercisesFromMuscle(muscleId: string): void {
    this._classesApi
      .loadExercisesFromMuscle(muscleId)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadExercisesLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._workouts.set(res.workouts);
          this._levels.set(res.levels);
          this._exercises.set(res.exercises);
          this._selectedWorkout.set(res.workouts[0]);
          this._selectedLevel.set(res.levels[0]);
          this._selectedExercise.set(res.exercises[0]);
        },
      });
  }
}
