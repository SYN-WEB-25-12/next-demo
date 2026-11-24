"use server";

import { revalidatePath } from "next/cache";
import sessionService from "@/lib/session";
import blogService from "./service";

export async function createPost(formData: FormData): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) return;

  const session = await sessionService.getCurrent();
  await blogService.createPost(title, content, session?.userId ?? null);

  revalidatePath("/blog");
}

export async function deletePost(id: number): Promise<void> {
  const session = await sessionService.getCurrent();
  await blogService.deletePost(id, session?.userId ?? null);

  revalidatePath("/blog");
}
