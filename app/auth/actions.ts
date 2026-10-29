"use server"

import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export async function registerAction(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!password) return;

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 64 * 1024,
    timeCost: 3,
    parallelism: 1,
  });

  await prisma.user.create({
      data: { 
          firstName: String(formData.get("first") ?? ""),
          lastName: String(formData.get("last") ?? ""),
          email: String(formData.get("email") ?? ""),
          passwordHash: passwordHash,
        }
    })
}
