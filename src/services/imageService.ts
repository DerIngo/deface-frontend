import { FilterName, PasteEllipseName } from '../config/constants'
import { getPrimaryDefaceEndpoint } from './apiClient'

const IMAGE_FIELD_NAME = 'image'
const FILTER_FIELD_NAME = 'filterName'
const PASTE_FIELD_NAME = 'pasteEllipseName'

export const processImage = async (
  file: File,
  filterName: FilterName,
  pasteEllipseName: PasteEllipseName,
): Promise<string> => {
  const formData = new FormData()
  formData.append(IMAGE_FIELD_NAME, file)
  formData.append(FILTER_FIELD_NAME, filterName)
  formData.append(PASTE_FIELD_NAME, pasteEllipseName)

  const response = await fetch(getPrimaryDefaceEndpoint(), {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Image processing failed (${response.status})`)
  }

  const blob = await response.blob()
  return URL.createObjectURL(blob)
}
