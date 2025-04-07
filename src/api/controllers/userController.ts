import {
  createUser,
  createUserCard,
  getAllUsers,
  getUserById,
  getUserCards,
  updateUser,
} from "@/api/services/userService";
import { NextApiResponse } from "next";

// TODO: Добавить обработку ошибок для остальных методов

// Получение всех пользователей (Для теста)
export async function getAllUsersHandler(res: NextApiResponse) {
  const users = await getAllUsers();
  res.status(200).json({ users });
}

// Создание пользователя (Для теста)
export async function createUserHandler(
  data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    avatar?: string;
  },
  res: NextApiResponse,
) {
  try {
    const { userId, token } = await createUser(data);
    res.setHeader(
      "Set-Cookie",
      `session=${token}; HttpOnly; Max-Age=60; Path=/`,
    ); 
    res.status(201).json({ userId });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Пользователь с таким адресом электронной почты уже существует"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

// Получение данных о себе
export async function getUserHandler(userId: number, res: NextApiResponse) {
  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }
  res.status(200).json({ user });
}

// Обновление данных о себе
export async function updateUserHandler(
  userId: number,
  data: {
    name?: string;
    surname?: string;
    avatar?: string;
    email?: string;
    password?: string;
  },
  res: NextApiResponse,
) {
  await updateUser(userId, data);
  res.status(200).json({ message: "Данные успешно обновлены" });
}

// Получение карт пользователя
export async function getUserCardsHandler(
  userId: number,
  res: NextApiResponse,
) {
  const cards = await getUserCards(userId);
  res.status(200).json({ cards });
}

// Создание карты пользователя
export async function createUserCardHandler(
  userId: number,
  data: { cardNumber: string; month: string; year: string; cvv: string },
  res: NextApiResponse,
) {
  const cardId = await createUserCard(userId, data);
  res.status(201).json({ cardId });
}
