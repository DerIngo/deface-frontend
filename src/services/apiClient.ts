const DEFAULT_IMAGE_DEFACE_ENDPOINT = 'http://localhost:8000/api/deface-image' as const

declare global {
  interface Window {
    __env?: Record<string, string>
  }
}

export const getPrimaryDefaceEndpoint = (): string => {
  const runtimeEndpoint = typeof window !== 'undefined' ? window.__env?.VITE_IMAGE_DEFACE_ENDPOINT : undefined
  const buildEndpoint = import.meta.env.VITE_IMAGE_DEFACE_ENDPOINT
  const configuredEndpoint = runtimeEndpoint ?? buildEndpoint
  return configuredEndpoint ?? DEFAULT_IMAGE_DEFACE_ENDPOINT
}

export type ImageDefaceResponse = {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
}
