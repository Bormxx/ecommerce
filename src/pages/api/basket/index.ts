import {
  addItemToCartHandler,
  getCartHandler,
} from "@/api/controllers/cartController";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../api/utils/withAuth";

// TODO: Мб рефакторинг

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = await withAuth(req, res);

  if (req.method === "GET") {
    try {
      await getCartHandler(userId, res);
    } catch (error) {
      console.error("[LOG] Ошибка получения данных корзины:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { itemId, quantity } = req.body;
      if (!itemId || typeof quantity !== "number" || quantity <= 0) {
        return res.status(400).json({ error: "Некорректные данные товара" });
      }
      await addItemToCartHandler(userId, { itemId, quantity }, res);
    } catch (error) {
      console.error("[LOG] Ошибка добавления товаров в корзину:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
