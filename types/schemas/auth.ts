import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().min(1, "Введите email").email(),
  password: z.string().min(1, "Введите пароль"),
});

export type TAuthForm = z.infer<typeof authFormSchema>;

export const registrFormSchema = z
  .object({
    name: z.string().min(2, "Введите имя"),
    surname: z.string().min(2, "Введите фамилию"),
    email: z.string().min(1, "Введите email").email(),
    password: z.string().min(6, "Введите пароль"),
    passwordCompare: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordCompare, {
    message: "don't match",
    path: ["passwordCompare"],
  });

export type TRegistrForm = z.infer<typeof registrFormSchema>;

export const formDataSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  surname: z.string().min(2, "Введите фамилию"),
  email: z.string().min(1, "Введите email").email(),
  password: z.string().min(6, "Введите пароль"),
});

export type TFormData = z.infer<typeof formDataSchema>;