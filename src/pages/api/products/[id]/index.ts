import { getItemByIdHandler } from "@/api/controllers/productController";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: Мб рефакторинг

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const itemId = parseInt(req.query.id as string, 10);
      if (isNaN(itemId)) {
        return res.status(400).json({ error: "Неверный идентификатор товара" });
      }
      await getItemByIdHandler(itemId, res);
    } catch (error) {
      console.error("[LOG] Ошибка получения товара по ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
