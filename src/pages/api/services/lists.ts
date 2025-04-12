import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { lists } from "../../../db/schema/schema";

export default async function listsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(lists);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { orderId, itemId, quantity } = req.body;
    await db.insert(lists).values({ orderId, itemId, quantity });
    if (res.status(200)) {
      const request = await db.select().from(lists);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
