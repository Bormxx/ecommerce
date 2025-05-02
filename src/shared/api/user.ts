import { UpdateUserSchema, UserCards } from "../types";
import { TCardSchema } from "../types/schemas/card";

// Получить иноформацию о пользователе (О себе)
export const me = async () => {
  const response = await fetch("api/users/me");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// Обновить информацию о себе
export const updateUser = async (
  body: UpdateUserSchema,
): Promise<{ message: string }> => {
  const response = await fetch("api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// Получить карточки юзера
export const getUserCards = async (): Promise<UserCards[]> => {
  const response = await fetch("api/users/me/cards");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.cards;
};

// Добавить карточку юзера
export const addUserCard = async (form: TCardSchema) => {
  const response = await fetch(`/api/users/me/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
