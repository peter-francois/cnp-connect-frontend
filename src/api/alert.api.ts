
import type { UseFormNewAlert } from "../types/formSchema/newAlertSchema";
import type { AlertInterface } from "../types/interfaces/AlertInterface";
import { axiosClient } from "../utils/axiosClient";

const api = axiosClient();

export const addAlert = async (
  body: UseFormNewAlert
): Promise<AlertInterface> => {
  const { data } = await api.post<AlertInterface>("/api/alerts", body);
  return data;
};


