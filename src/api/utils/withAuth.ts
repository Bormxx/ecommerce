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

    // const dbSession = await db
    //   .select()
    //   .from(sessions)
    //   .where(eq(sessions.id, token))
    //   .get();
    // if (!dbSession || dbSession.expiresAt.getTime() < Date.now()) {
    //   res.status(401).json({ error: "Session expired" });
    //   throw new Error("Session expired");
    // }

    return user.id;
  } catch (error) {
    if (!res.headersSent) {
      console.log("[LOG] Ошибка аутентификации:", error);
      res.status(500).json({ error: "Internal server error" });
    }
    throw error;
  }
}
