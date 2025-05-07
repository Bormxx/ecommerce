import {
  createOrderHandler,
  getOrdersHandler,
} from "@/api/controllers/orderController";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../api/utils/withAuth";

// TODO: Мб рефакторинг

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const userId = await withAuth(req, res);
      await getOrdersHandler(userId, res);
    } catch (error) {
      console.error("[LOG] Ошибка получения заказов:", error);
    }
  } else if (req.method === "POST") {
    try {
      const userId = await withAuth(req, res);
      const { comment, address, phone, isCourier, payment } = req.body;

      if (!address || !phone || typeof isCourier !== "boolean") {
        return res.status(400).json({ error: "Некорректные данные заказа" });
      }

      await createOrderHandler(
        userId,
        { comment, address, phone, isCourier, payment },
        res,
      );
    } catch (error) {
      console.error("[LOG] Ошибка создания заказа:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
