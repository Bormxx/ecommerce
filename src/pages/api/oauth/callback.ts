import { db } from "@/db";
import { users } from "@/db/schema/schema";
import {
  createSession,
  generateSessionToken,
} from "@/shared/utils/backend/authSessions";
import { hideEmail } from "@/shared/utils/backend/helpers";
import { yandex } from "@/shared/utils/backend/OAuth";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function wow(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const code = req.body.code;
    const state = req.body.state;
    const storedState = req.cookies?.yandex_oauth_state ?? null;
    if (!code || !state || !storedState) {
      return res.status(400).json({ access: "denied" });
    }
    if (state !== storedState) {
      return res.status(400).json({ access: "denied" });
    }
    let accessToken: string;
    try {
      const tokens = await yandex.validateAuthorizationCode(code);
      accessToken = tokens.accessToken();
    } catch {
      return res.status(400).json({ access: "denied" });
    }

    const userData = await fetch("https://login.yandex.ru/info?format=json", {
      method: "GET",
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });

    if (!userData.ok) {
      return res.status(400).json({ access: "denied" });
    }

    const user = await userData.json();

    try {
      let localUser = await db.query.users.findFirst({
        where: eq(users.email, user.default_email),
        columns: {
          password: false,
        },
      });

      if (!localUser) {
        const newUser = await db
          .insert(users)
          .values({
            name: user.first_name ?? "anonym",
            surname: user.last_name ?? "anonym",
            email: user.default_email,
          })
          .returning({
            id: users.id,
            name: users.name,
            surname: users.surname,
            email: users.email,
            avatar: users.avatar,
          });

        localUser = newUser[0];
      }

      const token = generateSessionToken();
      await createSession(token, localUser.id);

      res.setHeader("Set-Cookie", [
        `session=${token}; HttpOnly; Max-Age=60000; Path=/api;`,
        `yandex_oauth_state=; HttpOnly; Max-Age=0; Path=/;`,
      ]);

      res.status(200).json({
        name: localUser.name,
        surname: localUser.surname,
        avatar: localUser.avatar,
        email: hideEmail(localUser.email),
      });
    } catch {
      res.status(500).json({ error: "Ошибка авторизации" });
    }
  }
}
