"use server";

import { prisma } from "@/lib/prisma";
import sessionService from "@/lib/session";
import argon2 from "argon2";
import { redirect } from "next/navigation";

export type AuthActionResult = {
  error?: string;
} | null;

export async function registerAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const firstName = String(formData.get("first") ?? "").trim();
  const lastName = String(formData.get("last") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    return { error: "A user with this email already exists." };
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 64 * 1024,
    timeCost: 3,
    parallelism: 1,
  });

  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
    },
  });

  await sessionService.create({
    userId: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });

  redirect("/");
}

export async function loginAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const isValidPassword = await argon2.verify(user.passwordHash, password);
  if (!isValidPassword) {
    return { error: "Invalid email or password." };
  }

  await sessionService.create({
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  const session = await sessionService.getCurrent();
  if (session) {
    await sessionService.delete(session.id);
  }
  await sessionService.deleteCookie();
  redirect("/auth");
}
