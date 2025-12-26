export const elementTypes = {
  SINGLE_LINE: 'single-line',
  MULTI_LINE: 'multi-line',
  SINGLE_CHOICE: 'single-choice',
} as const

export type ElementTypes = (typeof elementTypes)[keyof typeof elementTypes]
