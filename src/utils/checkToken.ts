import jwt from "jsonwebtoken";

export function checkTokenValidity(token: string | undefined): null | number {
  try {
    if (!token || !token.startsWith("Bearer")) {
      return null;
    }

    const userData = token.replace("Bearer ", "");

    const userId = jwt.verify(userData, "omega-security-protection");

    if (typeof userId !== "string") {
      return userId.id;
    }

    return null;
  } catch {
    return null;
  }
}
