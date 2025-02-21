import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/index";
import { users } from "../../db/schema/schema";
import { eq } from "drizzle-orm";
import { hash } from 'bcrypt';
import { formDataSchema } from "../../../types";

export default async function usersTable(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const request = await db.select().from(users);
    res.status(200).json({ request });
  }

  if (req.method === "POST") {
    
    const inputs = formDataSchema.safeParse(req.body)

    if (!inputs.success) {
      return res.status(400).json({ error: 'Некоректные данные'});
    }

    const { password, ...data } = inputs.data;
    
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, data.email)
      });
  
      if (user) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует'});
      }
  
      const result = await db.insert(users)
        .values({ ...data, password: await hash(password, 10) })
        .returning({ 
          id: users.id, 
          name: users.name,
          surname: users.surname, 
          email: users.email
        });
      res.status(201).json(result);
    } catch {
      res.status(500).json({ error: 'Ошибка добавления пользователя' });
    }
  }
}
