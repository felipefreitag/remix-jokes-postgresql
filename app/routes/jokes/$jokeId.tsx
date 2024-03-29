import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node'
import {
  Link,
  useCatch,
  useLoaderData,
  useParams,
  Form,
} from '@remix-run/react'
import type { Joke } from '@prisma/client'
import { db } from '~/utils/db.server'
import { getUserId, requireUserId } from '~/utils/session.server'
import { JokeDisplay } from '~/components/joke'

type LoaderData = { joke: Joke; isOwner: boolean }

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined
}) => {
  if (!data) {
    return {
      title: 'No joke',
      description: 'No joke found',
    }
  }
  return {
    title: `"${data.joke.name}" joke`,
    description: `Enjoy the "${data.joke.name}" joke and much more`,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)

  const jokeId = params.jokeId || ''

  if (![32, 36].includes(jokeId.length)) {
    throw new Response('Joke id must be 32 or 36 characters', { status: 400 })
  }

  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  })

  if (!joke) {
    throw new Response('What a joke! Not found.', {
      status: 404,
    })
  }
  const data: LoaderData = { joke, isOwner: joke.jokester_id === userId }
  return data
}

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()
  if (form.get('_method') === 'delete') {
    const userId = await requireUserId(request)
    const joke = await db.joke.findUnique({
      where: { id: params.jokeId },
    })
    if (!joke) {
      throw new Response("Can't delete what does not exist", { status: 404 })
    }
    if (joke.jokester_id !== userId) {
      console.log('nope')
      throw new Response("Pssh, nice try. That's not your joke", {
        status: 401,
      })
    }
    await db.joke.delete({ where: { id: params.jokeId } })
    return redirect('.')
  }
}

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>()

  return <JokeDisplay joke={data.joke} isOwner={data.isOwner} />
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()
  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is {params.jokeId}?
        </div>
      )
    }
    case 401: {
      return (
        <div className="error-container">
          Sorry, but {params.jokeId} is not your joke.
        </div>
      )
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`)
    }
  }
}

export function ErrorBoundary(error: any) {
  console.log(error)
  const { jokeId } = useParams()
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  )
}
