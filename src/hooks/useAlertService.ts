import { useMutation } from "@tanstack/react-query";

import { addAlert } from "../api/alert.api";
import type { AlertInterface } from "../types/interfaces/AlertInterface";

export const useAlertService = () => {
  const NewAlert = () =>
    useMutation({
      mutationFn: (data: AlertInterface) => addAlert(data),
    });

    return { newAlert: NewAlert };
};
