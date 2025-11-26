import { z } from "zod";
import { UserRolesEnum } from "../enum/UserEnum";

export const createUserSchema = z.object({
  lastName: z
    .string()
    .min(2, { message: "Doit contenir 2 caractères minimum." })
    .max(20, { message: "Doit contenir 20 caractères maximum." }),
  firstName: z
    .string()
    .min(2, { message: "Doit contenir 2 caractères minimum." })
    .max(20, { message: "Doit contenir 20 caractères maximum." }),
  email: z.email({ message: "Le format de l’adresse électronique est invalide." }),
  role: z.enum([UserRolesEnum.COORDINATOR, UserRolesEnum.DRIVER], "Veuillez sélectionner une option."),
});

export type UseFormCreateUser = z.infer<typeof createUserSchema>;
