import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { characteristics } from "../../../db/schema/schema";

export default async function referencesTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(characteristics);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { itemId, frameMatherials, linzeMatherials, linzeTypes, linzeUVDefences, linzeEffects } = req.body;
    await db.insert(characteristics).values({ itemId, frameMatherials, linzeMatherials, linzeTypes, linzeUVDefences, linzeEffects });
    if (res.status(200)) {
      const request = await db.select().from(characteristics);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
