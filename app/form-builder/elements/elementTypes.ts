export const elementTypes = {
  SINGLE_LINE: 'single-line',
} as const

export type ElementTypes = (typeof elementTypes)[keyof typeof elementTypes]
