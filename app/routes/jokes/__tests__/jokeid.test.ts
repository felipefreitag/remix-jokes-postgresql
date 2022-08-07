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

  it('returns the joke when it is found', async () => {
    const request = new Request('http://foo.ber')

    const jokes = await db.joke.findMany({ take: 1 })
    const joke = jokes[0]
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
