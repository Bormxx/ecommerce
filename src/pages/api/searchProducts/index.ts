import { db } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: Переписать на контроллеры и сервисы

export default async function searchProducts(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Запрос не может быть пустым" });
    }

    try {
      const items = await db.query.items.findMany({
        where: (item, { like }) => like(item.title, `%${query}%`),
        limit: 5,
      });

      return res.status(200).json(items);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ошибка при выполнении поиска" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .end(`Метод ${req.method} не разрешен. Используйте метод POST.`);
  }
}
