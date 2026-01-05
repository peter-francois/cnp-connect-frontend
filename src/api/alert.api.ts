import type { UseFormNewAlert } from "../types/formSchema/newAlertSchema";
import type { AlertInterface } from "../types/interfaces/AlertInterface";
import type { ResponseInterface } from "../types/interfaces/responseInterface.types";
import { axiosClient } from "../utils/axiosClient";

const api = axiosClient();

export const addAlertApi = async (body: UseFormNewAlert): Promise<ResponseInterface<AlertInterface>> => {
  const { data } = await api.post<ResponseInterface<AlertInterface>>("/api/alerts", body);
  return data;
};
