<script setup lang="ts">
import type { FileUploadInstance } from '.'

const props = defineProps<{
  elementInstance: FileUploadInstance
}>()

const elementInstance = ref(props.elementInstance)
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
  </div>
</template>
