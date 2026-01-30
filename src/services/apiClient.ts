const DEFAULT_IMAGE_DEFACE_ENDPOINT = 'http://localhost:8000/api/deface-image' as const

export const getPrimaryDefaceEndpoint = (): string => {
  const configuredEndpoint = import.meta.env.VITE_IMAGE_DEFACE_ENDPOINT
  return configuredEndpoint ?? DEFAULT_IMAGE_DEFACE_ENDPOINT
}

export type ImageDefaceResponse = {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
}
