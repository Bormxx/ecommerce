
import { z } from 'zod'

export const orderSchema = z.object({
  payment: z.string(),
  isCourier: z.boolean(),
  city: z.string().min(1, "Выберите город"),
  address: z.string().optional(),
  phone: z.string(),
  comment: z.string().optional(),
}).superRefine(({ isCourier, address, phone }, ctx) => {
  if (isCourier && !address) {
    ctx.addIssue({
      code: "custom",
      message: "Введите адрес",
      path: ["address"],
    });
  }

  if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phone)) {
    ctx.addIssue({
      code: "custom",
      message: "Некорректный номер телефона",
      path: ["phone"],
    });
  }
});

export type TOrderSchema = z.infer<typeof orderSchema>