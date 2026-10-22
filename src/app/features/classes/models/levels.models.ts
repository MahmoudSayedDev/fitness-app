export interface AllLevelsResponse {
  message: string;
  levels: Level[];
}

export interface unformatedLevelsByWorkoutResponse {
  message: string;
  totalLevels: number;
  difficulty_levels: unformatedLevel[];
}

export interface LevelsByWorkoutResponse {
  message: string;
  totalLevels: number;
  difficulty_levels: Level[];
}

export interface unformatedLevel {
  id: string;
  name: string;
}

export interface Level {
  _id: string;
  name: string;
}
