import { loader } from '../$jokeId'

describe('loader', () => {
  it('fails without an id', async () => {
    const request = new Request('http://foo.ber')

    try {
      await loader({ request, context: {}, params: {} })
    } catch (error) {
      expect((error as Response).status).toEqual(400)
    }
    // Todo: assert loader has thrown
  })
})
