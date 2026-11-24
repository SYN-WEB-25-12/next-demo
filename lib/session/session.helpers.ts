import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "sessionId";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function getSessionCookie(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
  } catch {
    return undefined;
  }
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
    // Gracefully handle calling outside Next.js request context (e.g. tests)
  }
}

export async function deleteSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Gracefully handle calling outside Next.js request context
  }
}

export const sessionHelpers = {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  getSessionCookie,
  setSessionCookie,
  deleteSessionCookie,
};

export default sessionHelpers;
