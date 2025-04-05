import { DateTime } from 'luxon';
import { z } from 'zod'

const date = DateTime.now();
const currentYear = date.year % 100;
const currentMonth = date.month;

export const cardSchema = z.object({
  cardNumber: z.string().min(16, "Номер карты должен быть 16 символов").max(19, "Неверный номер").regex(/(\d{4}\s?){3}\d{4}/, "Используются недопустимые символы"),
  month: z.string().min(1, "Введите месяц").regex(/^(1[0-2]|0[1-9])$/, "Введите месяц как указано на карте"),
  year: z.string().min(1, "Введите год").regex(/^[0-9]{2}$/, "Введите год как указано на карте"),
  cvv: z.string().min(3, "Мин. 3 цифры").max(3).regex(/^[0-9]{3}$/, "Недопустимые символы"),
}).superRefine((data, ctx) => {
  const year = parseInt(data.year);
  const month = parseInt(data.month);
  if (year < currentYear || (year === currentYear && data.month.length === 2 && month < currentMonth)) {
    ctx.addIssue({
      code: "custom",
      message: "Срок действия карты истек",
      path: ["month"],
    });
  }
  if (year < currentYear || (year === currentYear && data.month.length === 2 && month < currentMonth)) {
    ctx.addIssue({
      code: "custom",
      message: "Срок действия карты истек",
      path: ["year"],
    });
  }
});

export type TCardSchema = z.infer<typeof cardSchema>

export const userCardSchema = z.object({
  id: z.number(),
  cardNumber: z.string(),
});

export type TUserCardSchema = z.infer<typeof userCardSchema>