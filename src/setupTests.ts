import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/server'

const { Headers: NativeHeaders } = globalThis

if (NativeHeaders && typeof (NativeHeaders.prototype as { all?: unknown }).all !== 'function') {
  class HeadersWithAll extends NativeHeaders {
    all() {
      const accumulator: Record<string, string[]> = {}
      this.forEach((value, name) => {
        const normalizedName = name.toLowerCase()
        if (!accumulator[normalizedName]) {
          accumulator[normalizedName] = []
        }
        accumulator[normalizedName].push(value)
      })
      return accumulator
    }
  }
  globalThis.Headers = HeadersWithAll as typeof Headers
}

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
