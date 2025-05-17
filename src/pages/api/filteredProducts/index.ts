import {
  getFilteredItemsHandler,
} from "@/api/controllers/productController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await getFilteredItemsHandler(req,res);
  }else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
