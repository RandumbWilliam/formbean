import { db } from '~~/server/db'
import { formsTable } from '~~/server/db/schema'
import { createFormSchema } from '~~/shared/schemas/forms'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, createFormSchema.parse)

  const [form] = await db.insert(formsTable).values({
    draftForm: body,
  }).returning()

  return form.id
})
