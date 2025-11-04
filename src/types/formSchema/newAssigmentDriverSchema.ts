import { z } from "zod";

export const newAssigmentDriverSchema = z.object({
  lines: z.string({ message: "Veuillez sélectionner une ligne" }),
  train: z.string({ message: "Veuillez sélectionner un train" }),
});

export type UseFormNewAssigmentDriverSchema = z.infer<typeof newAssigmentDriverSchema>;
