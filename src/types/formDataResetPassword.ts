import { z } from "zod";

export const schemaResetPassword = z
  .object({
    email: z
      .email({ message: "L'email n'est pas valide" })

  })

export type UseFormResetPassword = z.infer<typeof schemaResetPassword>;
