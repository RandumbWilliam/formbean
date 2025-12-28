<script setup lang="ts">
import type { Condition } from '.'
import type { Form } from '..'
import type { ElementInstance } from '../elements'
import { elements } from '../elements'

const props = defineProps<{
  fields: Form['pages']
  condition: Condition
}>()

const condition = ref(props.condition)

const element = computed(() => {
  if (condition.value.elementInstance) {
    return elements[condition.value.elementInstance.type]
  }

  return null
})

const operandValueField = computed(() => {
  if (!element.value || !condition.value.operator) {
    return null
  }

  const { conditionFns } = element.value
  const operator = condition.value.operator

  return conditionFns[operator]?.operandValueComponent ?? null
})

function handleElementInstance(el: ElementInstance) {
  condition.value.elementInstance = el
  condition.value.operator = null
  condition.value.operandValue = null
}
</script>

<template>
  <div class="w-full rounded-md border bg-background">
    <Select :model-value="condition.elementInstance?.id">
      <SelectTrigger class="w-full border-none shadow-none">
        <SelectValue placeholder="Select a question" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup v-for="(page, index) in props.fields" :key="page.id">
          <SelectLabel>Page {{ index + 1 }}</SelectLabel>
          <SelectItem
            v-for="el in page.elementInstances"
            :key="el.id"
            :value="el.id"
            @select="handleElementInstance(el)"
          >
            <div class="flex flex-col gap-1">
              <span v-if="el.properties.label">
                {{ el.properties.label }}
              </span>
              <span v-else class="text-muted-foreground italic">
                No Question
              </span>
              <span class="text-xs text-muted-foreground">
                {{ el.id }}
              </span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <div class="flex border-t">
      <div class="border-r">
        <Select
          v-model="condition.operator"
          :disabled="condition.elementInstance === null"
          @update:model-value="() => (condition.operandValue = null)"
        >
          <SelectTrigger class="w-[180px] border-none shadow-none">
            <SelectValue placeholder="Select an operation" />
          </SelectTrigger>
          <SelectContent v-if="element">
            <SelectGroup>
              <SelectItem
                v-for="operation in Object.keys(element.conditionFns)"
                :key="operation"
                :value="operation"
              >
                {{ operation }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <template v-if="operandValueField && condition.elementInstance">
        <component
          :is="operandValueField"
          v-model="condition.operandValue"
          :element-instance="condition.elementInstance as any"
        />
      </template>
      <Input
        v-else
        id="placeholder-operand-value-field"
        :disabled="true"
        class="w-full border-none shadow-none"
        placeholder="Expected value"
      />
    </div>
  </div>
</template>
