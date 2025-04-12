import { and } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../api/db";
import { photos } from "../../../api/models/product";
import { county } from "../../fill";

// TODO: Переписать на контроллеры и сервисы. Аналогично с products/[id].ts

export default async function detailsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const data: object[] = [];
    for (let i = 1; i < county; i++) {
      const itemId = i;
      const requestItem = await db.query.items.findFirst({
        where: (item, { eq }) => eq(item.id, Number(itemId)),
      });
      // Способ 1. Через db.query
      const requestPhoto = await db.query.photos.findMany({
        where: (photo, { eq }) =>
          and(eq(photo.itemId, Number(itemId)), eq(photos.isMainPhoto, true)),
      });

      // Способ 2. Через db.select
      // const requestPhoto = await db.select()
      //   .from(photos)
      //   .where(
      //     and(
      //       eq(photos.itemId, Number(itemId)),
      //       eq(photos.isMainPhoto, true),
      //     )
      //   )
      data.push({ requestItem, requestPhoto });
    }
    res.status(200).json({ data });
  }
}
