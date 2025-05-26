import {
  createOrderHandler,
  getOrdersHandler,
} from "@/api/controllers/orderController";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../api/utils/withAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = await withAuth(req, res);
  if (!userId) return;

  if (req.method === "GET") {
    await getOrdersHandler(userId, res);
  } else if (req.method === "POST") {
    await createOrderHandler(userId, req.body, res);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
