import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { MusclesResponse, WorkoutResponse } from '../models/classes.model';
import { MY_TOKEN } from '../../../core/tokens/app-config.token';
import { map, Observable } from 'rxjs';
import { ExerciseResponse } from '../models/exercises.model';
import {
  AllLevelsResponse,
  Level,
  LevelsByWorkoutResponse,
  UnformatedLevelsByWorkoutResponse,
} from '../models/levels.models';

@Service()
export class ClassesApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _api = inject(MY_TOKEN);

  loadMuscles(): Observable<MusclesResponse> {
    return this._httpClient.get<MusclesResponse>(`${this._api}/muscles`);
  }

  loadWorkouts(muscleId: string): Observable<WorkoutResponse> {
    return this._httpClient.get<WorkoutResponse>(`${this._api}/musclesGroup/${muscleId}`);
  }

  loadExercisesByWorkoutAndDifficulty(
    workoutId: string,
    difficultyLevelId: string,
  ): Observable<ExerciseResponse> {
    return this._httpClient.get<ExerciseResponse>(`${this._api}/exercises/by-muscle-difficulty`, {
      params: { primeMoverMuscleId: workoutId, difficultyLevelId },
    });
  }

  loadAllLevels(): Observable<AllLevelsResponse> {
    return this._httpClient.get<AllLevelsResponse>(`${this._api}/levels`);
  }

  loadWorkoutLevels(workoutId: string): Observable<LevelsByWorkoutResponse> {
    return this._httpClient
      .get<UnformatedLevelsByWorkoutResponse>(
        `${this._api}/levels/difficulty-levels/by-prime-mover`,
        { params: { primeMoverMuscleId: workoutId } },
      )
      .pipe(
        map((res) => ({
          ...res,
          difficulty_levels: res.difficulty_levels.map((level): Level => ({
            _id: level.id,
            name: level.name,
          })),
        })),
      );
  }
}
