const IMAGE_DEFACE_ENDPOINT = 'http://localhost:8000/api/deface-image' as const

export const getPrimaryDefaceEndpoint = (): string => IMAGE_DEFACE_ENDPOINT

export type ImageDefaceResponse = {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
}
