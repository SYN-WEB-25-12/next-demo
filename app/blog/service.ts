import { prisma } from "@/lib/prisma"

async function createPost(title: string, content: string) {
  await prisma.post.create({
    data: {
      title,
      content,
      published: true
    }
  })
}

async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true }
    })
}

async function getPost(id: number) {
    return await prisma.post.findFirst({
        where: { id }
    })
}

async function deletePost(id: number, authorId: number | null) {
    const post = await getPost(id)
    if (post?.userId !== authorId) {
        return
    }
    return prisma.post.delete({
        where: { id }
    })
}

const exports = {
    createPost,
    getPosts,
    deletePost
}

export default exports 