import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../api/db";
import { characteristics } from "../../../api/models/product";

export default async function referencesTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(characteristics);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const {
      itemId,
      color,
      frameMatherials,
      linzeMatherials,
      linzeTypes,
      linzeUVDefences,
      linzeEffects,
    } = req.body;
    await db
      .insert(characteristics)
      .values({
        itemId,
        color,
        frameMatherials,
        linzeMatherials,
        linzeTypes,
        linzeUVDefences,
        linzeEffects,
      });
    if (res.status(200)) {
      const request = await db.select().from(characteristics);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: "Ошибка базы данных" });
  }
}
