import { Link, LoaderFunction, useLoaderData } from 'remix'
import type { Joke } from '@prisma/client'
import { db } from '~/utils/db.server'

type LoaderData = { joke: Joke }

export const loader: LoaderFunction = async ({ params }) => {
  const count = await db.joke.count()
  const randomRowNumber = Math.floor(Math.random() * count)
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  })

  if (!randomJoke) throw new Error('Joke not found')
  const data: LoaderData = { joke: randomJoke }
  return data
}

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>()
  const { name, content } = data.joke

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{content}</p>
      <Link to=".">{name} Permalink</Link>
    </div>
  )
}
