import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { basket, lists, orders } from "../../db/schema/schema";
import { orderFormSchema } from "@/shared/types/schemas/order";
import { checkTokenValidity } from "@/shared/utils/backend/checkToken";
import { eq } from "drizzle-orm";

export default async function ordersTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(orders);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const inputs = orderFormSchema.safeParse(req.body);

    if (!inputs.success) {
      return res.status(400).json({ error: "Некоректные данные" });
    }

    const token = req.cookies.authorization;

    const id = checkTokenValidity(token);

    try {
      if (!id) {
        return res.status(403).json({
          access: "denied",
        });
      }
      const { ...data } = inputs.data;

      await db.transaction(async (tx) => {
        const [orderId] = await tx
          .insert(orders)
          .values({ userId: id, ...data })
          .returning({ insertedId: orders.id });

        const purchases = await tx
          .select({
            itemId: basket.itemId,
            quantity: basket.quantity,
          })
          .from(basket)
          .where(eq(basket.userId, id));

        purchases.map(async (purchase) => {
          await tx
            .insert(lists)
            .values({ orderId: orderId.insertedId, ...purchase });
        });

        await tx.delete(basket).where(eq(basket.userId, id));
      });

      return res.status(200).json({ status: "success" });
    } catch {
      return res.status(500).json({ message: "Ошибка базы данных" });
    }
  }
}
