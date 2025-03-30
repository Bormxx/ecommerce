import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/index";
import { users } from "../../../db/schema/schema";
import { eq } from "drizzle-orm";
import { compare } from 'bcrypt';
import jwt from "jsonwebtoken";
import { authFormSchema } from "../../../shared/types/schemas/auth";


export default async function usersAuth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  req.cookies.authorization
  if (req.method === "POST") {
    const inputs = authFormSchema.safeParse(req.body)
    
    if (!inputs.success) {
      return res.status(400).json({ error: 'Некоректные данные'});
    }

    const { email, password } = inputs.data;

    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Ошибка email или пароля'});
      }

      const matchHash = await compare(password, user.password);

      if (!matchHash) {
        return res.status(400).json({ error: 'Ошибка email или пароля'});
      }

      const token = jwt.sign({ id: user.id }, 'omega-security-protection', { expiresIn: 120 });

      res.setHeader('Set-Cookie', `authorization=Bearer ${token}; HttpOnly; Max-Age=180;`)
      
      res.status(200).json({name: user.name, surname: user.surname, avatar: user.avatar, email: user.email});
      
    } catch {
      res.status(500).json({ error: 'Ошибка авторизации'});
    }
  }
}
