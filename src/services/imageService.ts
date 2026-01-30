import { FilterName, PasteEllipseName } from '../config/constants'
import { getPrimaryDefaceEndpoint } from './apiClient'

const IMAGE_FIELD_NAME = 'input_file'

export const processImage = async (
  file: File,
  filterName: FilterName,
  pasteEllipseName: PasteEllipseName,
): Promise<string> => {
  const formData = new FormData()
  formData.append(IMAGE_FIELD_NAME, file)

  const endpoint = new URL(getPrimaryDefaceEndpoint())
  endpoint.searchParams.set('filter_name', filterName)
  endpoint.searchParams.set('paste_ellipse_name', pasteEllipseName)

  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Image processing failed (${response.status})`)
  }

  const blob = await response.blob()
  return URL.createObjectURL(blob)
}
