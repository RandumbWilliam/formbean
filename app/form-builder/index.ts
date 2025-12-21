import type { ElementInstance } from './elements'
import type { ConditionGroup } from './rules'

export { default as FormBuilder } from './FormBuilder.vue'
export { default as FormRender } from './FormRender.vue'

export interface Form {
  title: string
  pages: {
    id: string
    elementInstances: ElementInstance[]
    rules: ConditionGroup | null
  }[]
}
