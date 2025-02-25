import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/index";
import { users } from "../../db/schema/schema";
import { eq } from "drizzle-orm";
import { hash } from 'bcrypt';
import { formDataSchema } from "../../../types";
import jwt from "jsonwebtoken";

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
  
      await db.insert(users)
        .values({ ...data, password: await hash(password, 10) });

      const newUser = await db.query.users.findFirst({
        where: eq(users.email, data.email),
        columns: {
          password: false,
        }
      });
      
      if (!newUser) {
        throw new Error();
      }

      const { id, ...response } = newUser;

      const token = jwt.sign({ id: id }, 'omega-security-protection', { expiresIn: 120 });
      
      res.setHeader('Set-Cookie', `authorization=Bearer ${token}; HttpOnly; Max-Age=20;`);
      res.status(201).json(response);
    } catch {
      res.status(500).json({ error: 'Ошибка добавления пользователя' });
    }
  }
}
