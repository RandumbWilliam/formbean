import type { Form } from '~/form-builder'
import { relations } from 'drizzle-orm'
import { boolean, json, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { submissionsTable } from './submissions'

export const formsTable = pgTable('forms', {
  id: uuid().defaultRandom().primaryKey(),
  draftForm: json().$type<Form>().notNull(),
  publishedForm: json().$type<Form>().notNull(),
  published: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().$onUpdateFn(() => new Date()),
  publishedAt: timestamp(),
})

export const formsRelations = relations(formsTable, ({ many }) => ({
  submissions: many(submissionsTable),
}))
