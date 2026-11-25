"use server";

import { revalidatePath } from "next/cache";
import sessionService from "@/lib/session";
import blogService from "./service";

export async function createPost(formData: FormData): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!title || !content) return;

  const session = await sessionService.getCurrent();
  await blogService.createPost(title, content, session?.userId ?? null, published);

  revalidatePath("/blog");
}

export async function deletePost(id: number): Promise<void> {
  const session = await sessionService.getCurrent();
  await blogService.deletePost(id, session?.userId ?? null);

  revalidatePath("/blog");
}

async function setPostPublished(id: number, published: boolean): Promise<void> {
  const session = await sessionService.getCurrent();
  await blogService.setPublished(id, published, session?.userId ?? null);

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  revalidatePath("/authors");
}

export async function publishPost(id: number): Promise<void> {
  await setPostPublished(id, true);
}

export async function unpublishPost(id: number): Promise<void> {
  await setPostPublished(id, false);
}
