import { users, sessionTable, User, Session } from "@/db/schema/schema";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { NextApiResponse } from "next";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  console.log(token);
  return "Bearer " + token;
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await db.insert(sessionTable).values(session);
  console.log(session);
  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  if (!token || !token.startsWith("Bearer ")) {
    return { session: null, user: null };
  }

  token.replace("Bearer ", "");

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, session: sessionTable })
    .from(sessionTable)
    .innerJoin(users, eq(sessionTable.userId, users.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(sessionTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionTable.id, session.id));
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateAllSessions(userId: number): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export function resetCookies(res: NextApiResponse) {
  res.setHeader("Set-Cookie", `session=; HttpOnly; Max-Age=0;`);

  return res.status(403).json({
    access: "denied",
  });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
