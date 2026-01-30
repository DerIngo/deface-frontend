// @vitest-environment node
import { rest, type DefaultBodyType, type MockedResponse } from 'msw'
import { FILTER_NAMES, PASTE_ELLIPSE_NAMES } from '../config/constants'
import { getPrimaryDefaceEndpoint } from './apiClient'
import { processImage } from './imageService'
import { server } from '../mocks/server'

const ensureHeadersAll = async (
  response: Promise<MockedResponse<DefaultBodyType>> | MockedResponse<DefaultBodyType>,
) => {
  const mocked = await response
  if (mocked.headers && typeof (mocked.headers as any).all !== 'function') {
    ;(mocked.headers as any).all = () => {
      const normalized: Record<string, string> = {}
      ;(mocked.headers as Headers).forEach((value, name) => {
        normalized[name.toLowerCase()] = value
      })
      return normalized
    }
  }
  return mocked
}

const ENDPOINT = getPrimaryDefaceEndpoint()

describe('imageService', () => {
  it('returns a blob URL when the backend responds with an image', async () => {
    const blob = new Blob(['data'], { type: 'image/png' })
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) => {
        expect(req.url.searchParams.get('filter_name')).toBe(FILTER_NAMES[0])
        expect(req.url.searchParams.get('paste_ellipse_name')).toBe(PASTE_ELLIPSE_NAMES[0])
        return ensureHeadersAll(res(ctx.status(200), ctx.body(blob)))
      }),
    )

    const file = new File(['payload'], 'photo.png', { type: 'image/png' })
    const result = await processImage(file, FILTER_NAMES[0], PASTE_ELLIPSE_NAMES[0])

    expect(result).toMatch(/^blob:/)
    URL.revokeObjectURL(result)
  })

  it('throws when the backend responds with an error status', async () => {
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) => {
        expect(req.url.searchParams.get('filter_name')).toBe(FILTER_NAMES[0])
        expect(req.url.searchParams.get('paste_ellipse_name')).toBe(PASTE_ELLIPSE_NAMES[0])
        return ensureHeadersAll(res(ctx.status(500)))
      }),
    )

    const file = new File(['payload'], 'photo.png', { type: 'image/png' })

    await expect(processImage(file, FILTER_NAMES[0], PASTE_ELLIPSE_NAMES[0])).rejects.toThrow(
      /Image processing failed/,
    )
  })
})
