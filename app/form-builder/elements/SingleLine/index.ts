import type { ConditionFn, ConditionGroup } from '../../rules'
import { TextCursorInput } from 'lucide-vue-next'
import * as yup from 'yup'
import { operandValueFieldTypes } from '../../rules/operandValueFieldTypes'
import { generateId } from '../../utils'

import { elementTypes } from '../elementTypes'
import SingleLineField from './SingleLineField.vue'
import SingleLineProps from './SingleLineProps.vue'

const elementType = elementTypes.SINGLE_LINE

export const singleLineElement: SingleLineElement = {
  construct: (): SingleLineInstance => ({
    id: generateId(elementType),
    type: elementType,
    properties: {
      label: '',
      placeholder: '',
    },
    validations: {
      required: false,
    },
    rules: null,
  }),
  generateValidationSchema(validations) {
    let schema = yup.string()

    if (validations.required) {
      schema = schema.required()
    }

    return schema
  },
  conditionFns: {
    equals: {
      fieldType: operandValueFieldTypes.INPUT,
      fn: (value, answer) => value === answer,
    },
    includes: {
      fieldType: operandValueFieldTypes.INPUT,
      fn: (value, answer) => value.includes(answer),
    },
  },
  elementBtnProps: {
    icon: TextCursorInput,
    label: 'Single Line',
  },
  fieldComponent: SingleLineField,
  propertiesComponent: SingleLineProps,
}

export interface SingleLineElement {
  construct: () => SingleLineInstance
  generateValidationSchema: (validations: SingleLineValidations) => yup.AnySchema
  conditionFns: SingleLineConditionFns
  elementBtnProps: {
    icon: Component
    label: string
  }
  fieldComponent: Component<{ elementInstance: SingleLineInstance }>
  propertiesComponent: Component<{ elementInstance: SingleLineInstance }>
}

export interface SingleLineInstance {
  id: string
  type: typeof elementType
  properties: SingleLineProperties
  validations: SingleLineValidations
  rules: ConditionGroup | null
}

export interface SingleLineProperties {
  label: string
  placeholder: string
}

export interface SingleLineValidations {
  required: boolean
}

export interface SingleLineConditionFns {
  equals: ConditionFn<string, string>
  includes: ConditionFn<string, string>
}
