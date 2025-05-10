import { hideEmail } from "@/shared/utils/backend/helpers";
import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../api/models/user";
import { db } from "../../../api/db";
import { authFormSchema } from "../../../shared/types/schemas/auth";
import {
  createSession,
  generateSessionToken,
} from "../../../shared/utils/backend/authSessions";

export default async function usersAuth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const inputs = authFormSchema.safeParse(req.body);

    if (!inputs.success) {
      return res.status(400).json({ error: "Некоректные данные" });
    }

    const { email, password } = inputs.data;

    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user || !user.password) {
        return res.status(400).json({ error: "Ошибка email или пароля" });
      }

      const matchHash = await compare(password, user.password);

      if (!matchHash) {
        return res.status(400).json({ error: "Ошибка email или пароля" });
      }

      const token = generateSessionToken();
      await createSession(token, user.id);

      res.setHeader("Set-Cookie", `session=${token}; HttpOnly; Max-Age=60000; Path=/api; SameSite=Strict;`);

      res.status(200).json({
        name: user.name,
        surname: user.surname,
        avatar: user.avatar,
        email: hideEmail(user.email),
      });
    } catch {
      res.status(500).json({ error: "Ошибка авторизации" });
    }
  }
}
