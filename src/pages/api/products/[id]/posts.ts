import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db";
import { posts } from "../../../../db/schema/schema";
import { validateSessionToken } from "../../../../shared/utils/backend/authSessions";
import { eq } from "drizzle-orm";

export default async function detailsTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const itemId = req.query.id
    const requestPosts = await db.query.posts.findMany({
      where: (post, { eq }) => eq(post.itemId, Number(itemId)),
    })
    res.status(200).json({ requestPosts });
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
      const {itemId, rating, post} = req.body
      const existingPost = await db.query.posts.findFirst({
        where: (post, {eq})=>eq(post.userId, user.id) && eq(post.itemId, itemId)
      })
      if(existingPost){
        return res.json({message: 'Вы уже ставили оценку и написали отзыв'})
      }
      else {
        await db.insert(posts).values({userId: user.id, itemId: itemId, rating: rating, post: post}).execute();
      }
    } catch (error) {
      res.status(500).json({ access: "denied" });
    }
  }
}