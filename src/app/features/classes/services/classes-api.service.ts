import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Muscle, MusclesResponse, WorkoutResponse } from '../models/classes.model';
import { MY_TOKEN } from '../../../core/tokens/app-config.token';
import { concatMap, map, Observable } from 'rxjs';
import { Exercise, ExerciseResponse } from '../models/exercises.model';
import { AllLevelsResponse, Level, LevelsByWorkoutResponse, unformatedLevelsByWorkoutResponse } from '../models/levels.models';

@Service()
export class ClassesApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _api = inject(MY_TOKEN);

  loadMuscles(lang: 'en' | 'ar' = 'en'): Observable<MusclesResponse> {
    return this._httpClient.get<MusclesResponse>(`${this._api}/muscles`, {
      headers: { 'accept-language': lang },
    });
  }

  loadWorkouts(muscleId: string, lang: 'en' | 'ar' = 'en'): Observable<WorkoutResponse> {
    return this._httpClient.get<WorkoutResponse>(`${this._api}/musclesGroup/${muscleId}`, {
      headers: { 'accept-language': lang },
    });
  }

  loadExercisesByWorkoutAndDifficulty(
    workoutId: string,
    difficultyLevelId: string,
    lang: 'en' | 'ar' = 'en',
  ): Observable<ExerciseResponse> {
    return this._httpClient.get<ExerciseResponse>(
      `${this._api}/exercises/by-muscle-difficulty?primeMoverMuscleId=${workoutId}&difficultyLevelId=${difficultyLevelId}`,
      {
        headers: { 'accept-language': lang },
        params: { primeMoverMuscleId: workoutId, difficultyLevelId: difficultyLevelId },
      },
    );
  }

  loadAllLevels(lang: 'en' | 'ar' = 'en'): Observable<AllLevelsResponse> {
    return this._httpClient.get<AllLevelsResponse>(`${this._api}/levels`, {
      headers: { 'accept-language': lang },
    });
  }

  loadWorkoutLevels(
    workoutId: string,
    lang: 'en' | 'ar' = 'en',
  ): Observable<LevelsByWorkoutResponse> {
    return this._httpClient
      .get<unformatedLevelsByWorkoutResponse>(
        `${this._api}/levels/difficulty-levels/by-prime-mover?primeMoverMuscleId=${workoutId}`,
        {
          headers: { 'accept-language': lang },
        },
      )
      .pipe(
        map((res) => {
          const newLevels: Level[] = res.difficulty_levels.map((level) => ({
            _id: level.id,
            name: level.name,
          }));

          return { ...res, difficulty_levels: newLevels };
        }),
      );
  }

  loadExercisesFromWorkout(
    workoutId: string,
  ): Observable<{ levels: Level[]; exercises: Exercise[] }> {
    return this.loadWorkoutLevels(workoutId).pipe(
      concatMap((levelsRes) => {
        const levelId: string = levelsRes.difficulty_levels[0]._id;

        return this.loadExercisesByWorkoutAndDifficulty(workoutId, levelId).pipe(
          map((exercisesRes) => ({
            levels: levelsRes.difficulty_levels,
            exercises: exercisesRes.exercises,
          })),
        );
      }),
    );
  }

  loadExercisesFromMuscle(
    muscleId: string,
  ): Observable<{ workouts: Muscle[]; levels: Level[]; exercises: Exercise[] }> {
    return this.loadWorkouts(muscleId).pipe(
      concatMap((workoutRes) => {
        const workoutId: string = workoutRes.muscles[0]._id;

        return this.loadWorkoutLevels(workoutId).pipe(
          concatMap((levelsRes) => {
            const levelId: string = levelsRes.difficulty_levels[0]._id;

            return this.loadExercisesByWorkoutAndDifficulty(workoutId, levelId).pipe(
              map((exercisesRes) => ({
                workouts: workoutRes.muscles,
                levels: levelsRes.difficulty_levels,
                exercises: exercisesRes.exercises,
              })),
            );
          }),
        );
      }),
    );
  }
}
