import { z } from "zod";

export const schemaResetPassword = z
  .object({
    email: z
      .email({ message: "Le format de l’adresse électronique est invalide." })

  })

export type UseFormResetPassword = z.infer<typeof schemaResetPassword>;
