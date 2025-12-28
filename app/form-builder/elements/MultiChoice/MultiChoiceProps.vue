<script setup lang="ts">
import type { MultiChoiceInstance } from '.'
import { GripVertical, X } from 'lucide-vue-next'
import { VueDraggable } from 'vue-draggable-plus'
import { generateId } from '~/form-builder/utils'

const props = defineProps<{
  elementInstance: MultiChoiceInstance
}>()

const elementInstance = ref(props.elementInstance)

const inputOptionRefs = useTemplateRef('input-option')

function addOption(index: number) {
  elementInstance.value.properties.options.splice(index + 1, 0, {
    id: generateId('single-choice-option'),
    label: '',
  })

  nextTick(() => {
    inputOptionRefs.value?.[index + 1]?.$el.focus()
  })
}

function deleteOption(index: number) {
  elementInstance.value.properties.options.splice(index, 1)
}
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <Label for="single-line-label">Question</Label>
      <Textarea
        id="single-line-label"
        v-model="elementInstance.properties.label"
        type="text"
        placeholder="Ask your question..."
        class="h-20 resize-none"
      />
    </div>

    <div class="space-y-2">
      <Label for="single-line-label">Description</Label>
      <Textarea
        id="single-line-label"
        v-model="elementInstance.properties.description"
        type="text"
        placeholder="Description"
        class="h-20 resize-none"
      />
    </div>

    <div class="flex items-center space-x-2">
      <Checkbox
        id="single-line-required"
        v-model="elementInstance.validations.required"
      />
      <Label for="single-line-required">Required</Label>
    </div>

    <div class="space-y-2">
      <Label for="single-line-placeholder">Options</Label>
      <VueDraggable
        v-model="elementInstance.properties.options"
        :animation="150"
        :group="`${elementInstance.id}_options`"
        class="flex flex-col gap-3"
        handle=".drag-handle"
      >
        <div
          v-for="(option, index) in elementInstance.properties.options"
          :key="option.id"
          class="relative flex items-center gap-2"
        >
          <div class="drag-handle cursor-move">
            <GripVertical :size="18" />
          </div>
          <Input
            ref="input-option"
            v-model="option.label"
            @keyup.enter="addOption(index)"
          />
          <button
            type="button"
            class="absolute top-0 right-2 h-full"
            @click.prevent="deleteOption(index)"
          >
            <X :size="18" class="text-muted-foreground" />
          </button>
        </div>
      </VueDraggable>
      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="mt-2 text-sm font-medium"
          @click="addOption(elementInstance.properties.options.length - 1)"
        >
          Add Option
        </button>
      </div>
    </div>
  </div>
</template>
