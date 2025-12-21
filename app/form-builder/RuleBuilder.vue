<script setup lang="ts">
import type { Form } from '.'
import { defaultConditionGroup } from './rules'
import Group from './rules/Group.vue'

const props = defineProps<{
  fields: Form['pages']
}>()
const modelValue = defineModel<any>()

const noFields = computed(() => {
  return props.fields.flatMap(page => page.elementInstances).length === 0
})

function initializeLogic() {
  modelValue.value = defaultConditionGroup()
}
</script>

<template>
  <div
    v-if="noFields"
    class="
      flex h-20 w-full items-center justify-center rounded-md bg-muted
      text-muted-foreground
    "
  >
    No previous fields
  </div>
  <template v-else>
    <Group
      v-if="modelValue"
      v-model="modelValue"
      :fields="props.fields"
      :level="0"
      @delete="modelValue = null"
    />
    <button
      v-else
      class="
        flex h-12 w-full cursor-pointer items-center justify-center rounded-md
        border bg-muted text-muted-foreground
      "
      @click.prevent="initializeLogic"
    >
      Add Rules
    </button>
  </template>
</template>
