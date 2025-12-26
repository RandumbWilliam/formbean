<script setup lang="ts">
import type { Form } from '.'
import type { Elements } from './elements'
import { ArrowDown, ArrowUp, Pencil, Settings, Trash2, X } from 'lucide-vue-next'
import { VueDraggable } from 'vue-draggable-plus'
import { elements, groupElements } from './elements'
import RuleBuilder from './RuleBuilder.vue'
import { generateId } from './utils'

const props = defineProps<{
  form: Form
}>()

const { getPreference, setPreference } = usePreferences()

const form = ref(props.form)
const openPageSwapWarning = ref(false)
const pendingPageSwapIndex = ref<{ index: number, nextIndex: number } | null>(null)
const remindPageSwapWarning = ref(false)

function onDraggableClone(element: Elements) {
  const elementInstance = element.construct()

  return elementInstance
}

function addPage(index: number) {
  form.value.pages.splice(index, 0, {
    id: generateId('page'),
    elementInstances: [],
    rules: null,
  })
}

function deletePage(index: number) {
  form.value.pages.splice(index, 1)
}

function swapPage(index: number, nextIndex: number) {
  const pages = form.value.pages

  const current = pages[index]
  const next = pages[nextIndex]

  if (!current || !next)
    return

  current.rules = null
  next.rules = null

  ;[pages[index], pages[nextIndex]] = [next, current]
}

function confirmPageSwap() {
  if (pendingPageSwapIndex.value) {
    const { index, nextIndex } = pendingPageSwapIndex.value
    swapPage(index, nextIndex)

    if (remindPageSwapWarning.value) {
      setPreference('skip-page-swap-warning', true)
    }
  }
}

function cancelPageSwap() {
  pendingPageSwapIndex.value = null
  remindPageSwapWarning.value = false
}

function movePage(index: number, direction: 'up' | 'down') {
  const nextIndex = direction === 'up' ? index - 1 : index + 1
  const pages = form.value.pages

  const current = pages[index]
  const next = pages[nextIndex]

  if (!current || !next)
    return

  const skipPageSwapWarning = getPreference('skip-page-swap-warning', false)

  if (current.rules || next.rules) {
    if (skipPageSwapWarning) {
      swapPage(index, nextIndex)
    }
    else {
      pendingPageSwapIndex.value = { index, nextIndex }
      openPageSwapWarning.value = true
    }
  }
  else {
    swapPage(index, nextIndex)
  }
}

function deleteElement(pageIndex: number, elementIndex: number) {
  form.value.pages[pageIndex]?.elementInstances.splice(elementIndex, 1)
}

function getConditionFields(pageIndex: number, elementIndex?: number) {
  const fields = form.value.pages.slice(0, pageIndex + 1).map((page, i) => {
    if (i === pageIndex) {
      return {
        ...page,
        elementInstances: elementIndex !== undefined
          ? page.elementInstances.slice(0, elementIndex)
          : [],
      }
    }

    return { ...page }
  })

  return fields.filter(
    (page, i) => !(i === pageIndex && page.elementInstances.length === 0),
  )
}
</script>

<template>
  <div class="min-h-screen bg-muted pt-16">
    <div
      class="fixed flex h-screen w-60 flex-col gap-3 border-r bg-background p-3"
    >
      <div
        v-for="(group, groupIndex) in groupElements"
        :key="groupIndex"
        class="flex flex-col gap-1.5"
      >
        <h3 class="text-sm font-semibold text-muted-foreground">
          {{ group.group }}
        </h3>
        <VueDraggable
          v-model="group.elements"
          :group="{
            name: 'builder',
            pull: 'clone',
            put: false,
          }"
          :clone="onDraggableClone"
          :sort="false"
          class="flex flex-col gap-1"
        >
          <div
            v-for="(element, elementIndex) in group.elements"
            :key="elementIndex"
            class="
              flex w-full cursor-move items-center gap-3 rounded-md p-3
              select-none
              hover:bg-muted
            "
          >
            <component :is="element.elementBtnProps.icon" :size="20" />
            <p class="text-sm">
              {{ element.elementBtnProps.label }}
            </p>
          </div>
        </VueDraggable>
      </div>
    </div>

    <div class="flex w-full justify-center pl-60">
      <div class="flex w-full max-w-3xl flex-col p-6">
        <div
          v-for="(page, pageIndex) in form.pages"
          :key="page.id"
          class="flex w-full flex-col gap-1"
        >
          <div class="flex items-center justify-between text-muted-foreground">
            <p class="text-sm">
              Page {{ pageIndex + 1 }}
              <span v-if="page.rules" class="font-semibold text-blue-500">*</span>
            </p>
            <div class="flex items-center gap-1.5">
              <button
                v-if="form.pages.length > 1 && pageIndex !== 0"
                @click.prevent="movePage(pageIndex, 'up')"
              >
                <ArrowUp :size="18" />
              </button>
              <button
                v-if="form.pages.length > 1 && pageIndex !== form.pages.length - 1"
                @click.prevent="movePage(pageIndex, 'down')"
              >
                <ArrowDown :size="18" />
              </button>
              <Sheet>
                <SheetTrigger as-child>
                  <button type="button">
                    <Settings :size="16" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  class="
                    flex flex-col
                    sm:max-w-1/2
                  "
                >
                  <SheetHeader>
                    <SheetTitle>
                      Page {{ pageIndex + 1 }} Rules
                    </SheetTitle>
                    <SheetDescription>
                      Show page if the rules are met.
                    </SheetDescription>
                  </SheetHeader>

                  <div class="px-4">
                    <RuleBuilder
                      v-model="page.rules"
                      :fields="
                        getConditionFields(pageIndex)
                      "
                    />
                  </div>

                  <SheetFooter>
                    <SheetClose as-child>
                      <Button type="submit">
                        Save changes
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <button
                v-if="pageIndex !== 0"
                type="button"
                @click.prevent="deletePage(pageIndex)"
              >
                <X :size="18" />
              </button>
            </div>
          </div>

          <VueDraggable
            v-model="page.elementInstances"
            group="builder"
            :animation="150"
            ghost-class="ghost"
            class="
              flex min-h-80 w-full flex-col gap-1.5 border bg-background p-1.5
            "
          >
            <div
              v-for="(element, elementIndex) in page.elementInstances"
              :key="element.id"
              :data-element-id="element.id"
              class="
                group/element relative flex items-center gap-3 bg-background p-1
                hover:outline
              "
            >
              <div class="pointer-events-none min-h-9 w-full">
                <component
                  :is="elements[element.type].fieldComponent"
                  :element-instance="element"
                  :draft="true"
                />
              </div>
              <div
                class="
                  absolute top-1 right-1 hidden gap-1
                  group-hover/element:flex
                "
              >
                <Sheet>
                  <SheetTrigger as-child>
                    <Button type="button" size="icon">
                      <Pencil />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    class="
                      flex flex-col
                      sm:max-w-1/2
                    "
                  >
                    <SheetHeader>
                      <SheetTitle>
                        Edit
                        {{ elements[element.type].elementBtnProps.label }}
                      </SheetTitle>
                      <SheetDescription>
                        Make changes to the field or apply rules to it.
                      </SheetDescription>
                    </SheetHeader>

                    <Tabs default-value="properties" class="min-h-0 flex-1">
                      <div class="px-4">
                        <TabsList class="grid w-full grid-cols-2">
                          <TabsTrigger value="properties">
                            Properties
                          </TabsTrigger>
                          <TabsTrigger value="rules">
                            Rules
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <div class="flex-1 overflow-y-auto">
                        <TabsContent value="properties" class="px-4">
                          <component
                            :is="elements[element.type].propertiesComponent"
                            :element-instance="element"
                          />
                        </TabsContent>
                        <TabsContent value="rules">
                          <RuleBuilder
                            v-model="element.rules"
                            :fields="
                              getConditionFields(pageIndex, elementIndex)
                            "
                          />
                        </TabsContent>
                      </div>
                    </Tabs>

                    <SheetFooter>
                      <SheetClose as-child>
                        <Button type="submit">
                          Save changes
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  @click.prevent="deleteElement(pageIndex, elementIndex)"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </VueDraggable>

          <div class="my-6 flex items-center gap-3">
            <Separator class="flex-1" />
            <Button
              type="button"
              variant="outline"
              @click.prevent="addPage(pageIndex + 1)"
            >
              Add Page
            </Button>
            <Separator class="flex-1" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:open="openPageSwapWarning">
    <DialogContent class="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Swapping Pages Will Remove Rules</DialogTitle>
        <DialogDescription>
          Swapping the pages will remove existing rules on both pages.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-2">
        <p>
          The pages you are swapping contain conditional logic. Because rules depend on the order of questions, they cannot be preserved after a swap. All rules on the affected pages will be removed.
        </p>

        <div class="flex items-center space-x-2">
          <Checkbox id="skip-warning" v-model="remindPageSwapWarning" />
          <label
            for="skip-warning"
            class="
              text-sm leading-none font-medium
              peer-disabled:cursor-not-allowed peer-disabled:opacity-70
            "
          >
            Don't remind me again
          </label>
        </div>
      </div>

      <DialogFooter>
        <DialogClose>
          <Button variant="outline" @click.prevent="cancelPageSwap">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose>
          <Button @click.prevent="confirmPageSwap">
            Continue
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

  <style scoped>
  .ghost {
    background-color: var(--muted);
    outline: 1px dashed var(--border);
    border-radius: 0;
  }

  .ghost * {
    visibility: hidden;
  }
  </style>
