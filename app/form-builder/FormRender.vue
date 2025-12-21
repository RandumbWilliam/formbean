<script setup lang="ts">
import type { Form } from '.'
import { useForm } from 'vee-validate'
import { elements } from './elements'
import { evaluateConditions } from './utils'

const props = defineProps<{
  form: Form
}>()

const pageIdx = ref(0)

const { values, handleSubmit } = useForm({
  // vee-validate will be aware of computed schema changes
  // validationSchema: currentSchema,
  // turn this on so each step values won't get removed when you move back or to the next step
  keepValuesOnUnmount: true,
})

const visiblePages = computed(() => {
  return props.form.pages.filter((page) => {
    if (!page.rules)
      return true
    return evaluateConditions(page.rules, values)
  })
})

const isLastStep = computed(() => {
  return pageIdx.value === visiblePages.value.length - 1
})

// If the `previous` button should appear
const hasPrevious = computed(() => {
  return pageIdx.value > 0
})

// We are using the "submit" handler to progress to next steps
// and to submit the form if its the last step
const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    pageIdx.value++
    return
  }

  // Let the parent know the form was filled across all steps
  console.log(values)
})

function goToPrev() {
  if (pageIdx.value === 0) {
    return
  }

  pageIdx.value--
}

watch(visiblePages, (vp) => {
  if (vp.length === 0) {
    pageIdx.value = 0
    return
  }
  pageIdx.value = Math.min(pageIdx.value, vp.length - 1)
}, {
  immediate: true,
})
</script>

<template>
  <div class="min-h-screen bg-muted pt-16">
    <div class="flex w-full justify-center p-6">
      <form
        class="
          flex min-h-80 w-full max-w-3xl flex-col justify-between bg-background
          p-1.5
        "
        @submit="onSubmit"
      >
        <template v-for="(page, index) in visiblePages" :key="page.id">
          <FieldGroup v-if="pageIdx === index">
            <component
              :is="elements[elementInstance.type].fieldComponent"
              v-for="elementInstance in page.elementInstances"
              :key="elementInstance.id"
              :element-instance="elementInstance"
              :form-values="values"
            />
          </FieldGroup>
        </template>

        <div class="flex justify-center">
          <Button
            v-if="hasPrevious"
            type="button"
            variant="outline"
            @click="goToPrev"
          >
            Previous
          </Button>
          <Button type="submit">
            {{ isLastStep ? 'Submit' : 'Next' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
