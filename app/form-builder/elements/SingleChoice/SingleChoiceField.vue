<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { SingleChoiceInstance } from '.'
import { Field as VeeField } from 'vee-validate'
import { evaluateConditions } from '~/form-builder/utils'
import singleChoiceElement from '.'

const props = withDefaults(
  defineProps<{
    elementInstance: SingleChoiceInstance
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
    :rules="singleChoiceElement.generateValidationSchema(props.elementInstance.validations)"
  >
    <FieldSet>
      <FieldLabel>
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
      <FieldDescription v-if="props.elementInstance.properties.description">
        {{ props.elementInstance.properties.description }}
      </FieldDescription>
      <RadioGroup
        :model-value="field.value"
        @update:model-value="field.onChange"
      >
        <div
          v-for="option in props.elementInstance.properties.options"
          :key="option.id"
          class="flex items-center space-x-2"
        >
          <RadioGroupItem :id="`${option.id}`" :value="option.id" />
          <Label :for="`${option.id}`">{{ option.label }}</Label>
        </div>
      </RadioGroup>
      <FieldError v-if="errors.length" :errors="errors" />
    </FieldSet>
  </VeeField>
</template>
