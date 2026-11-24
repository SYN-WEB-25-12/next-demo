"use server";

import authService from "./auth.service";
import { redirect } from "next/navigation";

export type AuthActionResult = {
  error?: string;
} | null;

export async function registerAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const firstName = String(formData.get("first") ?? "");
  const lastName = String(formData.get("last") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const result = await authService.register({
    firstName,
    lastName,
    email,
    password,
  });

  if (!result.success) {
    return { error: result.error };
  }

  redirect("/");
}

export async function loginAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const result = await authService.login(email, password);

  if (!result.success) {
    return { error: result.error };
  }

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await authService.logout();
  redirect("/auth");
}
