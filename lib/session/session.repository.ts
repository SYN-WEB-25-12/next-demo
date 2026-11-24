import { prisma } from "@/lib/prisma";

export async function createSessionRecord(data: {
  id: string;
  userId: number;
  expiresAt: Date;
}) {
  return await prisma.session.create({
    data,
  });
}

export async function findSessionById(id: string) {
  return await prisma.session.findUnique({
    where: { id },
    include: { user: true },
  });
}

export async function deleteSessionRecord(id: string) {
  return await prisma.session.delete({
    where: { id },
  }).catch(() => null);
}

export const sessionRepository = {
  create: createSessionRecord,
  findById: findSessionById,
  delete: deleteSessionRecord,
};

export default sessionRepository;
