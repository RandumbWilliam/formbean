import type { FileUploadInstance } from './FileUpload'
import type { MultiChoiceInstance } from './MultiChoice'
import type { MultiLineInstance } from './MultiLine'
import type { SingleChoiceInstance } from './SingleChoice'
import type { SingleLineInstance } from './SingleLine'
import type { TextInstance } from './Text'
import { elementTypes } from './elementTypes'
import fileUploadElement from './FileUpload'
import multiChoiceElement from './MultiChoice'
import multiLineElement from './MultiLine'
import singleChoiceElement from './SingleChoice'
import singleLineElement from './SingleLine'
import textElement from './Text'

export const elements = {
  [elementTypes.SINGLE_LINE]: singleLineElement,
  [elementTypes.MULTI_LINE]: multiLineElement,
  [elementTypes.SINGLE_CHOICE]: singleChoiceElement,
  [elementTypes.MULTI_CHOICE]: multiChoiceElement,
  [elementTypes.FILE_UPLOAD]: fileUploadElement,
  [elementTypes.TEXT]: textElement,
}

export const groupElements = [
  {
    group: 'Content',
    elements: [textElement],
  },
  {
    group: 'Text Fields',
    elements: [singleLineElement, multiLineElement],
  },
  {
    group: 'Select Fields',
    elements: [singleChoiceElement, multiChoiceElement],
  },
  {
    group: 'Other',
    elements: [fileUploadElement],
  },
]

export type Elements = (typeof elements)[keyof typeof elements]

export type ElementInstance = SingleLineInstance
  | MultiLineInstance
  | SingleChoiceInstance
  | MultiChoiceInstance
  | FileUploadInstance
  | TextInstance
