import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { basket } from "../../db/schema/schema";
import { validateSessionToken } from "@/shared/utils/backend/authSessions";
import { and, eq } from "drizzle-orm";

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

    const token = req.cookies.session;
    const { itemId } = req.body;

    if (!token || ! itemId) {
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

      const item = await db.query.basket.findFirst({
        where: and(eq(basket.userId, user.id), eq(basket.itemId, itemId)),
      });
      
      if (item) {
        await db.update(basket).set({ quantity: item.quantity + 1}).where(eq(basket.id, item.id));
        return res.status(200).json({ status: "success" });
      }

      await db.insert(basket).values({userId: user.id, itemId: itemId, quantity: 1 });

      return res.status(200).json({ status: "success" });

    } catch {
      res.status(500).json({ error: "Ошибка авторизации" });
    }
  }

  if (req.method === "PATCH") {

    const token = req.cookies.session;

    const { itemId, addQuantity } = req.body;

    if (!token || ! itemId) {
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

      const item = await db.query.basket.findFirst({
        where: and(eq(basket.userId, user.id), eq(basket.itemId, itemId)),
      });
      
      if (!item) {
        return res.status(400).json({ status: "failed" });
      }

      if ((item.quantity + addQuantity) < 1) {
        await db.delete(basket).where(eq(basket.id, item.id));
        return res.status(200).json({ status: "success" });
      }

      await db.update(basket).set({ quantity: item.quantity + addQuantity }).where(eq(basket.id, item.id));

      return res.status(200).json({ status: "success" });

    } catch {
      res.status(500).json({ access: "denied", });
    }
  }

  if (req.method === "DELETE") {

    const token = req.cookies.session;

    const { itemId } = req.body;

    if (!token || ! itemId) {
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

      await db.delete(basket).where(and(eq(basket.userId, user.id), eq(basket.itemId, itemId)))
      
      return res.status(200).json({ status: "success" });

    } catch {
      res.status(500).json({ access: "denied", });
    }
  }
}
