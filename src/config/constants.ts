export const FILTER_NAMES = ['blur'] as const
export const PASTE_ELLIPSE_NAMES = ['feathered'] as const

export type FilterName = (typeof FILTER_NAMES)[number]
export type PasteEllipseName = (typeof PASTE_ELLIPSE_NAMES)[number]
