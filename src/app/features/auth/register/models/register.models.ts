export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: Gender;
  height: number;
  weight: number;
  age: number;
  goal: Goal;
  activityLevel: ActivityLevel;
}

export type Gender = 'male' | 'female';

export type Goal =
  'Gain weight' | 'Lose weight' | 'Get fitter' | 'Gain more flexible' | 'Learn the basic';

export type ActivityLevel = 'level1' | 'level2' | 'level3' | 'level4' | 'level5';

export type RegisterAccountData = Pick<
  RegistrationData,
  'firstName' | 'lastName' | 'email' | 'password' | 'rePassword'
>;

export type RegisterGenderData = Pick<RegistrationData, 'gender'>;

export type RegisterAgeData = Pick<RegistrationData, 'age'>;

export type RegisterWeightData = Pick<RegistrationData, 'weight'>;

export type RegisterHeightData = Pick<RegistrationData, 'height'>;

export type RegisterGoalData = Pick<RegistrationData, 'goal'>;

export type RegisterActivityData = Pick<RegistrationData, 'activityLevel'>;
