import { relations } from 'drizzle-orm'
import { boolean, inet, json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { formsTable } from './forms'

export const submissionsTable = pgTable('submissions', {
  id: uuid().defaultRandom().primaryKey(),
  formId: uuid().notNull().references(() => formsTable.id),
  fingerprint: text(),
  ipAddress: inet(),
  userAgent: text(),
  draft: boolean().notNull().default(false),
  data: json(),
  createdAt: timestamp().notNull().defaultNow(),
})

export const submissionsRelations = relations(submissionsTable, ({ one }) => ({
  form: one(formsTable, {
    fields: [submissionsTable.formId],
    references: [formsTable.id],
  }),
}))
