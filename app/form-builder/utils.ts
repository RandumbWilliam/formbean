import type { GenericObject } from 'vee-validate'
import type { ConditionNode } from './rules'
import { elements } from './elements'

export function generateId(prefix: string): string {
  return `${prefix}_${Math.floor(Math.random() * 10e10)}`
}

export function evaluateConditions(
  conditionNode: ConditionNode,
  formValues: GenericObject,
): boolean {
  if (conditionNode.type === 'condition') {
    const { elementInstance, operator, operandValue } = conditionNode

    if (elementInstance === null || operator === null || operandValue === null)
      return false

    const element = elements[elementInstance.type]
    const conditionFn = element.conditionFns?.[operator]

    if (!conditionFn) {
      // shouldn't happen
      return false
    }

    const fieldValue = formValues[elementInstance.id]
    return conditionFn.fn(operandValue, fieldValue)
  }

  const { operator, children } = conditionNode

  const results = children.map(operand =>
    evaluateConditions(operand, formValues),
  )

  if (operator === 'and') {
    return results.every(Boolean)
  }

  if (operator === 'or') {
    return results.some(Boolean)
  }

  // shouldn't happen
  return false
}
