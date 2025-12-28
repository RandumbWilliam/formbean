import type { MultiChoiceInstance } from './MultiChoice'
import type { MultiLineInstance } from './MultiLine'
import type { SingleChoiceInstance } from './SingleChoice'
import type { SingleLineInstance } from './SingleLine'
import { elementTypes } from './elementTypes'
import multiChoiceElement from './MultiChoice'
import multiLineElement from './MultiLine'
import singleChoiceElement from './SingleChoice'
import singleLineElement from './SingleLine'

export const elements = {
  [elementTypes.SINGLE_LINE]: singleLineElement,
  [elementTypes.MULTI_LINE]: multiLineElement,
  [elementTypes.SINGLE_CHOICE]: singleChoiceElement,
  [elementTypes.MULTI_CHOICE]: multiChoiceElement,
}

export const groupElements = [
  {
    group: 'Text Fields',
    elements: [singleLineElement, multiLineElement],
  },
  {
    group: 'Select Fields',
    elements: [singleChoiceElement, multiChoiceElement],
  },
]

export type Elements = (typeof elements)[keyof typeof elements]

export type ElementInstance = SingleLineInstance
  | MultiLineInstance
  | SingleChoiceInstance
  | MultiChoiceInstance
