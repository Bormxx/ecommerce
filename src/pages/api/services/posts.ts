import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { posts } from "../../../db/schema/schema";

export default async function postsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(posts);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { userId, itemId, rating, post } = req.body;
    await db.insert(posts).values({ userId, itemId, rating, post });
    if (res.status(200)) {
      const request = await db.select().from(posts);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
