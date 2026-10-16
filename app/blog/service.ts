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
        orderBy: { createdAt: "desc" }
    })
}

const exports = {
    createPost,
    getPosts
}

export default exports 