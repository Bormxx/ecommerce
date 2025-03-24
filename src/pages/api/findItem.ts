import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/index";
import { like } from "drizzle-orm";
import { items } from "@/db/schema/schema";

export default async function findItems(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const {data} = req.body;

    try {

      const itemsData = await db.select().from(items).where(like(items.title, `${data}%`)).limit(5);


      res.status(200).json(itemsData);
    } catch {
      res.status(403).json({
        access: "denied",
      });
    }
  }
}
