import { PrismaClient } from '@prisma/client'
import { db } from '~/utils/db.server'

const testTransaction = (fnWithinTransaction: () => Promise<unknown>) => {
  const oldDb = db
  const connection = new PrismaClient()
  const test = async () => {
    await connection.$transaction(async (prisma) => {
      // @ts-ignore
      global.__db = prisma

      try {
        await prisma.$executeRaw`SET timezone TO 'UTC'`
        await fnWithinTransaction()
      } finally {
        await prisma.$executeRaw`ROLLBACK`
        global.__db = oldDb
      }
    })
    connection.$disconnect()
  }

  return test
}

export { testTransaction }
