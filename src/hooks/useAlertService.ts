import { useMutation } from "@tanstack/react-query";
import { addAlertApi } from "../api/alert.api";
import type { AlertInterface } from "../types/interfaces/AlertInterface";

export const useAlertService = () => {
  const NewAlert = () =>
    useMutation({
      mutationFn: (data: AlertInterface) => addAlertApi(data),
    });

    return { newAlert: NewAlert };
};
