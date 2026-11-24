import { prisma } from "@/lib/prisma";

export async function findActiveAuthors() {
  return await prisma.user.findMany({
    where: { posts: { some: { published: true } } },
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

export const authorRepository = { findActiveAuthors };
export default authorRepository;
