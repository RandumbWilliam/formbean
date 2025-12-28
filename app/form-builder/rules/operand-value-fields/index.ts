import Input from './Input.vue'
import SingleSelect from './SingleSelect.vue'

export const operandValueFieldTypes = {
  INPUT: 'input',
  SINGLE_SELECT: 'single-select',
} as const

export type OperandValueFieldTypes = (typeof operandValueFieldTypes)[keyof typeof operandValueFieldTypes]

export const operandValueFields = {
  [operandValueFieldTypes.INPUT]: Input,
  [operandValueFieldTypes.SINGLE_SELECT]: SingleSelect,
}

export interface OperandValueType {
  [operandValueFieldTypes.INPUT]: string
  [operandValueFieldTypes.SINGLE_SELECT]: string
}

export type OperandValueFields = (typeof operandValueFields)[keyof typeof operandValueFields]
