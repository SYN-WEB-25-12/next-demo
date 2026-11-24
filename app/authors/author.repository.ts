import { prisma } from "@/lib/prisma";

export async function findAllAuthors() {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      _count: { select: { posts: { where: { published: true } } } },
      posts: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { createdAt: true },
      },
    },
    orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
  });
}

export const authorRepository = { findAllAuthors };
export default authorRepository;
