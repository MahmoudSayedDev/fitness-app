export interface Muscle {
  _id: string;
  name: string;
  image?: string;
}

export interface MusclesResponse {
  message: string;
  musclesGroup: Muscle[];
}

export interface WorkoutResponse {
  message: string;
  muscleGroup: Muscle;
  muscles: Muscle[];
}
