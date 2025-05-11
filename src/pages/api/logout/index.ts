import type { NextApiRequest, NextApiResponse } from "next";
import { resetCookies, invalidateSession } from "@/shared/utils/backend/authSessions";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const token = req.cookies.session;

  if (!token) {
    return resetCookies(res);
  }

  try {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode("Bearer " + token))
    );

    await invalidateSession(sessionId);
    return resetCookies(res);
  } catch (error) {
    console.error("Ошибка при завершении сессии:", error);
    return res.status(500).json({ error: "Не удалось завершить сессию" });
  }
}
