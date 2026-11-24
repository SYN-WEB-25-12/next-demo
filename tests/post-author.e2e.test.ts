import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import { prisma } from "../lib/prisma";
import service from "../app/blog/service";

describe("Post with Author (E2E)", () => {
  let authorId: number;
  let postId: number;
  const authorEmail = `author_${Date.now()}@example.com`;

  before(async () => {
    // 1. Create author in DB
    const author = await prisma.user.create({
      data: {
        firstName: "Ada",
        lastName: "Lovelace",
        email: authorEmail,
        passwordHash: "dummyHash",
      },
    });
    authorId = author.id;
  });

  after(async () => {
    if (postId) {
      await prisma.post.delete({ where: { id: postId } }).catch(() => {});
    }
    if (authorId) {
      await prisma.user.delete({ where: { id: authorId } }).catch(() => {});
    }
  });

  test("createPost associates the post with author and getPost includes author details", async () => {
    // Create post with author
    const post = await service.createPost("Computing Machinery", "Analytical Engine notes", authorId);
    postId = post.id;

    assert.ok(post.id);
    assert.strictEqual(post.userId, authorId);

    // Retrieve single post with author included
    const fetchedPost = await service.getPost(postId);
    assert.ok(fetchedPost);
    assert.strictEqual(fetchedPost?.id, postId);
    assert.ok(fetchedPost?.user);
    assert.strictEqual(fetchedPost?.user?.firstName, "Ada");
    assert.strictEqual(fetchedPost?.user?.lastName, "Lovelace");
    assert.strictEqual(fetchedPost?.user?.email, authorEmail);
  });

  test("getPosts includes author in the post list", async () => {
    const posts = await service.getPosts();
    assert.ok(posts.length > 0);

    const found = posts.find((p) => p.id === postId);
    assert.ok(found);
    assert.strictEqual(found?.user?.firstName, "Ada");
    assert.strictEqual(found?.user?.lastName, "Lovelace");
  });

  test("Anonymous post creation handles null author gracefully", async () => {
    const anonPost = await service.createPost("Anonymous Post", "No author attached", null);
    try {
      const fetched = await service.getPost(anonPost.id);
      assert.ok(fetched);
      assert.strictEqual(fetched?.user, null);
    } finally {
      await prisma.post.delete({ where: { id: anonPost.id } }).catch(() => {});
    }
  });
});
