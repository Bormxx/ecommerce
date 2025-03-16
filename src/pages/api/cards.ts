import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { cards } from "../../db/schema/schema";
import { checkTokenValidity } from "@/utils/backend/checkToken";
import { and, eq, sql } from "drizzle-orm";

export default async function cardsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const token = req.cookies.authorization;

    const id = checkTokenValidity(token);

    try {
      if (!id) {
        return res.status(403).json({
          access: "denied",
        });
      }
      const userCards = await db.select({id: cards.id, cardNumber: sql<string>`CONCAT(SUBSTRING(${cards.cardNumber}, 16, 2), ' ', SUBSTRING(${cards.cardNumber}, 18, 2))` }).from(cards).where(eq(cards.userId, id));
      res.status(200).json(userCards);
    } catch {
      res.status(403).json({
        access: "denied",
      });
    }
  }

  if (req.method === "POST") {
    const token = req.cookies.authorization;

    const id = checkTokenValidity(token);

    try {
      if (!id) {
        return res.status(403).json({
          access: "denied",
        });
      }

      const { cardNumber, ...data } = req.body;

      const card = await db.query.cards.findFirst({
        where: and(eq(cards.cardNumber, cardNumber), eq(cards.userId, id)),
      });

      if (card) {
        return res.status(403).json({ status: "failed" });
      }

      await db
        .insert(cards)
        .values({ userId: id, cardNumber: cardNumber, ...data });

      return res.status(200).json({ status: "success" });
    } catch {
      res.status(403).json({
        access: "denied",
      });
    }
  }
}
