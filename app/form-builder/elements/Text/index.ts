import type { ConditionFns, ConditionGroup } from '../../rules'
import { Type } from 'lucide-vue-next'

import { generateId } from '../../utils'
import { elementTypes } from '../elementTypes'
import TextField from './TextField.vue'
import TextProps from './TextProps.vue'

const elementType = elementTypes.TEXT

const textElement: TextElement = {
  construct: (): TextInstance => ({
    id: generateId(elementType),
    type: elementType,
    properties: {
      content: '',
    },
    validations: null,
    rules: null,
  }),
  generateValidationSchema() {
    return null
  },
  conditionFns: {},
  elementBtnProps: {
    icon: Type,
    label: 'Text',
  },
  fieldComponent: TextField,
  propertiesComponent: TextProps,
}

export interface TextElement {
  construct: () => TextInstance
  generateValidationSchema: () => null
  conditionFns: ConditionFns<string>
  elementBtnProps: {
    icon: Component
    label: string
  }
  fieldComponent: Component<{ elementInstance: TextInstance }>
  propertiesComponent: Component<{ elementInstance: TextInstance }>
}

export interface TextInstance {
  id: string
  type: typeof elementType
  properties: {
    content: string
  }
  validations: null
  rules: ConditionGroup | null
}

export default textElement
