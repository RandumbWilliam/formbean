<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { MultiLineInstance } from '.'
import { Field as VeeField } from 'vee-validate'
import { evaluateConditions } from '~/form-builder/utils'
import multiLineElement from '.'

const props = withDefaults(
  defineProps<{
    elementInstance: MultiLineInstance
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
</script>

<template>
  <VeeField
    v-if="renderField"
    v-slot="{ field, errors }"
    :name="props.elementInstance.id"
    :rules="multiLineElement.generateValidationSchema(props.elementInstance.validations)"
  >
    <Field :data-invalid="!!errors.length">
      <FieldLabel :for="props.elementInstance.id">
        <span>
          <template v-if="props.elementInstance.properties.label">
            {{ props.elementInstance.properties.label }}
          </template>
          <span v-else-if="props.draft" class="text-muted-foreground italic">
            No Question
          </span>
          <span
            v-if="props.elementInstance.validations.required"
            class="text-destructive"
          >
            *
          </span>
        </span>
      </FieldLabel>
      <Textarea
        :id="props.elementInstance.id"
        v-bind="field"
        :placeholder="props.elementInstance.properties.placeholder"
        :aria-invalid="!!errors.length"
      />
      <FieldError v-if="errors.length" :errors="errors" />
    </Field>
  </VeeField>
</template>
