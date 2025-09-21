import { z } from "zod";

export const schemaNewAlert = z.object({
  content: z.string().min(8, { message: "Doit contenir 8 caractères minimum." }),
  priority: z.string().min(1, { message: "Veuillez selectionner une priorité" }),
  lines: z.array(z.string()).min(1, { message: "Veuillez sélectionner au moins une ligne" }),
});

export type UseFormNewAlert = z.infer<typeof schemaNewAlert>;
