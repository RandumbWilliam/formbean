<script setup lang="ts">
import type { ElementInstance } from '~/form-builder/elements'
import type { elementTypes } from '~/form-builder/elements/elementTypes'

const props = defineProps<{
  elementInstance: Extract<
    ElementInstance,
    { type: typeof elementTypes.SINGLE_CHOICE | typeof elementTypes.MULTI_CHOICE }
  >
}>()
const modelValue = defineModel<string>()
</script>

<template>
  <Select :id="`${props.elementInstance.id}-operand-value-field-input`" v-model="modelValue">
    <SelectTrigger class="w-full border-none shadow-none">
      <SelectValue placeholder="Expected value" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="option in elementInstance.properties.options"
          :key="option.id"
          :value="option.id"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
