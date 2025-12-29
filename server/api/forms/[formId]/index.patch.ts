import { eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '~~/server/db'
import { formsTable } from '~~/server/db/schema'
import { updateFormSchema } from '~~/shared/schemas/forms'

const paramsSchema = z.object({
  formId: z.uuidv4(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, paramsSchema.parse)
  const body = await readValidatedBody(event, updateFormSchema.parse)

  await db.update(formsTable).set({
    published: body.published,
    draftForm: body.form,
    publishedForm: body.published ? body.form : undefined,
  }).where(
    eq(formsTable.id, params.formId),
  )
})
