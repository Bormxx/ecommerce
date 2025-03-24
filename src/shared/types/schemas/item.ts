import { z } from "zod";

export const ItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  availability: z.boolean(),
});

export type TItemSchema = z.infer<typeof ItemSchema>;