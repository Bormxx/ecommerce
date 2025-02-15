import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { photos } from "../../db/schema/schema";

export default async function photosTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(photos);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { itemId, photoLink } = req.body;
    const dateStamp = Date.now()
    await db.insert(photos).values({ id:dateStamp, itemId, photoLink });
    if (res.status(200)) {
      const request = await db.select().from(photos);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
