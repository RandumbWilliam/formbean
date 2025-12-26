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

// TODO: fix any type
export interface Condition {
  type: 'condition'
  elementInstance: ElementInstance | null
  operator: any
  operandValue: any
}

export interface ConditionGroup {
  type: 'group'
  operator: 'and' | 'or'
  children: ConditionNode[]
}

export type ConditionNode = Condition | ConditionGroup
