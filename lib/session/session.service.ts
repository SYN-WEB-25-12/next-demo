import { randomUUID } from "node:crypto";
import sessionRepository from "./session.repository";
import sessionHelpers, { SESSION_MAX_AGE_SECONDS } from "./session.helpers";

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

export async function createSession(data: {
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<string> {
  const sessionId = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000);

  await sessionRepository.create({
    id: sessionId,
    userId: data.userId,
    expiresAt,
  });

  await sessionHelpers.setSessionCookie(sessionId);
  return sessionId;
}

export async function getSession(sessionId?: string): Promise<Session | null> {
  if (!sessionId) return null;

  const dbSession = await sessionRepository.findById(sessionId);
  if (!dbSession) return null;

  if (dbSession.expiresAt.getTime() <= Date.now()) {
    await sessionRepository.delete(sessionId);
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
  await sessionRepository.delete(sessionId);
}

export async function getCurrentSession(): Promise<Session | null> {
  const sessionId = await sessionHelpers.getSessionCookie();
  if (!sessionId) return null;

  const session = await getSession(sessionId);
  if (!session) {
    await sessionHelpers.deleteSessionCookie();
    return null;
  }
  return session;
}

export const sessionService = {
  create: createSession,
  get: getSession,
  delete: deleteSession,
  getCurrent: getCurrentSession,
  setCookie: sessionHelpers.setSessionCookie,
  deleteCookie: sessionHelpers.deleteSessionCookie,
};

export default sessionService;
