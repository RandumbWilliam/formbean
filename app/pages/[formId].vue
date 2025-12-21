<script setup lang="ts">
import type { Form } from '~/form-builder'
import { X } from 'lucide-vue-next'
import { FormBuilder, FormRender } from '~/form-builder'

const route = useRoute()

const formId = computed(() => route.params.formId)

const { data, status, error } = await useFetch<{
  id: string
  draftForm: Form
}>(`/api/forms/${formId.value}`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  })
}

const preview = ref(false)

function togglePreview() {
  preview.value = !preview.value
}

async function onSave() {
  try {
    if (data.value) {
      await $fetch(`/api/forms/${formId.value}`, {
        method: 'PATCH',
        body: data.value.draftForm,
      })

      // eslint-disable-next-line no-alert
      alert('Saved')
    }
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section v-if="status === 'pending'">
    Loading...
  </section>
  <section v-else-if="status === 'success' && data">
    <header
      class="
        fixed z-10 flex h-16 w-full items-center justify-between border-b
        bg-background px-4
      "
    >
      <template v-if="preview">
        <div>
          <p>{{ data.draftForm.title }}</p>
          <p class="text-sm text-muted-foreground">
            Preview
          </p>
        </div>
        <Button type="button" size="icon" @click.prevent="togglePreview">
          <X />
        </Button>
      </template>
      <template v-else>
        <div class="flex items-center gap-3">
          <p>{{ data.draftForm.title }}</p>
        </div>
        <div class="flex gap-3">
          <Button variant="outline" @click.prevent="togglePreview">
            Preview
          </Button>
          <Button type="button" variant="outline" @click.prevent="onSave">
            Save
          </Button>
        </div>
      </template>
    </header>

    <FormRender v-if="preview" :form="data.draftForm" />
    <FormBuilder :form="data.draftForm" />

    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" class="fixed right-2 bottom-2">
          Dev
        </Button>
      </PopoverTrigger>
      <PopoverContent class="h-[800px] w-[800px] overflow-auto" align="end">
        <pre class="text-xs">{{ data.draftForm }}</pre>
      </PopoverContent>
    </Popover>
  </section>
</template>
