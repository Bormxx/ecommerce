import {
  createItemHandler,
  getAllItemsHandler,
} from "@/api/controllers/productController";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: Мб рефакторинг

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      await getAllItemsHandler(res);
    } catch (error) {
      console.error("[LOG] Ошибка получения товаров:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        title,
        price,
        description,
        availability,
        photos,
        characteristics,
      } = req.body;

      if (
        !title ||
        typeof price !== "number" ||
        !description ||
        typeof availability !== "boolean"
      ) {
        return res.status(400).json({ error: "Некорректные даные товара" });
      }

      await createItemHandler(
        { title, price, description, availability, photos, characteristics },
        res,
      );
    } catch (error) {
      console.error("[LOG] Ошибка создания товара:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
