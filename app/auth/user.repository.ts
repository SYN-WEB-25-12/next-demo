import { prisma } from "@/lib/prisma";
import type { User } from "@/lib/generated/prisma/client";

export async function findByEmail(email: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: { email },
  });
}

export async function findById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function createUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}): Promise<User> {
  return await prisma.user.create({
    data,
  });
}

export const userRepository = {
  findByEmail,
  findById,
  createUser,
};

export default userRepository;
