export const operandValueFieldTypes = {
  INPUT: 'input',
} as const

export type OperandValueFieldTypes = (typeof operandValueFieldTypes)[keyof typeof operandValueFieldTypes]
