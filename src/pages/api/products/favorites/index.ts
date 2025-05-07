import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../api/db";
import { withAuth } from "../../../../api/utils/withAuth";
import { and, eq } from "drizzle-orm";
import { favorites } from "../../../../api/models/product";
import { getItemByIdHandler } from "../../../../api/controllers/productController";

// TODO: Вроде как доп. поэтому можно вырезать пока
// TODO: Переписать на контроллеры и сервисы. Аналогично с products/[id].ts

export default async function Favorites(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await withAuth(req, res);
  if (req.method === "GET") {
      try {
        const favorites = await db.query.favorites.findMany({
          where: (item, { eq }) => eq(item.userId, user)
        })
        const likedItems = await Promise.all(favorites.map(item => getItemByIdHandler(item.itemId, res)))
        res.status(200).json({ likedItems });
      } catch (error) {
        res.status(500).json({ access: "denied" });
      }
    }
    if (req.method === "POST") {
    try {
      const {itemId} = req.body
      const likedItem = await db.query.favorites.findFirst({
        where: (item, { eq }) => eq(item.itemId, Number(itemId)),
      })
      if(likedItem){
        await db.delete(favorites).where(and(eq(favorites.userId, user), eq(favorites.itemId, Number(itemId)))).execute()
        return res.status(200).json({message: "Лайк удалён"})
      }
      else {
        await db.insert(favorites).values({userId: user, itemId: itemId}).execute();
        return res.status(200).json({message: "Лайк поставлен"})
      }
    } catch (error) {
      return res.status(500).json({ access: "denied" });
    }
  }
}