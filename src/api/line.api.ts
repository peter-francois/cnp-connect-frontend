import axios from "axios";
import type { LineInterface } from "../types/interfaces/LineInterface";
const url = "/data/line.json";

export const getLines = async (): Promise<LineInterface[]> => {
  try {
    const res = await axios.get<LineInterface[]>(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
