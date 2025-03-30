import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";

export default async function detailsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const itemId = req.query.id
    const requestItem = await db.query.items.findFirst({
      where: (item, { eq }) => eq(item.id, Number(itemId)),
    })
    const requestPhoto = await db.query.photos.findMany({
      where: (photo, { eq }) => eq(photo.itemId, Number(itemId)),
    })
    const requestCharacteristics = await db.query.characteristics.findMany({
      where: (characteristic, { eq }) => eq(characteristic.itemId, Number(itemId)),
    })
    const requestPosts = await db.query.posts.findMany({
      where: (post, { eq }) => eq(post.itemId, Number(itemId)),
    })

    res.status(200).json({ requestItem, requestCharacteristics, requestPosts, requestPhoto });
  }
}