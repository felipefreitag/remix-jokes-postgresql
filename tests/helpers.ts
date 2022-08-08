import { db } from '~/utils/db.server'

const testTransaction = (fnWithinTransaction: () => Promise<unknown>) => {
  const test = async () => {
    try {
      await db.$executeRaw`SET timezone TO 'UTC'`
      await fnWithinTransaction()
    } finally {
      await db.$executeRaw`TRUNCATE TABLE users CASCADE`
    }
  }

  return test
}

export { testTransaction }
