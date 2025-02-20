import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/index";
import { users } from "../../db/schema/schema";
import { eq } from "drizzle-orm";
import { compare } from 'bcrypt';
import jwt from "jsonwebtoken";

export default async function usersAuth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await db.query.users.findFirst({
        where: eq(email, users.email)
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Ошибка email или пароля'});
      }

      const matchHash = await compare(password, user.password);

      if (!matchHash) {
        return res.status(400).json({ error: 'Ошибка email или пароля'});
      }

      const token = jwt.sign({ id: user.id }, 'omega-security-protection', { expiresIn: 120 });

      res.status(200).json({...user, token: token});
    } catch {
      res.status(500).json({ error: 'Ошибка авторизации'});
    }
  }
}
