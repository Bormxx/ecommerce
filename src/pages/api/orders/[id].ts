import { getOrderByIdHandler } from "@/api/controllers/orderController";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../api/utils/withAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const userId = await withAuth(req, res);
      const orderId = parseInt(req.query.id as string, 10);

      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Неверный идентификатор заказа" });
      }

      await getOrderByIdHandler(userId, orderId, res);
    } catch (error) {
      console.error("[LOG] Ошибка получения заказа по ID:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
