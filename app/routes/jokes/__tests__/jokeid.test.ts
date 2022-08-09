import { loader } from '../$jokeId'
import { db } from '~/utils/db.server'

describe('loader', () => {
  it('fails with an invalid id', async () => {
    const request = new Request('http://foo.bar')

    let result
    try {
      await loader({
        request,
        context: {},
        params: { jokeId: 'foo' },
      })
    } catch (error) {
      result = error
    }

    expect((result as Response).status).toEqual(400)
  })

  it('returns not found when joke is not found', async () => {
    const request = new Request('http://foo.bar')

    let result
    try {
      await loader({
        request,
        context: {},
        params: { jokeId: '49ed1af0-d122-4c56-ac8c-b7a5f033de88' },
      })
    } catch (error) {
      result = error
    }

    expect((result as Response).status).toEqual(404)
  })

  it('returns the joke when it is found', async () => {
    const request = new Request('http://foo.bar')

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
