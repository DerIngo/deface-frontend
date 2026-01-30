export const FILTER_NAMES = ['blur', 'pixelate', 'line_mosaic', 'facet_effect', 'verwischung_1'] as const
export const PASTE_ELLIPSE_NAMES = ['feathered', 'hard'] as const

export type FilterName = (typeof FILTER_NAMES)[number]
export type PasteEllipseName = (typeof PASTE_ELLIPSE_NAMES)[number]
