import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import argon2 from "argon2";
import { prisma } from "../lib/prisma";
import sessionService, {
  createSession,
  getSession,
  deleteSession,
} from "../lib/session";
import { loginAction, registerAction } from "../app/auth/actions";

describe("Auth & Regular Session Flow (E2E with Postgres)", () => {
  let createdUserId: number | null = null;
  const testEmail = `e2e_test_${Date.now()}@example.com`;
  const testPassword = "superSecurePassword123!";

  before(async () => {
    // Ensure test user exists in Postgres
    const passwordHash = await argon2.hash(testPassword, {
      type: argon2.argon2id,
      memoryCost: 64 * 1024,
      timeCost: 3,
      parallelism: 1,
    });

    const user = await prisma.user.create({
      data: {
        firstName: "Postgres",
        lastName: "Tester",
        email: testEmail,
        passwordHash,
      },
    });

    createdUserId = user.id;
  });

  after(async () => {
    if (createdUserId) {
      await prisma.user.delete({ where: { id: createdUserId } }).catch(() => {});
    }
  });

  test("Session Lifecycle: create, persist in DB, retrieve, and delete session", async () => {
    assert.ok(createdUserId, "Test user ID must exist");

    // 1. Create a session in DB
    const sessionId = await createSession({
      userId: createdUserId,
      email: testEmail,
      firstName: "Postgres",
      lastName: "Tester",
    });
    assert.ok(sessionId, "A sessionId should be returned");
    assert.strictEqual(typeof sessionId, "string");

    // 2. Retrieve session from DB
    const session = await getSession(sessionId);
    assert.ok(session, "Session should exist in PostgreSQL");
    assert.strictEqual(session?.userId, createdUserId);
    assert.strictEqual(session?.email, testEmail);
    assert.strictEqual(session?.firstName, "Postgres");
    assert.strictEqual(session?.lastName, "Tester");
    assert.ok(session?.expiresAt instanceof Date);
    assert.ok(session.expiresAt.getTime() > Date.now(), "Session expiresAt should be in the future");

    // 3. Delete session (Logout)
    await deleteSession(sessionId);
    const deletedSession = await getSession(sessionId);
    assert.strictEqual(deletedSession, null, "Deleted session should return null");
  });

  test("Session Expiration: expired sessions in DB return null", async () => {
    assert.ok(createdUserId);

    const sessionId = await createSession({
      userId: createdUserId,
      email: testEmail,
    });

    // Manually set expiration in DB to past
    await prisma.session.update({
      where: { id: sessionId },
      data: { expiresAt: new Date(Date.now() - 5000) },
    });

    const expiredResult = await getSession(sessionId);
    assert.strictEqual(expiredResult, null, "Expired session in DB must return null");
  });

  test("Credential Verification: Argon2 password hashing and verification", async () => {
    const rawPassword = "superSecretPassword123!";
    const wrongPassword = "wrongPassword!";

    const hash = await argon2.hash(rawPassword, {
      type: argon2.argon2id,
      memoryCost: 64 * 1024,
      timeCost: 3,
      parallelism: 1,
    });

    const isCorrect = await argon2.verify(hash, rawPassword);
    assert.strictEqual(isCorrect, true, "Argon2 should verify matching password");

    const isWrong = await argon2.verify(hash, wrongPassword);
    assert.strictEqual(isWrong, false, "Argon2 should reject mismatched password");
  });

  test("Input Validation: reject empty credentials", async () => {
    const emptyFormData = new FormData();
    const loginResult = await loginAction(null, emptyFormData);
    assert.deepStrictEqual(loginResult, { error: "Email and password are required." });

    const registerResult = await registerAction(null, emptyFormData);
    assert.deepStrictEqual(registerResult, { error: "Email and password are required." });
  });

  test("Login Action: reject invalid credentials", async () => {
    const formData = new FormData();
    formData.set("email", testEmail);
    formData.set("password", "wrongPasswordHere");

    const result = await loginAction(null, formData);
    assert.deepStrictEqual(result, { error: "Invalid email or password." });
  });

  test("Session Service Singleton: exposes required methods", () => {
    assert.strictEqual(typeof sessionService.create, "function");
    assert.strictEqual(typeof sessionService.get, "function");
    assert.strictEqual(typeof sessionService.delete, "function");
    assert.strictEqual(typeof sessionService.getCurrent, "function");
    assert.strictEqual(typeof sessionService.setCookie, "function");
    assert.strictEqual(typeof sessionService.deleteCookie, "function");
  });
});
