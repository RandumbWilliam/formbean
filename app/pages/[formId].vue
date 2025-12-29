<script setup lang="ts">
import type { Form } from '~/form-builder'
import { FormRender } from '~/form-builder'

const route = useRoute()

const formId = computed(() => route.params.formId)

const { data, status, error } = await useFetch<{
  id: string
  publishedForm: Form
}>(`/api/forms/${formId.value}/public`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  })
}

const submitted = ref(false)

async function onSubmit(values: any) {
  try {
    await $fetch(`/api/submissions/${formId.value}`, {
      method: 'POST',
      query: {
        draft: true,
      },
      body: values,
    })
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section v-if="status === 'pending'">
    Loading...
  </section>
  <section v-else-if="status === 'success' && data">
    <FormRender :form="data.publishedForm" :submitted @submit="onSubmit" />
  </section>
</template>
