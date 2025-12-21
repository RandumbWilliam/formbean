import type { Form } from '~/form-builder'
import { json, pgTable, uuid } from 'drizzle-orm/pg-core'

export const formsTable = pgTable('forms', {
  id: uuid().defaultRandom().primaryKey(),
  draftForm: json().$type<Form>().notNull(),
})
