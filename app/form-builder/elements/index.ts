import type { SingleLineInstance } from './SingleLine'

import { elementTypes } from './elementTypes'

import { singleLineElement } from './SingleLine'

export const elements = {
  [elementTypes.SINGLE_LINE]: singleLineElement,
}

export const groupElements = [
  {
    group: 'Text Fields',
    elements: [singleLineElement],
  },
]

export type Elements = (typeof elements)[keyof typeof elements]

export type ElementInstance = SingleLineInstance
