import type { ElementInstance } from '../elements'

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

// TODO: fix operandValue any type
export interface ConditionFns<TFieldValue> {
  [key: string]: {
    fn: (operandValue: any, fieldValue: TFieldValue) => boolean
    operandValueComponent: Component
  }
}

export interface Condition {
  type: 'condition'
  elementInstance: ElementInstance | null
  operator: string | null
  operandValue: any
}

export interface ConditionGroup {
  type: 'group'
  operator: 'and' | 'or'
  children: ConditionNode[]
}

export type ConditionNode = Condition | ConditionGroup
