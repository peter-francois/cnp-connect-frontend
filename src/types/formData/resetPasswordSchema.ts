import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.email({ message: "Le format de l’adresse électronique est invalide." }).nonempty("Email requis"),
});

export type UseFormResetPassword = z.infer<typeof resetPasswordSchema>;
