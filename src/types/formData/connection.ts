import { z } from "zod";

export const schema = z.object({
  email: z.email("Le format de l’adresse électronique est invalide."),
  password: z.string().nonempty("Passeport requis."),
});

export type UseForm = z.infer<typeof schema>;
