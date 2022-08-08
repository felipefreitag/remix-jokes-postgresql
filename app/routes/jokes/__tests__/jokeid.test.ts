import { loader } from '../$jokeId'
import { db } from '~/utils/db.server'

describe('loader', () => {
  it('fails without an id', async () => {
    const request = new Request('http://foo.ber')

    let result
    try {
      await loader({ request, context: {}, params: {} })
    } catch (error) {
      result = error
    }

    expect((result as Response).status).toEqual(400)
  })

  it('returns 404 when joke is not found', async () => {
    const request = new Request('http://foo.ber')

    let result
    try {
      await loader({
        request,
        context: {},
        params: { jokeId: '259dd1c8-fe77-43fd-8c4f-86ffeed186f0' },
      })
    } catch (error) {
      result = error
    }

    expect((result as Response).status).toEqual(404)
  })

  testWithMutation('returns the joke when it is found', async () => {
    const kody = await db.user.create({
      data: {
        username: 'kody',
        // this is a hashed version of "twixrox"
        passwordHash:
          '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
      },
    })

    const joke = await db.joke.create({
      data: {
        jokester_id: kody.id,
        name: 'Road worker',
        content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
      },
    })

    const request = new Request('http://foo.ber')
    const { id } = joke

    let result
    result = await loader({
      request,
      context: {},
      params: { jokeId: id },
    })

    expect(result).toEqual({ joke, isOwner: false })
  })
})
