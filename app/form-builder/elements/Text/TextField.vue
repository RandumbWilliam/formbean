<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { TextInstance } from '.'
import { evaluateConditions } from '~/form-builder/utils'

const props = withDefaults(
  defineProps<{
    elementInstance: TextInstance
    formValues?: GenericObject | null
    draft?: boolean
  }>(),
  {
    formValues: null,
    draft: false,
  },
)

const renderField = computed(() => {
  if (
    props.draft
    || props.elementInstance.rules === null
    || props.formValues === null
  ) {
    return true
  }

  return evaluateConditions(
    props.elementInstance.rules,
    props.formValues,
  )
})

const renderEmptyMessage = computed(() => {
  const text = props.elementInstance.properties.content.replace(/<[^>]*>/g, '').trim()

  if (props.draft && text === '') {
    return true
  }

  return false
})
</script>

<template>
  <div v-if="renderField">
    <span
      v-if="renderEmptyMessage" class="
        flex items-center justify-center text-muted-foreground italic
      "
    >
      Empty
    </span>
    <div v-else v-html="props.elementInstance.properties.content" />
  </div>
</template>
