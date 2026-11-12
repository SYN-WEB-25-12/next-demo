import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";

export type SessionId = string;

export type Session = {
  id: SessionId;
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  expiresAt: Date;
};

const SESSION_COOKIE_NAME = "sessionId";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function createSession(data: {
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<string> {
  const sessionId = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: data.userId,
      expiresAt,
    },
  });

  await setSessionCookie(sessionId);
  return sessionId;
}

export async function getSession(sessionId?: string): Promise<Session | null> {
  if (!sessionId) return null;

  const dbSession = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!dbSession) return null;

  if (dbSession.expiresAt.getTime() <= Date.now()) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
    return null;
  }

  return {
    id: dbSession.id,
    userId: dbSession.userId,
    email: dbSession.user.email,
    firstName: dbSession.user.firstName,
    lastName: dbSession.user.lastName,
    createdAt: dbSession.createdAt,
    expiresAt: dbSession.expiresAt,
  };
}

export async function deleteSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
}

export async function getCurrentSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const session = await getSession(sessionId);
  if (!session) {
    await deleteSessionCookie();
    return null;
  }
  return session;
}

export async function setSessionCookie(sessionId: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
  } catch {
    // Gracefully handle when called outside an active Next.js HTTP request scope (e.g. tests)
  }
}

export async function deleteSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Gracefully handle when called outside an active Next.js HTTP request scope
  }
}

export const sessionService = {
  create: createSession,
  get: getSession,
  delete: deleteSession,
  getCurrent: getCurrentSession,
  setCookie: setSessionCookie,
  deleteCookie: deleteSessionCookie,
};

export default sessionService;
