import {
  getUserHandler,
  updateUserHandler,
} from "@/api/controllers/userController";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../api/utils/withAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = await withAuth(req, res);

  if (req.method === "GET") {
    try {
      await getUserHandler(userId, res);
    } catch (error) {
      console.error("[LOG] Ошибка получения данных о пользователе:", error);
    }
  } else if (req.method === "PUT") {
    try {
      const { name, surname, avatar, email, password } = req.body;
      await updateUserHandler(
        userId,
        { name, surname, avatar, email, password },
        res,
      );
    } catch (error) {
      console.error("[LOG] Ошибка обновления данных о пользователе:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
