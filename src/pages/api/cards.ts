import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { cards } from "../../db/schema/schema";

export default async function cardsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(cards);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { userId, cardNumber } = req.body;
    const dateStamp = Date.now()
    await db.insert(cards).values({ userId, cardNumber });
    if (res.status(200)) {
      const request = await db.select().from(cards);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
