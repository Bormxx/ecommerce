import { yandex } from "@/shared/utils/backend/OAuth";
import { generateState } from "arctic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function authYandex(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const state = generateState();
      const url = yandex.createAuthorizationURL(state, []);
      console.log(url.toString())
  
      res.setHeader(
        "Set-Cookie",
        `yandex_oauth_state=${state}; HttpOnly; Max-Age=600; Path=/api; SameSite=Lax;`,
      );
      
      return res.status(200).json({url: url});
    } catch {
      return res.status(400).json({ error: "Ошибка" })
    }
  }
}
