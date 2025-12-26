import type { MultiLineInstance } from './MultiLine'
import type { SingleChoiceInstance } from './SingleChoice'
import type { SingleLineInstance } from './SingleLine'
import { elementTypes } from './elementTypes'
import multiLineElement from './MultiLine'
import singleChoiceElement from './SingleChoice'
import singleLineElement from './SingleLine'

export const elements = {
  [elementTypes.SINGLE_LINE]: singleLineElement,
  [elementTypes.MULTI_LINE]: multiLineElement,
  [elementTypes.SINGLE_CHOICE]: singleChoiceElement,
}

export const groupElements = [
  {
    group: 'Text Fields',
    elements: [singleLineElement, multiLineElement],
  },
  {
    group: 'Select Fields',
    elements: [singleChoiceElement],
  },
]

export type Elements = (typeof elements)[keyof typeof elements]

export type ElementInstance = SingleLineInstance | MultiLineInstance | SingleChoiceInstance
