import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../api/db";
import { favorites } from "../../../api/models/user";

export default async function favoriteTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(favorites);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { userId, itemId } = req.body;
    await db.insert(favorites).values({ userId, itemId });
    if (res.status(200)) {
      const request = await db.select().from(favorites);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: "Ошибка базы данных" });
  }
}
