<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { MultiChoiceInstance } from '.'
import { Field as VeeField } from 'vee-validate'
import { evaluateConditions } from '~/form-builder/utils'
import multiChoiceElement from '.'

const props = withDefaults(
  defineProps<{
    elementInstance: MultiChoiceInstance
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
    :rules="multiChoiceElement.generateValidationSchema(props.elementInstance.validations)"
  >
    <FieldSet :data-invalid="!!errors.length">
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
      <FieldGroup data-slot="checkbox-group">
        <Field
          v-for="option in props.elementInstance.properties.options"
          :key="option.id"
          orientation="horizontal"
          :data-invalid="!!errors.length"
        >
          <Checkbox
            :id="`${option.id}`"
            :name="field.name"
            :aria-invalid="!!errors.length"
            :model-value="field.value?.includes(option.id)"
            @update:model-value="
              (checked: boolean | 'indeterminate') => {
                const newValue = checked
                  ? [...(field.value || []), option.id]
                  : (field.value || []).filter(
                    (value: string) => value !== option.id,
                  );
                field.onChange(newValue);
              }
            "
          />
          <FieldLabel
            :for="`${option.id}`"
            class="font-normal"
          >
            {{ option.label }}
          </FieldLabel>
        </Field>
      </FieldGroup>
      <FieldError v-if="errors.length" :errors="errors" />
    </FieldSet>
  </VeeField>
</template>
