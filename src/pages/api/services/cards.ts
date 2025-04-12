import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { cards } from "../../../db/schema/schema";
import { and, eq, sql } from "drizzle-orm";
import { cardSchema } from "@/shared/types/schemas/card";
import { validateSessionToken } from "@/shared/utils/backend/authSessions";

export default async function cardsTable(
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
      const userCards = await db
        .select({
          id: cards.id,
          cardNumber: sql<string>`CONCAT(SUBSTRING(${cards.cardNumber}, 16, 2), ' ', SUBSTRING(${cards.cardNumber}, 18, 2))`,
        })
        .from(cards)
        .where(eq(cards.userId, user.id));
      res.status(200).json(userCards);
    } catch {
      res.status(403).json({
        access: "denied",
      });
    }
  }

  if (req.method === "POST") {
    const inputs = cardSchema.safeParse(req.body);

    if (!inputs.success) {
      return res.status(400).json({ error: "Некоректные данные" });
    }

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

      const { cardNumber, ...data } = inputs.data;

      const card = await db.query.cards.findFirst({
        where: and(eq(cards.cardNumber, cardNumber), eq(cards.userId, user.id)),
      });

      if (card) {
        return res
          .status(403)
          .json({ error: "Карта с указанным номером уже добавлена" });
      }

      await db
        .insert(cards)
        .values({ userId: user.id, cardNumber: cardNumber, ...data });

      return res.status(200).json({ status: "success" });
    } catch {
      res.status(403).json({
        error: "Unexpected error!",
      });
    }
  }
}
