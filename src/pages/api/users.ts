import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { users } from "../../db/schema/schema";

export default async function usersTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(users);
    res.status(200).json({ request });
  }
  if (req.method === "POST") {
    const { name, surname, avatar, email, password } = req.body;
    const dateStamp = Date.now()
    await db.insert(users).values({ id:dateStamp, name, surname, avatar, email, password });
    if (res.status(200)) {
      const request = await db.select().from(users);
      return res.status(200).json({ request });
    } else return res.status(500).json({ message: 'Ошибка базы данных' });
  }
}
