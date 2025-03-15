import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { checkTokenValidity } from "@/utils/backend/checkToken";

export default async function orderPlacing(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.authorization;

  const userId = checkTokenValidity(token);

  try {
    if (!userId) {
      return res
        .status(403)
        .json({
          access: 'denied'
        });
    }
  } catch (error) {}

  if (req.method === "GET") { // Передаём id пользователя в запросе
    const requestUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, Number(userId)),
    })
    const requestBasket = await db.query.basket.findMany({
      where: (basket, { eq }) => eq(basket.userId, Number(userId)), // Собираем корзину по id пользователя
    })
    let totalQuantity = 0
    let finalPrice = 0
    requestBasket.map(async (basket, i, row) => {
      totalQuantity = totalQuantity + basket.quantity
      const requestItem = await db.query.items.findFirst({
        where: (item, { eq }) => eq(item.id, Number(basket.itemId)),
      })
      finalPrice = finalPrice + (Number(requestItem?.price) * basket.quantity)
      if(i + 1 === row.length) {
        return res.status(200).json({ totalQuantity, finalPrice, requestUser});
      }
    })
  }
}