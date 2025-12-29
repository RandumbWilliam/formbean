<script setup lang="ts">
import type { TextInstance } from '.'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import {
  EditorContent,
  useEditor,
} from '@tiptap/vue-3'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Italic,
  LetterText,
  List,
  ListOrdered,
  Underline,
} from 'lucide-vue-next'

const props = defineProps<{
  elementInstance: TextInstance
}>()

const elementInstance = ref(props.elementInstance)

const editor = useEditor({
  content: elementInstance.value.properties.content,
  onUpdate: ({ editor }) => {
    elementInstance.value.properties.content = editor.getHTML()
  },
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    TextAlign,
  ],
  editorProps: {
    attributes: {
      class: 'p-1 min-h-60',
    },
  },
})
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <Label for="text-label">Text Editor</Label>
      <div class="flex gap-3">
        <div>
          <Toggle
            :model-value="editor?.isActive('paragraph')"
            size="sm"
            aria-label="Set paragraph"
            @update:model-value="editor?.chain().focus().setParagraph().run()"
          >
            <LetterText class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive('heading', { level: 1 })"
            size="sm"
            aria-label="Set heading 1"
            @update:model-value="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <Heading1 class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive('heading', { level: 2 })"
            size="sm"
            aria-label="Set heading 2"
            @update:model-value="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <Heading1 class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive('heading', { level: 3 })"
            size="sm"
            aria-label="Set heading 3"
            @update:model-value="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <Heading1 class="h-4 w-4" />
          </Toggle>
        </div>

        <div>
          <Toggle
            :model-value="editor?.isActive('bulletList')"
            size="sm"
            aria-label="Toggle bold"
            @update:model-value="editor?.chain().focus().toggleBulletList().run()"
          >
            <List class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive('orderedList')"
            size="sm"
            aria-label="Toggle italic"
            @update:model-value="editor?.chain().focus().toggleOrderedList().run()"
          >
            <ListOrdered class="h-4 w-4" />
          </Toggle>
        </div>

        <div>
          <Toggle
            :model-value="editor?.isActive('bold')"
            size="sm"
            aria-label="Toggle bold"
            @update:model-value="editor?.chain().focus().toggleBold().run()"
          >
            <Bold class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive('italic')"
            size="sm"
            aria-label="Toggle italic"
            @update:model-value="editor?.chain().focus().toggleItalic().run()"
          >
            <Italic class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive('underline')"
            size="sm"
            aria-label="Toggle underline"
            @update:model-value="editor?.chain().focus().toggleUnderline().run()"
          >
            <Underline class="h-4 w-4" />
          </Toggle>
        </div>

        <div>
          <Toggle
            :model-value="editor?.isActive({ textAlign: 'left' })"
            size="sm"
            aria-label="Align left"
            @update:model-value="editor?.chain().focus().setTextAlign('left').run()"
          >
            <AlignLeft class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive({ textAlign: 'center' })"
            size="sm"
            aria-label="Align center"
            @update:model-value="editor?.chain().focus().setTextAlign('center').run()"
          >
            <AlignCenter class="h-4 w-4" />
          </Toggle>
          <Toggle
            :model-value="editor?.isActive({ textAlign: 'right' })"
            size="sm"
            aria-label="Align right"
            @update:model-value="editor?.chain().focus().setTextAlign('right').run()"
          >
            <AlignRight class="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      <div class="border">
        <EditorContent :editor="editor" />
      </div>
    </div>
  </div>
</template>
