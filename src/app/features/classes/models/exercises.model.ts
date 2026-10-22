export interface ExerciseResponse {
  message: string;
  totalExercises: number;
  totalPages: number;
  currentPage: number;
  exercises: Exercise[];
}

export interface Exercise {
  _id: string;
  exercise: string;
  short_youtube_demonstration: ShortYoutubeDemonstration | null;
  in_depth_youtube_explanation: InDepthYoutubeExplanation | null;
  difficulty_level: DifficultyLevel;
  target_muscle_group: string;
  prime_mover_muscle: string;
  secondary_muscle: null;
  tertiary_muscle: null;
  primary_equipment: string;
  _primary_items: number;
  secondary_equipment: SecondaryEquipment | null;
  _secondary_items: number;
  posture: string;
  single_or_double_arm: SingleOrDoubleArm;
  continuous_or_alternating_arms: ContinuousOrAlternating;
  grip: string;
  load_position_ending: LoadPositionEnding;
  continuous_or_alternating_legs: ContinuousOrAlternating;
  foot_elevation: FootElevation;
  combination_exercises: CombinationExercises;
  movement_pattern_1: null | string;
  movement_pattern_2: null | string;
  movement_pattern_3: null;
  plane_of_motion_1: PlaneOfMotion;
  plane_of_motion_2: PlaneOfMotion | null;
  plane_of_motion_3: null;
  body_region: BodyRegion;
  force_type: ForceType;
  mechanics: Mechanics;
  laterality: Laterality;
  primary_exercise_classification: PrimaryExerciseClassification;
  short_youtube_demonstration_link: null | string;
  in_depth_youtube_explanation_link: null | string;
}

export enum BodyRegion {
  FullBody = 'Full Body',
  LowerBody = 'Lower Body',
  Midsection = 'Midsection',
  UpperBody = 'Upper Body',
}

export enum CombinationExercises {
  SingleExercise = 'Single Exercise',
}

export enum ContinuousOrAlternating {
  Alternating = 'Alternating',
  Continuous = 'Continuous',
}

export enum DifficultyLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Novice = 'Novice',
  Expert = 'Expert',
}

export enum FootElevation {
  FeetElevated = 'Feet Elevated',
  FootElevated = 'Foot Elevated',
  FootElevatedSide = 'Foot Elevated (Side)',
  NoElevation = 'No Elevation',
}

export enum ForceType {
  Other = 'Other',
  Pull = 'Pull',
  Push = 'Push',
  Unsorted = 'Unsorted*',
}

export enum InDepthYoutubeExplanation {
  VideoExplanation = 'Video Explanation',
}

export enum Laterality {
  Bilateral = 'Bilateral',
  Contralateral = 'Contralateral',
  Ipsilateral = 'Ipsilateral',
  Unilateral = 'Unilateral',
}

export enum LoadPositionEnding {
  FrontRack = 'Front Rack',
  HipCrease = 'Hip Crease',
  NoLoad = 'No Load',
  Other = 'Other',
  Overhead = 'Overhead',
  Suitcase = 'Suitcase',
}

export enum Mechanics {
  Compound = 'Compound',
  Isolation = 'Isolation',
}

export enum PlaneOfMotion {
  FrontalPlane = 'Frontal Plane',
  SagittalPlane = 'Sagittal Plane',
  TransversePlane = 'Transverse Plane',
}

export enum PrimaryExerciseClassification {
  AnimalFlow = 'Animal Flow',
  Bodybuilding = 'Bodybuilding',
  Calisthenics = 'Calisthenics',
  Grinds = 'Grinds',
  Postural = 'Postural',
  Unsorted = 'Unsorted*',
}

export enum SecondaryEquipment {
  BenchFlat = 'Bench (Flat)',
  Dumbbell = 'Dumbbell',
  Kettlebell = 'Kettlebell ',
}

export enum ShortYoutubeDemonstration {
  VideoDemonstration = 'Video Demonstration',
}

export enum SingleOrDoubleArm {
  DoubleArm = 'Double Arm',
  NoArms = 'No Arms',
  SingleArm = 'Single Arm',
}
