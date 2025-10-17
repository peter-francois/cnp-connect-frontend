import { z } from "zod";

export const createUserSchema = z.object({
  lastname: z
    .string()
    .min(2, { message: "Doit contenir 2 caractères minimum." })
    .max(20, { message: "Doit contenir 20 caractères maximum." }),
  firstname: z
    .string()
    .min(2, { message: "Doit contenir 2 caractères minimum." })
    .max(20, { message: "Doit contenir 20 caractères maximum." }),
  email: z.email({ message: "Le format de l’adresse électronique est invalide." }),
  role: z.enum(["coordinator", "driver"], "Veuillez sélectionner une option."),
});

export type UseFormCreateUser = z.infer<typeof createUserSchema>;
