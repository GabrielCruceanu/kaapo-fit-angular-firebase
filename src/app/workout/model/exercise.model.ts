// Define an enum for exercise categories
export enum ExerciseCategory {
  Cardio = 'Cardio',
  Strength = 'Strength',
  Flexibility = 'Flexibility',
  Balance = 'Balance',
}

export class Exercise {
  exerciseId: string;
  name: string;
  category: ExerciseCategory;
  equipmentNeeded?: string; // Optional field
  instructions: string;
  duration: string;
  imageURL?: string; // Optional field
  videoURL?: string; // Optional field

  constructor(
    exerciseId: string,
    name: string,
    category: ExerciseCategory,
    instructions: string,
    duration: string,
    equipmentNeeded?: string,
    imageURL?: string,
    videoURL?: string
  ) {
    this.exerciseId = exerciseId;
    this.name = name;
    this.category = category;
    this.instructions = instructions;
    this.duration = duration;
    this.equipmentNeeded = equipmentNeeded;
    this.imageURL = imageURL;
    this.videoURL = videoURL;
  }
}
