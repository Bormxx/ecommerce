import { updateCartItemQuantityHandler } from "@/api/controllers/cartController";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../api/utils/withAuth";

// TODO: Мб рефакторинг

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = await withAuth(req, res);
  const itemId = parseInt(req.query.id as string, 10);

  if (isNaN(itemId)) {
    return res.status(400).json({ error: "Некорректный ID товара" });
  }

  if (req.method === "PUT") {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number") {
        return res.status(400).json({ error: "Некорректно задано количество" });
      }
      await updateCartItemQuantityHandler(userId, itemId, { quantity }, res);
    } catch (error) {
      console.error("Basket PUT error:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
