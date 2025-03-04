import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { references } from "../../db/schema/schema";

export default async function referencesTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(references);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { itemId, reference } = req.body;
    await db.insert(references).values({ itemId, reference });
    if (res.status(200)) {
      const request = await db.select().from(references);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
