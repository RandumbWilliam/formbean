import type { ConditionFns, ConditionGroup } from '../../rules'
import { ListChecks } from 'lucide-vue-next'
import * as yup from 'yup'

import SingleSelect from '~/form-builder/rules/operand-value-fields/SingleSelect.vue'
import { generateId } from '../../utils'
import { elementTypes } from '../elementTypes'
import MultiChoiceField from './MultiChoiceField.vue'
import MultiChoiceProps from './MultiChoiceProps.vue'

const elementType = elementTypes.MULTI_CHOICE

const multiChoiceElement: MultiChoiceElement = {
  construct: (): MultiChoiceInstance => ({
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
    icon: ListChecks,
    label: 'Multi Choice',
  },
  fieldComponent: MultiChoiceField,
  propertiesComponent: MultiChoiceProps,
}

export interface MultiChoiceElement {
  construct: () => MultiChoiceInstance
  generateValidationSchema: (validations: MultiChoiceInstance['validations']) => yup.StringSchema
  conditionFns: ConditionFns<string>
  elementBtnProps: {
    icon: Component
    label: string
  }
  fieldComponent: Component<{ elementInstance: MultiChoiceInstance }>
  propertiesComponent: Component<{ elementInstance: MultiChoiceInstance }>
}

export interface MultiChoiceInstance {
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

export default multiChoiceElement
