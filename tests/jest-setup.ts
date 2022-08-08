import { installGlobals } from '@remix-run/node'
import { testTransaction } from './helpers'

installGlobals()

const jestIt = global.it
const transactionalIt = (
  name: string,
  fn: () => Promise<unknown>,
  timeout?: number,
) => jestIt(name, testTransaction(fn), timeout)
transactionalIt.skip = jestIt.skip
transactionalIt.only = jestIt.only
transactionalIt.todo = jestIt.todo

global.testWithMutation = transactionalIt as jest.It
