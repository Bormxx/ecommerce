import { z } from 'zod'

export const cardSchema = z.object({
  cardNumber: z.string().min(14).max(14),
  month: z.string().min(2).max(2),
  year: z.string().min(2).max(2),
  cvv: z.string().min(3).max(3),
});

export type TCardSchema = z.infer<typeof cardSchema>