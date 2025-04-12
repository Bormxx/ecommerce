import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { orders } from "../../../db/schema/schema";

export default async function ordersTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(orders);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { userId, comment, address, phone, isCourier, payment } = req.body;
    const orderDate: number = Number(Date.now());
    await db.insert(orders).values({ userId, comment, address, phone, isCourier, payment, orderDate });
    if (res.status(200)) {
      const request = await db.select().from(orders);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
