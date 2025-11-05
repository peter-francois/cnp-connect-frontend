import type { TrainInterface } from "./TrainInterface";

export interface AssignedTrainInterface {
  trainId: number;
  userId: string;
  assignmentStartDate: Date;
  assignmentEndDate?: Date;
  createdAt: Date;
  train: TrainInterface;
}
