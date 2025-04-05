import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { basket } from "../../db/schema/schema";
import { validateSessionToken } from "@/shared/utils/backend/authSessions";

export default async function basketTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const token = req.cookies.session;

    if (!token) {
      return res.status(403).json({
        access: "denied",
      });
    }

    try {
      const { session, user } = await validateSessionToken(token);

      if (!user || !session) {
        return res.status(403).json({
          access: "denied",
        });
      }

      // Передаём id пользователя в запросе
      const requestBasket = await db.query.basket.findMany({
        where: (basket, { eq }) => eq(basket.userId, Number(user.id)), // Собираем корзину по id пользователя
      });

      let totalQuantity = 0;
      let finalPrice = 0;

      if (!requestBasket) {
        return res
          .status(200)
          .json({ totalQuantity, finalPrice, requestBasket });
      }

      await Promise.all(
        requestBasket.map(async (basket) => {
          totalQuantity = totalQuantity + basket.quantity;
          const requestItem = await db.query.items.findFirst({
            where: (item, { eq }) => eq(item.id, Number(basket.itemId)),
          });
          finalPrice =
            finalPrice + Number(requestItem?.price) * basket.quantity;
        }),
      );

      return res.status(200).json({ totalQuantity, finalPrice, requestBasket });
    } catch (error) {
      res.status(500).json({ access: "denied" });
    }
  }
  if (req.method === "POST") {
    const { userId, itemId, quantity } = req.body;
    await db.insert(basket).values({ userId, itemId, quantity });
    if (res.status(200)) {
      const request = await db.select().from(basket);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: "Ошибка базы данных" });
  }
}
