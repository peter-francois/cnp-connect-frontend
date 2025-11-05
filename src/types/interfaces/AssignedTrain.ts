import type { TrainInterface } from "./TrainInterface";

export interface AssignedTrainsInterface {
  trainId: number;
  userId: string;
  assignmentStartDate: Date;
  assignmentEndDate?: Date;
  createdAt: Date;
  train: TrainInterface;
}
