import { z } from 'zod'

export const orderSchema = z.object({
  payment: z.number().nullable(),
  isCourier: z.boolean(),
  city: z.string().min(1, "Выберите город"),
  address: z.string().optional(),
  phone: z.string().min(1, "Введите номер телефона"),
  comment: z.string().optional(),
}).superRefine(({ isCourier, address, phone }, ctx) => {
  if (isCourier && !address) {
    ctx.addIssue({
      code: "custom",
      message: "Введите адрес",
      path: ["address"],
    });
  }

  if (!/^\+7\s\(\d{3}\)\s\d{3}(-\d{2}){2}$/.test(phone)) {
    ctx.addIssue({
      code: "custom",
      message: "Некорректный номер телефона",
      path: ["phone"],
    });
  }
});

export type TOrderSchema = z.infer<typeof orderSchema>