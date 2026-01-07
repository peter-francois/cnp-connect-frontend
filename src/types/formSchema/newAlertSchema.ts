import { z } from "zod";
import { PriorityEnum } from "../enum/UserEnum";

export const newAlertSchema = z.object({
  content: z.string().min(8, { message: "Doit contenir 8 caractères minimum." }),
  priority: z.enum(Object.values(PriorityEnum) as [PriorityEnum, ...PriorityEnum[]], {
    message: "Veuillez sélectionner une priorité.",
  }),
  linesIds: z
    .array(z.union([z.string(), z.number()]))
    .transform((values) => values.map(Number))
    .refine((values) => values.length > 0, {
      message: "Veuillez sélectionner au moins une ligne.",
    }),
});

export type UseFormNewAlert = z.infer<typeof newAlertSchema>;
