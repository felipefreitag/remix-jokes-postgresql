import { Link, useCatch, useLoaderData } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/node'
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

  if (!randomJoke) {
    throw new Response('No random joke found', {
      status: 403,
    })
  }
  const data: LoaderData = { joke: randomJoke }
  return data
}

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>()
  const { name, content, id } = data.joke

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{content}</p>
      <Link to={id}>{name} Permalink</Link>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div className="error-container">There are no jokes to display.</div>
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>
}
