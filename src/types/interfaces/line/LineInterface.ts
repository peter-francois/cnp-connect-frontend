import type { TrainInterface } from "../train/TrainInterface";

export interface LineInterface {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  trains: TrainInterface[];
}
