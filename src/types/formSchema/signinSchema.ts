import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().nonempty("Email requis").email("Le format de l’adresse électronique est invalide."),
  password: z.string().nonempty("Mot de passe requis."),
});

export type SigninUseForm = z.infer<typeof signinSchema>;
