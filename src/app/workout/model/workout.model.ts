// Define an enum for workout statuses
export enum WorkoutStatus {
  Assigned = 'Assigned',
  Completed = 'Completed',
  Pending = 'Pending',
  InProgress = 'InProgress',
}

export class Workout {
  workoutId: string;
  creatorId: string;
  assignedToId: string;
  dateCreated: Date; // Using JavaScript Date object for timestamp
  dateAssigned?: Date; // Optional field
  status: WorkoutStatus;
  exercises: string[]; // Array of exercise IDs
  notes?: string; // Optional field

  constructor(
    workoutId: string,
    creatorId: string,
    assignedToId: string,
    dateCreated: Date,
    status: WorkoutStatus,
    exercises: string[],
    dateAssigned?: Date,
    notes?: string
  ) {
    this.workoutId = workoutId;
    this.creatorId = creatorId;
    this.assignedToId = assignedToId;
    this.dateCreated = dateCreated;
    this.status = status;
    this.exercises = exercises;
    this.dateAssigned = dateAssigned;
    this.notes = notes;
  }
}
