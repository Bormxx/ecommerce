import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { posts } from "../../../db/schema/schema";
import { validateSessionToken } from "../../../shared/utils/backend/authSessions";
import { eq } from "drizzle-orm";

export default async function detailsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const token = req.cookies.session;

    if (!token) {
      return res.status(403).json({
        access: "denied",
      });
    }

    try {
      const { session, user } = await validateSessionToken(token);
      if (!user || !session) {
        return res.status(403).json({access: "denied"});
      }
      const existingOrders = await db.query.orders.findMany({
        where: (order, {eq})=>eq(order.userId, user.id)
      })
      res.status(200).json({ existingOrders, message: 'Этот раздел бэка пока не готов' });
    } catch (error) {
      res.status(500).json({ access: "denied" });
    }
  }
  if (req.method === "POST") {
    const token = req.cookies.session;

    if (!token) {
      return res.status(403).json({
        access: "denied",
      });
    }
    try {
      const { session, user } = await validateSessionToken(token);
      
      if (!user || !session) {
        return res.status(403).json({access: "denied"});
      }
      return res.json({message: 'Пока не готово'});
    } catch (error) {
      res.status(500).json({ access: "denied" });
    }
  }
}