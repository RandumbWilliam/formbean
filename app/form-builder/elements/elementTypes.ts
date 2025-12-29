export const elementTypes = {
  SINGLE_LINE: 'single-line',
  MULTI_LINE: 'multi-line',
  SINGLE_CHOICE: 'single-choice',
  MULTI_CHOICE: 'multi-choice',
  FILE_UPLOAD: 'file-upload',
} as const

export type ElementTypes = (typeof elementTypes)[keyof typeof elementTypes]
