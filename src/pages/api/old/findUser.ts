import type { NextApiRequest, NextApiResponse } from "next";
import {
  resetCookies,
  validateSessionToken,
} from "../../../shared/utils/backend/authSessions";

export default async function findUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.session;

  if (!token) {
    return resetCookies(res);
  }

  try {
    const { session, user } = await validateSessionToken(token);

    if (!user || !session) {
      return resetCookies(res);
    }

    res.setHeader("Set-Cookie", `session=${token}; HttpOnly; Max-Age=60000; Path=/api; SameSite=Strict;`);

    res.status(200).json({ access: "approved" });
  } catch {
    return resetCookies(res);
  }
}
