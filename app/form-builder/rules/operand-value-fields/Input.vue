<script setup lang="ts">
import type { ElementInstance } from '~/form-builder/elements'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  elementInstance: Extract<
    ElementInstance,
    { type: 'single-line' | 'multi-line' }
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
