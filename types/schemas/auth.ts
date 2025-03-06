import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string({
    required_error: "Поле обязательно",
  }).min(1, "Введите email").email({message: "Некоректный email"}),
  password: z.string({
    required_error: "Поле обязательно",
  }).min(6, "Введите пароль"),
});

export type TAuthForm = z.infer<typeof authFormSchema>;

export const registerFormSchema = z
  .object({
    name: z.string({
      required_error: "Поле обязательно",
    }).min(1, "Введите имя").default(''),
    surname: z.string({
      required_error: "Поле обязательно",
    }).min(1, "Введите фамилию").default(''),
    email: z.string({
      required_error: "Поле обязательно",
    }).min(1, "Введите email").email({message: "Некоректный email"}).default(''),
    password: z.string({
      required_error: "Поле обязательно",
    }).min(6, "Пароль меньше 6 символов").default(''),
    passwordCompare: z.string({
      required_error: "Поле обязательно",
    }),
  })
  .refine((data) => data.password === data.passwordCompare, {
    message: "Пароли не совпадают",
    path: ["passwordCompare"],
  });

export type TRegisterForm = z.infer<typeof registerFormSchema>;

export const formDataSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  surname: z.string().min(2, "Введите фамилию"),
  email: z.string().min(1, "Введите email").email(),
  password: z.string().min(6, "Введите пароль"),
});

export type TFormData = z.infer<typeof formDataSchema>;