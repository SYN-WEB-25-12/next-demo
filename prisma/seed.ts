import { prisma } from '../lib/prisma'

const isProdEnv = process.env.VERCEL_ENV === "production";

async function seed() {
  if (isProdEnv) {
    console.log("Auto-seed disabled for this environment.");
    return;
  }

  if (await prisma.user.count() > 0) {
    console.log("Seed for users already applied. Skipping.");
  } else {
    await prisma.user.create({
      data: { 
          firstName: "Alice",
          lastName: "Alisson",
          email: "alice@test.com",
          passwordHash: "abcd",
          posts: {
            create: [{
              title: "Alice's first post",
              content: "Here is what she says."
            }, {
              title: "Alice's second post",
              content: "Even more content."
            }]
          }
        }
    })
    await prisma.user.create({
      data: {
          firstName: "Bob",
          lastName: "Bobisson",
          email: "bob@test.com",
          passwordHash: "defg",
          posts: {
            create: [{
              title: "Bob's first post",
              content: "Here is what he says."
            }, {
              title: "Bob's second post",
              content: "Even more content from him."
            }]
          }
        }
    })
  }
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })