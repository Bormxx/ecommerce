import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { basket } from "../../db/schema/schema";

export default async function basketTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(basket);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { userId, itemId, quantity } = req.body;
    const dateStamp = Date.now()
    await db.insert(basket).values({ id:dateStamp, userId, itemId, quantity });
    if (res.status(200)) {
      const request = await db.select().from(basket);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
