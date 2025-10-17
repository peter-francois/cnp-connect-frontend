import { z } from "zod";

export const signinSchema = z.object({
  email: z.email("Le format de l’adresse électronique est invalide.").nonempty("Email requis"),
  password: z.string().nonempty("Mot de passe requis."),
});

// @dev change name
export type UseForm = z.infer<typeof signinSchema>;
