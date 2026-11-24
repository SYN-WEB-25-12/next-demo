import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import { prisma } from "../lib/prisma";
import authorsService from "../app/authors/service";

describe("Authors (E2E)", () => {
  const suffix = Date.now();

  let authorWithPublishedId: number;
  let authorAlphabeticallyFirstId: number;
  let authorWithOnlyUnpublishedId: number;
  let authorWithNoPostsId: number;
  let anonymousPostId: number;
  const postIds: number[] = [];

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const now = new Date();

  before(async () => {
    // Inserted first but alphabetically last, to make the sort assertion meaningful.
    const authorWithPublished = await prisma.user.create({
      data: {
        firstName: "Zelda",
        lastName: `Zorro_${suffix}`,
        email: `zelda_${suffix}@example.com`,
        passwordHash: "dummyHash",
      },
    });
    authorWithPublishedId = authorWithPublished.id;

    const olderPost = await prisma.post.create({
      data: {
        title: "Older published post",
        content: "...",
        published: true,
        userId: authorWithPublishedId,
        createdAt: twoDaysAgo,
      },
    });
    const newerPost = await prisma.post.create({
      data: {
        title: "Newer published post",
        content: "...",
        published: true,
        userId: authorWithPublishedId,
        createdAt: now,
      },
    });
    postIds.push(olderPost.id, newerPost.id);

    // Inserted second but alphabetically first.
    const authorAlphabeticallyFirst = await prisma.user.create({
      data: {
        firstName: "Amy",
        lastName: `Adams_${suffix}`,
        email: `amy_${suffix}@example.com`,
        passwordHash: "dummyHash",
      },
    });
    authorAlphabeticallyFirstId = authorAlphabeticallyFirst.id;

    const amyPost = await prisma.post.create({
      data: {
        title: "Amy's published post",
        content: "...",
        published: true,
        userId: authorAlphabeticallyFirstId,
      },
    });
    postIds.push(amyPost.id);

    const authorWithOnlyUnpublished = await prisma.user.create({
      data: {
        firstName: "Unpublished",
        lastName: `Author_${suffix}`,
        email: `unpublished_${suffix}@example.com`,
        passwordHash: "dummyHash",
      },
    });
    authorWithOnlyUnpublishedId = authorWithOnlyUnpublished.id;

    const unpublishedPost = await prisma.post.create({
      data: {
        title: "Draft post",
        content: "...",
        published: false,
        userId: authorWithOnlyUnpublishedId,
      },
    });
    postIds.push(unpublishedPost.id);

    const authorWithNoPosts = await prisma.user.create({
      data: {
        firstName: "NoPosts",
        lastName: `Author_${suffix}`,
        email: `noposts_${suffix}@example.com`,
        passwordHash: "dummyHash",
      },
    });
    authorWithNoPostsId = authorWithNoPosts.id;

    const anonymousPost = await prisma.post.create({
      data: {
        title: "Anonymous published post",
        content: "...",
        published: true,
      },
    });
    anonymousPostId = anonymousPost.id;
  });

  after(async () => {
    for (const id of [...postIds, anonymousPostId]) {
      await prisma.post.delete({ where: { id } }).catch(() => {});
    }

    for (const id of [
      authorWithPublishedId,
      authorAlphabeticallyFirstId,
      authorWithOnlyUnpublishedId,
      authorWithNoPostsId,
    ]) {
      await prisma.user.delete({ where: { id } }).catch(() => {});
    }
  });

  test("lists every author, including those with no published posts", async () => {
    const authors = await authorsService.getAuthors();
    const resultIds = authors.map((author) => author.id);

    assert.ok(resultIds.includes(authorWithPublishedId));
    assert.ok(resultIds.includes(authorWithOnlyUnpublishedId));
    assert.ok(resultIds.includes(authorWithNoPostsId));
  });

  test("reports a zero count and no publish date for authors without a published post", async () => {
    const authors = await authorsService.getAuthors();

    const onlyUnpublished = authors.find((a) => a.id === authorWithOnlyUnpublishedId);
    assert.ok(onlyUnpublished);
    assert.strictEqual(onlyUnpublished?.publishedPostCount, 0);
    assert.strictEqual(onlyUnpublished?.lastPublishedAt, null);

    const noPosts = authors.find((a) => a.id === authorWithNoPostsId);
    assert.ok(noPosts);
    assert.strictEqual(noPosts?.publishedPostCount, 0);
    assert.strictEqual(noPosts?.lastPublishedAt, null);
  });

  test("reports the published post count and most recent published post date", async () => {
    const authors = await authorsService.getAuthors();
    const author = authors.find((a) => a.id === authorWithPublishedId);

    assert.ok(author);
    assert.strictEqual(author?.publishedPostCount, 2);
    assert.strictEqual(author?.lastPublishedAt?.getTime(), now.getTime());
  });

  test("sorts authors alphabetically by first and last name", async () => {
    const authors = await authorsService.getAuthors();
    const relevant = authors.filter((author) =>
      [`Adams_${suffix}`, `Zorro_${suffix}`].includes(author.lastName)
    );

    assert.strictEqual(relevant.length, 2);
    assert.strictEqual(relevant[0].firstName, "Amy");
    assert.strictEqual(relevant[1].firstName, "Zelda");
  });
});
