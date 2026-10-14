import { PrismaClient } from './generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaPg } from '@prisma/adapter-pg'

const global = globalThis as unknown as { prisma?: PrismaClient }

function createClient() {
  const connectionString = process.env.DATABASE_URL!
  const useNeon = connectionString.includes('neon.tech')

  const adapter = useNeon
    ? new PrismaNeon({ connectionString })
    : new PrismaPg({ connectionString })

  return new PrismaClient({ adapter })
}

export const prisma = global.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}