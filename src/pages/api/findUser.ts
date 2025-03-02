import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/index";
import { users } from "../../db/schema/schema";
import { eq } from "drizzle-orm";
import { checkTokenValidity } from "@/utils/checkToken";

export default async function findUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.authorization;

  const id = checkTokenValidity(token);

  try {
    if (!id) {
      return res
        .status(403)
        .json({
          error: "Пользователь не авторизирован",
          m: id,
          s: typeof id,
          d: token,
        });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, id!),
      columns: {
        password: false,
        id: false,
      },
    });

    if (!user) {
      return res.status(403).json({ error: "Ошибка email или пароля", m: id });
    }

    res.status(200).json(user);
  } catch {
    res
      .status(403)
      .json({
        error: "Ошибка авторизации",
        m: typeof id,
        s: typeof id,
        d: token,
      });
  }
}
