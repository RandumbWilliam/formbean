import type { ConditionFns, ConditionGroup } from '../../rules'
import { CircleCheck } from 'lucide-vue-next'
import * as yup from 'yup'

import SingleSelect from '~/form-builder/rules/operand-value-fields/SingleSelect.vue'
import { generateId } from '../../utils'
import { elementTypes } from '../elementTypes'
import SingleChoiceField from './SingleChoiceField.vue'
import SingleChoiceProps from './SingleChoiceProps.vue'

const elementType = elementTypes.SINGLE_CHOICE

const singleChoiceElement: SingleChoiceElement = {
  construct: (): SingleChoiceInstance => ({
    id: generateId(elementType),
    type: elementType,
    properties: {
      label: '',
      description: '',
      options: [
        {
          id: generateId(`${elementType}_option`),
          label: '',
        },
      ],
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
    'exactly equals': {
      fn: (operandValue: string, fieldValue) => operandValue === fieldValue,
      operandValueComponent: SingleSelect,
    },
  },
  elementBtnProps: {
    icon: CircleCheck,
    label: 'Single Choice',
  },
  fieldComponent: SingleChoiceField,
  propertiesComponent: SingleChoiceProps,
}

export interface SingleChoiceElement {
  construct: () => SingleChoiceInstance
  generateValidationSchema: (validations: SingleChoiceInstance['validations']) => yup.StringSchema
  conditionFns: ConditionFns<string>
  elementBtnProps: {
    icon: Component
    label: string
  }
  fieldComponent: Component<{ elementInstance: SingleChoiceInstance }>
  propertiesComponent: Component<{ elementInstance: SingleChoiceInstance }>
}

export interface SingleChoiceInstance {
  id: string
  type: typeof elementType
  properties: {
    label: string
    description: string
    options: {
      id: string
      label: string
    }[]
  }
  validations: {
    required: boolean
  }
  rules: ConditionGroup | null
}

export default singleChoiceElement
