"use server"

import { revalidatePath } from "next/cache"
import service from "./service"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  service.createPost(title, content)

  revalidatePath("/blog")
}