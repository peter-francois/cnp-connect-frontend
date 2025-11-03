import axios from "axios";
import type { TrainInterface } from "../types/interfaces/TrainInterface";
const url = "/data/train.json";

export const getTrains = async (): Promise<TrainInterface[]> => {
  try {
    const res = await axios.get<TrainInterface[]>(url);
    return res.data;
  } catch {
    throw new Error("Not found");
    // return [];
  }
};
