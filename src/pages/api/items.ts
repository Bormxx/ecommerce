import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { items } from "../../db/schema/schema";

export default async function itemsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(items);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { title, price, description, availability } = req.body;
    await db.insert(items).values({title, price, description, availability });
    if (res.status(200)) {
      const request = await db.select().from(items);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}