import { PrismaClient } from '@prisma/client'

// Add a global Prisma variable to prevent multiple instances in development.
let prisma: PrismaClient

declare global {
  var __prisma: PrismaClient | undefined
}

// In development, we don't want to create a new Prisma instance with every hot reload,
// so we store it in the global object.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
  prisma.$connect() // Connect to the database when initializing Prisma in production
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient()
    global.__prisma.$connect() // Connect in development when initializing Prisma
  }
  prisma = global.__prisma
}

export { prisma }
