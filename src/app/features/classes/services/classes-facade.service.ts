import { DestroyRef, inject, Service, signal } from '@angular/core';
import { ClassesApiService } from './classes-api.service';
import { Muscle } from '../models/classes.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Exercise } from '../models/exercises.model';
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

  loadMuscles(sequence: boolean = true): void {
    this._loadMusclesLoading.set(true);

    this._classesApi
      .loadMuscles()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadMusclesLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._muscles.set(res.musclesGroup);
          this._selectedMuscle.set(res.musclesGroup[0]);

          if (sequence) this.loadWorkouts(res.musclesGroup[0]._id);
        },
      });
  }

  loadWorkouts(muscleId: string, sequence: boolean = true): void {
    this._loadWorkoutsLoading.set(true);

    this._classesApi
      .loadWorkouts(muscleId)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._loadWorkoutsLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._workouts.set(res.muscles);
          this._selectedWorkout.set(res.muscles[0]);

          if (sequence) this.loadWorkoutLevels(res.muscles[0]._id);
        },
      });
  }

  loadWorkoutLevels(workoutId: string, sequence: boolean = true): void {
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
          this._selectedLevel.set(res.difficulty_levels[0]);

          if (sequence) this.loadExercises(workoutId, res.difficulty_levels[0]._id!);
        },
      });
  }

  loadExercises(workoutId: string, difficultyLevelId: string): void {
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
          this._selectedExercise.set(res.exercises[0]);
        },
      });
  }

  selectMuscle(muscle: Muscle, sequence: boolean = true): void {
    this._selectedMuscle.set(muscle);
    this.loadWorkouts(muscle._id, sequence);
  }

  selectWorkout(workout: Muscle, sequence: boolean = true): void {
    this._selectedWorkout.set(workout);
    this.loadWorkoutLevels(workout._id, sequence);
  }

  selectLevel(level: Level, workoutId: string): void {
    this._selectedLevel.set(level);
    this.loadExercises(workoutId, level._id);
  }

  selectExercise(exercise: Exercise): void {
    this._selectedExercise.set(exercise);
  }
}
