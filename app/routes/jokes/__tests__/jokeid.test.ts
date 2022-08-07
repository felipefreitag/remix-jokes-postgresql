import { loader } from '../$jokeId'

describe('loader', () => {
  it('foo', async () => {
    const request = new Request('http://foo.ber')
    expect(await loader({ request, context: {}, params: {} })).toEqual(true)
  })
})
