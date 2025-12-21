import type { ElementInstance, Elements } from '../elements'
import type { OperandValueFieldTypes } from './operandValueFieldTypes'
import Input from './operand-value-fields/Input.vue'
import { operandValueFieldTypes } from './operandValueFieldTypes'

export const operandValueFields = {
  [operandValueFieldTypes.INPUT]: Input,
}

export function defaultCondition(): Condition {
  return {
    type: 'condition',
    elementInstance: null,
    operator: null,
    operandValue: null,
  }
}

export function defaultConditionGroup(): ConditionGroup {
  return {
    type: 'group',
    operator: 'and',
    children: [defaultCondition()],
  }
}

export interface ConditionFn<TValue, TAnswer> {
  fieldType: OperandValueFieldTypes
  fn: (value: TValue, answer: TAnswer) => boolean
}

export interface Condition {
  type: 'condition'
  elementInstance: ElementInstance | null
  operator: keyof Elements['conditionFns'] | null
  operandValue: any
}

export interface ConditionGroup {
  type: 'group'
  operator: 'and' | 'or'
  children: ConditionNode[]
}

export type ConditionNode = Condition | ConditionGroup
