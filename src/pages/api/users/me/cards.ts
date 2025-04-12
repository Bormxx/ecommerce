import {
  createUserCardHandler,
  getUserCardsHandler,
} from "@/api/controllers/userController";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../api/utils/withAuth";

// TODO: Мб рефакторинг

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = await withAuth(req, res);

  if (req.method === "GET") {
    try {
      await getUserCardsHandler(userId, res);
    } catch (error) {
      console.error("[LOG] Ошибка получения карточек пользователя:", error);
    }
  } else if (req.method === "POST") {
    try {
      const { cardNumber, month, year, cvv } = req.body;
      if (!cardNumber || !month || !year || !cvv) {
        return res.status(400).json({ error: "Некорректные данные карточки" });
      }
      await createUserCardHandler(
        userId,
        { cardNumber, month, year, cvv },
        res,
      );
    } catch (error) {
      console.error("[LOG] Ошибка добавления карточки:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
