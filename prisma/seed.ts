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
        passwordHash: "abcd"
      }
    })
  }

  if (await prisma.post.count() > 0) {
    console.log("Seed for posts already applied. Skipping.");
  } else {
    await prisma.post.create({
      data: { 
          title: "Hallo, Syntax!",
          content: "Dies ist unser erster Post.",
          published: true
      }
    })
    await prisma.post.create({
      data: { 
          title: "Hallo zurück, Syntax!",
          content: "Das ist unser zweiter Post.",
          published: true
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