
import { z } from 'zod'

export const orderSchema = z.object({
  cardId: z.string()
});