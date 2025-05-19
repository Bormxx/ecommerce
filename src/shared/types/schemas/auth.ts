import { z } from "zod";

export const authFormSchema = z.object({
  email: z
    .string({
      required_error: "Поле обязательно",
    })
    .min(1, "Введите email")
    .email({ message: "Некорректный email" }),
  password: z
    .string({
      required_error: "Поле обязательно",
    })
    .min(1, "Введите пароль"),
});

export type TAuthForm = z.infer<typeof authFormSchema>;

export const registerFormSchema = z
  .object({
    name: z
      .string({
        required_error: "Поле обязательно",
      })
      .min(1, "Введите имя")
      .regex(/^[a-zA-Zа-яёА-ЯЁ]+$/, {
        message: "Разрешены символы латиницы и кириллицы",
      })
      .default(""),
    surname: z
      .string({
        required_error: "Поле обязательно",
      })
      .min(1, "Введите фамилию")
      .regex(/^[a-zA-Zа-яёА-ЯЁ]+$/, {
        message: "Разрешены символы латиницы и кириллицы",
      })
      .default(""),
    email: z
      .string({
        required_error: "Поле обязательно",
      })
      .min(1, "Введите email")
      .email({ message: "Некоректный email" })
      .default(""),
    password: z
      .string({
        required_error: "Поле обязательно",
      })
      .min(1, "Поле обязательно")
      .regex(/[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, {
        message: "Недопустимые символы",
      })
      .default(""),
    passwordCompare: z.string({
      required_error: "Поле обязательно",
    }),
  })
  .refine((data) => data.password === data.passwordCompare, {
    message: "Пароли не совпадают",
    path: ["passwordCompare"],
  })
  .superRefine(({ password }, ctx) => {
    if (password.length < 6) {
      ctx.addIssue({
        code: "custom",
        message: "Пароль меньше 6 символов",
        path: ["password"],
      });
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте строчные буквы",
        path: ["password"],
      });
    }

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте заглавные буквы",
        path: ["password"],
      });
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте символы",
        path: ["password"],
      });
    }

    if (!/\d/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте цифры",
        path: ["password"],
      });
    }
  });

export type TRegisterForm = z.infer<typeof registerFormSchema>;

export const formDataSchema = z
  .object({
    name: z
      .string()
      .min(2, "Введите имя")
      .regex(/^[a-zA-Zа-яёА-ЯЁ]+$/, {
        message: "Разрешены символы латиницы и кириллицы",
      }),
    surname: z
      .string()
      .min(2, "Введите фамилию")
      .regex(/^[a-zA-Zа-яёА-ЯЁ]+$/, {
        message: "Разрешены символы латиницы и кириллицы",
      }),
    email: z.string().min(1, "Введите email").email(),
    password: z.string().min(6, "Введите пароль"),
  })
  .superRefine(({ password }, ctx) => {
    if (password.length < 6) {
      ctx.addIssue({
        code: "custom",
        message: "Пароль меньше 6 символов",
        path: ["password"],
      });
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте строчные буквы",
        path: ["password"],
      });
    }

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте заглавные буквы",
        path: ["password"],
      });
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте символы",
        path: ["password"],
      });
    }

    if (!/\d/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Добавьте цифры",
        path: ["password"],
      });
    }
  });

export type TFormData = z.infer<typeof formDataSchema>;
