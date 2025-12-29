<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { UploadedFile } from '~~/shared/types/files.type'
import type { FileUploadInstance } from '.'
import { useField, Field as VeeField } from 'vee-validate'
import { evaluateConditions } from '~/form-builder/utils'
import fileUploadElement from '.'

const props = withDefaults(
  defineProps<{
    elementInstance: FileUploadInstance
    formValues?: GenericObject | null
    draft?: boolean
  }>(),
  {
    formValues: null,
    draft: false,
  },
)

const { value, setValue } = useField<UploadedFile[]>(props.elementInstance.id)

// const uploadedFiles = ref<UploadedFile[]>([])

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

async function handleUploadFiles(event: Event) {
  try {
    const input = event.target as HTMLInputElement
    const files = Array.from(input?.files || [])

    const formData = new FormData()
    for (const file of files) {
      formData.append('file', file)
    }

    const uploadedFilesData = await $fetch('/api/s3', {
      method: 'POST',
      body: formData,
    })

    setValue(uploadedFilesData)

    // uploadedFiles.value = uploadedFiles.value.concat(uploadedFilesData)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <VeeField
    v-if="renderField"
    v-slot="{ errors }"
    :name="props.elementInstance.id"
    :rules="fileUploadElement.generateValidationSchema(props.elementInstance.validations)"
    :value="value ?? []"
  >
    <Field :data-invalid="!!errors.length">
      <FieldLabel :for="props.elementInstance.id">
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
      <Button as-child>
        <label :for="`${props.elementInstance.id}-file-input`">
          Upload
        </label>
      </Button>
      <input
        :id="`${props.elementInstance.id}-file-input`"
        type="file"
        :multiple="props.elementInstance.properties.maxFiles > 1"
        :accept="props.elementInstance.properties.allowedFileTypes.join(',')"
        hidden
        @change="handleUploadFiles"
      >
      <FieldError v-if="errors.length" :errors="errors" />
    </Field>
    <div v-for="uploadedFile in value" :key="uploadedFile.key">
      <img :src="uploadedFile.url">
      <pre>{{ uploadedFile }}</pre>
    </div>
  </VeeField>
</template>
