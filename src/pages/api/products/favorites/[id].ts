import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../api/db";
import { and, eq } from "drizzle-orm";
import { withAuth } from "../../../../api/utils/withAuth";

// TODO: Вроде как доп. поэтому можно вырезать пока
// TODO: Переписать на контроллеры и сервисы. Аналогично с products/[id].ts

export default async function Favorites(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await withAuth(req, res);
  if (req.method === "GET") {
      try {
        const itemId = req.query.id
        const likedItem = await db.query.favorites.findFirst({
          where: (item, { eq }) => and(eq(item.itemId, Number(itemId)), eq(item.userId, 6))
        })
        res.status(200).json({ likedItem });      
      } catch (error) {
        res.status(500).json({ access: "denied" });
      }
    }
}