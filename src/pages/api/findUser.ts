import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/index";
import { users } from "../../db/schema/schema";
import { eq } from "drizzle-orm";
import { checkTokenValidity } from "@/utils/backend/checkToken";

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
          access: 'denied'
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
      return res.status(403).json({access: 'denied'});
    }

    res.status(200).json({access: 'approved'});
  } catch {
    res
      .status(403)
      .json({
        access: 'denied'
      });
  }
}
