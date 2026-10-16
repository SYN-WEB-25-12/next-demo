"use server"

import { revalidatePath } from "next/cache"
import service from "./service"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  await service.createPost(title, content)

  revalidatePath("/blog")
}

export async function deletePost(id: number) {
  await service.deletePost(id, null)

  revalidatePath("/blog")
}