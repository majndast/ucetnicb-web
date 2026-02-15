import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Jméno musí mít alespoň 2 znaky")
    .max(100, "Jméno je příliš dlouhé"),
  email: z.string().email("Neplatný e-mail"),
  phone: z
    .string()
    .max(20, "Telefon je příliš dlouhý")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Zpráva musí mít alespoň 10 znaků")
    .max(2000, "Zpráva je příliš dlouhá"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
