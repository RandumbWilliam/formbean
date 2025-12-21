<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ClipboardPlus, Plus } from 'lucide-vue-next'
import { useForm, Field as VeeField } from 'vee-validate'
import { createFormSchema } from '~~/shared/schemas/forms'
import { generateId } from '~/form-builder/utils'

const { data, status } = await useFetch('/api/forms')

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(createFormSchema),
  initialValues: {
    pages: [{
      id: generateId('page'),
      elementInstances: [],
      rules: null,
    }],
  },
})

const openCreateForm = ref(false)

const onSubmit = handleSubmit(async (values) => {
  try {
    const formId = await $fetch('/api/forms', {
      method: 'POST',
      body: values,
    })

    return navigateTo(`/${formId}`)
  }
  catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div>
    <main class="relative h-screen">
      <section v-if="status === 'pending'">
        Loading...
      </section>
      <section v-else-if="status === 'success' && data" class="h-full p-4">
        <div
          v-if="data.length === 0"
          class="
            mx-auto flex h-full flex-col items-center justify-center gap-2
            rounded-lg bg-muted text-muted-foreground
          "
        >
          <ClipboardPlus />
          <p class="text-sm font-medium">
            No Forms Found
          </p>
          <Button type="button" @click.prevent="openCreateForm = true">
            Create Form
          </Button>
        </div>

        <div v-else class="flex flex-col gap-3">
          <NuxtLink
            v-for="form in data"
            :key="form.id"
            :to="`/${form.id}`"
            class="
              flex flex-col justify-between rounded-md border bg-background p-2
            "
          >
            <p class="font-medium">
              {{ form.draftForm.title }}
            </p>
          </NuxtLink>
        </div>

        <Dialog v-model:open="openCreateForm">
          <DialogTrigger as-child>
            <Button size="icon" class="absolute right-4 bottom-4 rounded-full">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Create a new form</DialogTitle>
              <DialogDescription>
                Give your form a name. Click create when you're done.
              </DialogDescription>
            </DialogHeader>
            <form id="create-form" class="w-full space-y-6" @submit="onSubmit">
              <FieldGroup>
                <VeeField v-slot="{ field, errors }" name="title">
                  <Field :data-invalid="!!errors.length">
                    <FieldLabel for="create-form-title">
                      Form title
                    </FieldLabel>
                    <Input
                      id="create-form-title"
                      v-bind="field"
                      autocomplete="off"
                      :aria-invalid="!!errors.length"
                    />
                    <FieldError v-if="errors.length" :errors="errors" />
                  </Field>
                </VeeField>
              </FieldGroup>
            </form>
            <DialogFooter>
              <Button type="submit" form="create-form">
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  </div>
</template>
