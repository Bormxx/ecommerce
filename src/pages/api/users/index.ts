import {
  createUserHandler,
  getAllUsersHandler,
} from "@/api/controllers/userController";
import { formDataSchema } from "@/shared/types/schemas/auth";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: Мб рефакторинг

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      await getAllUsersHandler(res);
    } catch (error) {
      console.error("[LOG] Ошибка получения пользователей:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const inputs = formDataSchema.safeParse(req.body);
      const { name, surname, email, password, avatar } = req.body;
      if (!name || !surname || !email || !inputs) {
        return res
          .status(400)
          .json({ error: "Некорректные данные пользователя" });
      }
      await createUserHandler({ name, surname, email, password, avatar }, res);
    } catch (error) {
      console.error("[LOG] Ошибка создания пользователя:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
