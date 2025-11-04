import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Le format de l’adresse électronique est invalide." }).nonempty("Email requis"),
});

export type UseFormForgotPassword = z.infer<typeof forgotPasswordSchema>;
