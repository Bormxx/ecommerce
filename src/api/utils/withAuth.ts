import { validateSessionToken } from "@/shared/utils/backend/authSessions";
import { NextApiRequest, NextApiResponse } from "next";

export async function withAuth(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<number> {
  const token = req.cookies.session;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    throw new Error("Unauthorized");
  }

  try {
    const { session, user } = await validateSessionToken(token);

    if (!user || !session) {
      res.status(401).json({ error: "Invalid session" });
      throw new Error("Invalid session");
    }

    return user.id;
  } catch (error) {
    if (!res.headersSent) {
      console.log("[LOG] Ошибка аутентификации:", error);
      res.status(500).json({ error: "Internal server error" });
    }
    throw error;
  }
}
