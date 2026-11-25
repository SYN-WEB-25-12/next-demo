import { prisma } from "@/lib/prisma";

export async function findAllWithAuthor() {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}

export async function findByIdWithAuthor(id: number) {
  return await prisma.post.findFirst({
    where: { id },
    include: { user: true },
  });
}

export async function createPost(data: {
  title: string;
  content: string;
  published?: boolean;
  userId?: number;
}) {
  return await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      published: data.published ?? true,
      userId: data.userId,
    },
  });
}

export async function deletePostById(id: number) {
  return await prisma.post.delete({
    where: { id },
  });
}

export async function setPublishedById(id: number, published: boolean) {
  return await prisma.post.update({
    where: { id },
    data: { published },
  });
}

export const postRepository = {
  findAllWithAuthor,
  findByIdWithAuthor,
  createPost,
  deletePostById,
  setPublishedById,
};

export default postRepository;
