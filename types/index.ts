import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().min(1, 'Введите email').email(),
  password: z.string().min(6, 'Введите пароль'),
});

export type TAuthForm = z.infer<typeof authFormSchema>

export const registrFormSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  surname: z.string().min(2, 'Введите фамилию'),
  email: z.string().min(1, 'Введите email').email(),
  password: z.string().min(6, 'Введите пароль'),
  passwordCompare: z.string().min(6)
}).refine(
  (data) => data.password === data.passwordCompare, {
    message: "don't match",
    path: ['passwordCompare']
  }
);

export type TRegistrForm = z.infer<typeof registrFormSchema>

export interface Items {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: boolean;
}

export interface Users {
  id: number;
  name: string;
  setName: (name: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export interface Favorites {
  id: number;
  userId: number;
  itemId: number;
}

export interface Cards {
  id: number;
  userId: number;
  cardNumber: string;
}

export interface Basket {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
}

export interface Photos {
  id: number;
  itemId: number;
  photoLink: string;
}

export interface References {
  id: number;
  itemId: number;
  reference: string;
}

export interface Basket {
  id: number;
  userId: number;
  itemId: number;
  rating: number;
  post: string;
}

export interface Orders {
  id: number;
  userId: number;
  comment: string;
  address: string;
  courier: boolean;
  payCash: boolean;
}

export interface Orders {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
}