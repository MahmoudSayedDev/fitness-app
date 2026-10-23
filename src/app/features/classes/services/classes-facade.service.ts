import { computed, inject, Service, signal, WritableSignal } from '@angular/core';
import { ClassesApiService } from './classes-api.service';
import { Muscle } from '../models/classes.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize, Observable, switchMap } from 'rxjs';
import { Exercise } from '../models/exercises.model';
import { Level } from '../models/levels.models';
import { LanguageSwitcherService } from '../../../shared/components/language-switcher/services/language-switcher.service';

@Service()
export class ClassesFacadeService {
  private readonly _classesApi = inject(ClassesApiService);
  private readonly _lang = inject(LanguageSwitcherService);

  // ---------- data ----------
  private readonly _muscles = signal<Muscle[]>([]);
  private readonly _workouts = signal<Muscle[]>([]);
  private readonly _exercises = signal<Exercise[]>([]);
  private readonly _levels = signal<Level[]>([]);

  readonly muscles = this._muscles.asReadonly();
  readonly workouts = this._workouts.asReadonly();
  readonly exercises = this._exercises.asReadonly();
  readonly levels = this._levels.asReadonly();

  // ---------- selection: store ids, derive objects ----------
  private readonly _selectedMuscleId = signal<string | null>(null);
  private readonly _selectedWorkoutId = signal<string | null>(null);
  private readonly _selectedExerciseId = signal<string | null>(null);
  private readonly _selectedLevelId = signal<string | null>(null);

  readonly selectedMuscle = computed(
    () => this._muscles().find((m) => m._id === this._selectedMuscleId()) ?? null,
  );
  readonly selectedWorkout = computed(
    () => this._workouts().find((w) => w._id === this._selectedWorkoutId()) ?? null,
  );
  readonly selectedLevel = computed(
    () => this._levels().find((l) => l._id === this._selectedLevelId()) ?? null,
  );
  readonly selectedExercise = computed(
    () => this._exercises().find((e) => e._id === this._selectedExerciseId()) ?? null,
  );

  // ---------- loading / error ----------
  private readonly _loadMusclesLoading = signal<boolean>(false);
  private readonly _loadWorkoutsLoading = signal<boolean>(false);
  private readonly _loadLevelsLoading = signal<boolean>(false);
  private readonly _loadExercisesLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly loadMusclesLoading = this._loadMusclesLoading.asReadonly();
  readonly loadWorkoutsLoading = this._loadWorkoutsLoading.asReadonly();
  readonly loadLevelsLoading = this._loadLevelsLoading.asReadonly();
  readonly loadExercisesLoading = this._loadExercisesLoading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor() {
    const lang = this._lang.currentLang;

    // 1. muscles: reload when the language changes
    toObservable(lang)
      .pipe(
        switchMap(() => this.fetch(this._classesApi.loadMuscles(), this._loadMusclesLoading)),
        takeUntilDestroyed(),
      )
      .subscribe((res) => {
        this._muscles.set(res.musclesGroup);
        this._selectedMuscleId.update((id) => this.keepOrFirst(res.musclesGroup, id));
      });

    // 2. workouts: reload when the muscle OR the language changes
    toObservable(computed(() => ({ muscleId: this._selectedMuscleId(), lang: lang() })))
      .pipe(
        switchMap(
          ({ muscleId }) =>
            muscleId
              ? this.fetch(this._classesApi.loadWorkouts(muscleId), this._loadWorkoutsLoading)
              : EMPTY, // EMPTY (not filter) so an in-flight request is cancelled
        ),
        takeUntilDestroyed(),
      )
      .subscribe((res) => {
        this._workouts.set(res.muscles);
        this._selectedWorkoutId.update((id) => id ?? res.muscles[0]?._id ?? null);
      });

    // 3. levels
    toObservable(computed(() => ({ workoutId: this._selectedWorkoutId(), lang: lang() })))
      .pipe(
        switchMap(({ workoutId }) =>
          workoutId
            ? this.fetch(this._classesApi.loadWorkoutLevels(workoutId), this._loadLevelsLoading)
            : EMPTY,
        ),
        takeUntilDestroyed(),
      )
      .subscribe((res) => {
        this._levels.set(res.difficulty_levels);
        this._selectedLevelId.update((id) => this.keepOrFirst(res.difficulty_levels, id));
      });

    // 4. exercises
    toObservable(
      computed(() => ({
        workoutId: this._selectedWorkoutId(),
        levelId: this._selectedLevelId(),
        lang: lang(),
      })),
    )
      .pipe(
        switchMap(({ workoutId, levelId }) =>
          workoutId && levelId
            ? this.fetch(
                this._classesApi.loadExercisesByWorkoutAndDifficulty(workoutId, levelId),
                this._loadExercisesLoading,
              )
            : EMPTY,
        ),
        takeUntilDestroyed(),
      )
      .subscribe((res) => {
        this._exercises.set(res.exercises);
        this._selectedExerciseId.update((id) => this.keepOrFirst(res.exercises, id));
      });
  }

  // ---------- user actions ----------
  selectMuscle(muscleId: string): void {
    if (muscleId === this._selectedMuscleId()) return;
    this._selectedMuscleId.set(muscleId);
    this.resetFromWorkouts();
  }

  selectWorkout(workoutId: string): void {
    if (workoutId === this._selectedWorkoutId()) return;
    this._selectedWorkoutId.set(workoutId);
    this.resetFromLevels();
  }

  selectLevel(levelId: string): void {
    if (levelId === this._selectedLevelId()) return;
    this._selectedLevelId.set(levelId);
    this._exercises.set([]);
    this._selectedExerciseId.set(null);
  }

  selectExercise(exerciseId: string): void {
    this._selectedExerciseId.set(exerciseId);
  }

  // ---------- helpers ----------
  /** Keep the current selection if it still exists in the new list, otherwise pick the first. */
  private keepOrFirst<T extends { _id?: string }>(
    list: T[],
    currentId: string | null,
  ): string | null {
    return list.some((item) => item._id === currentId) ? currentId : (list[0]?._id ?? null);
  }

  /** Wraps a request with loading + error handling. */
  private fetch<T>(request$: Observable<T>, loading: WritableSignal<boolean>): Observable<T> {
    loading.set(true);
    this._error.set(null);
    return request$.pipe(
      catchError(() => {
        this._error.set('Something went wrong. Please try again.');
        return EMPTY;
      }),
      finalize(() => loading.set(false)),
    );
  }

  private resetFromWorkouts(): void {
    this._workouts.set([]);
    this._selectedWorkoutId.set(null);
    this.resetFromLevels();
  }

  private resetFromLevels(): void {
    this._levels.set([]);
    this._selectedLevelId.set(null);
    this._exercises.set([]);
    this._selectedExerciseId.set(null);
  }
}
