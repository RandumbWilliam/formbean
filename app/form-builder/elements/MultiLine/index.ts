import type { ConditionGroup } from '../../rules'
import { TextAlignStart } from 'lucide-vue-next'
import * as yup from 'yup'
import Input from '~/form-builder/rules/operand-value-fields/Input.vue'

import { generateId } from '../../utils'
import { elementTypes } from '../elementTypes'
import MultiLineField from './MultiLineField.vue'
import MultiLineProps from './MultiLineProps.vue'

const elementType = elementTypes.MULTI_LINE

const multiLineElement: MultiLineElement = {
  construct: (): MultiLineInstance => ({
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
      fieldComponent: Input,
      fn: (value: string, answer: string) => value === answer,
    },
    includes: {
      fieldComponent: Input,
      fn: (value: string, answer: string) => value.includes(answer),
    },
  },
  elementBtnProps: {
    icon: TextAlignStart,
    label: 'Multi Line',
  },
  fieldComponent: MultiLineField,
  propertiesComponent: MultiLineProps,
}

// TODO: fix conditionFns any
export interface MultiLineElement {
  construct: () => MultiLineInstance
  generateValidationSchema: (validations: MultiLineInstance['validations']) => yup.AnySchema
  conditionFns: any
  elementBtnProps: {
    icon: Component
    label: string
  }
  fieldComponent: Component<{ elementInstance: MultiLineInstance }>
  propertiesComponent: Component<{ elementInstance: MultiLineInstance }>
}

export interface MultiLineInstance {
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

export default multiLineElement
