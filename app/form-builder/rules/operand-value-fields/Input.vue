<script setup lang="ts">
import type { ElementInstance } from '~/form-builder/elements'

const props = defineProps<{
  elementInstance: ElementInstance
}>()
const model = defineModel<string>()
</script>

<template>
  <Input
    :id="`${props.elementInstance.id}-operand-value-field-input`"
    v-model="model"
    class="w-full border-none shadow-none"
    placeholder="Expected value"
  />
</template>
