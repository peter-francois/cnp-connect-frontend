import type { TrainInterface } from "./TrainInterface";

export interface AssignedTrain {
  trainId: number;
  userId: string;
  assignmentStartDate: Date;
  assignmentEndDate?: Date;
  createdAt: Date;
  train: TrainInterface;
}
