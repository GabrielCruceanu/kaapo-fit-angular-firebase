import { AppointmentStatus } from '@/app/appointment/model/appointment.interface';

export class Appointment {
  appointmentId: string;
  trainerId?: string; // Optional field
  nutritionistId?: string; // Optional field
  clientId: string;
  gymId?: string; // Optional field
  startTime: Date; // Using JavaScript Date object for timestamp
  endTime: Date; // Using JavaScript Date object for timestamp
  status: string;
  notes?: string; // Optional field

  constructor(
    appointmentId: string,
    clientId: string,
    startTime: Date,
    endTime: Date,
    status: AppointmentStatus,
    nutritionistId?: string,
    trainerId?: string,
    gymId?: string,
    notes?: string
  ) {
    this.appointmentId = appointmentId;
    this.clientId = clientId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.nutritionistId = nutritionistId;
    this.trainerId = trainerId;
    this.gymId = gymId;
    this.notes = notes;
  }
}
