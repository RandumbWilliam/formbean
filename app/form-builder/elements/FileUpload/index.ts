import type { ConditionFns, ConditionGroup } from '../../rules'
import { FileUp } from 'lucide-vue-next'
import * as yup from 'yup'

import SingleSelect from '~/form-builder/rules/operand-value-fields/SingleSelect.vue'
import { generateId } from '../../utils'
import { elementTypes } from '../elementTypes'
import FileUploadField from './FileUploadField.vue'
import FileUploadProps from './FileUploadProps.vue'

const elementType = elementTypes.FILE_UPLOAD

const fileUploadElement: FileUploadElement = {
  construct: (): FileUploadInstance => ({
    id: generateId(elementType),
    type: elementType,
    properties: {
      label: '',
      description: '',
      maxFiles: 1,
      maxFileSize: 1024,
      allowedFileTypes: [],
    },
    validations: {
      required: false,
    },
    rules: null,
  }),
  generateValidationSchema(validations) {
    let schema = yup.array().defined()

    if (validations.required) {
      schema = schema.min(1)
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
    icon: FileUp,
    label: 'File Upload',
  },
  fieldComponent: FileUploadField,
  propertiesComponent: FileUploadProps,
}

export interface FileUploadElement {
  construct: () => FileUploadInstance
  // TODO: fix any return type in array schema
  generateValidationSchema: (validations: FileUploadInstance['validations']) => yup.ArraySchema<any[], any>
  conditionFns: ConditionFns<string>
  elementBtnProps: {
    icon: Component
    label: string
  }
  fieldComponent: Component<{ elementInstance: FileUploadInstance }>
  propertiesComponent: Component<{ elementInstance: FileUploadInstance }>
}

export interface FileUploadInstance {
  id: string
  type: typeof elementType
  properties: {
    label: string
    description: string
    maxFiles: number
    maxFileSize: number
    allowedFileTypes: string[]
  }
  validations: {
    required: boolean
  }
  rules: ConditionGroup | null
}

export default fileUploadElement
