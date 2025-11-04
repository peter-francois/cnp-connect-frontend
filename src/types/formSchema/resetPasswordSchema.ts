import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Doit contenir 8 caractères minimum." })
      .max(20, { message: "Doit contenir 20 caractères maximum." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne sont pas identiques.",
    path: ["confirmPassword"],
  });

export type UseFormResetPassword = z.infer<typeof resetPasswordSchema>;
