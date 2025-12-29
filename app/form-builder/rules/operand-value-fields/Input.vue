<script setup lang="ts">
import type { ElementInstance } from '~/form-builder/elements'
import type { elementTypes } from '~/form-builder/elements/elementTypes'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  elementInstance: Extract<
    ElementInstance,
    { type: typeof elementTypes.SINGLE_CHOICE | typeof elementTypes.MULTI_CHOICE }
  >
}>()
const modelValue = defineModel<string>()
</script>

<template>
  <Input
    :id="`${props.elementInstance.id}-operand-value-field-input`"
    v-model="modelValue"
    class="w-full border-none shadow-none"
    placeholder="Expected value"
  />
</template>
