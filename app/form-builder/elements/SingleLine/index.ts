import type { ConditionFns, ConditionGroup } from '../../rules'
import { TextCursorInput } from 'lucide-vue-next'
import * as yup from 'yup'

import Input from '~/form-builder/rules/operand-value-fields/Input.vue'
import { generateId } from '../../utils'
import { elementTypes } from '../elementTypes'
import SingleLineField from './SingleLineField.vue'
import SingleLineProps from './SingleLineProps.vue'

const elementType = elementTypes.SINGLE_LINE

const singleLineElement: SingleLineElement = {
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
      fn: (operandValue: string, fieldValue) => operandValue === fieldValue,
      operandValueComponent: Input,
    },
    includes: {
      fn: (operandValue: string, fieldValue) => fieldValue.includes(operandValue),
      operandValueComponent: Input,
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
  generateValidationSchema: (validations: SingleLineInstance['validations']) => yup.StringSchema
  conditionFns: ConditionFns<string>
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
  properties: {
    label: string
    placeholder: string
  }
  validations: {
    required: boolean
  }
  rules: ConditionGroup | null
}

export default singleLineElement
