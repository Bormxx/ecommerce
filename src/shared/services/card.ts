import { TCardSchema } from "../types/schemas/card";

export const getCards = async () => {
  const response = await fetch('api/cards');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

export const addCard = async (form: TCardSchema) => {
  const response = await fetch(`/api/cards`, {
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
}