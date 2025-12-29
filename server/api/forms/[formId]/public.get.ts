import { and, eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '~~/server/db'
import { formsTable } from '~~/server/db/schema'

const paramsSchema = z.object({
  formId: z.uuidv4(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, paramsSchema.parse)

  const form = await db.query.formsTable.findFirst({
    columns: {
      id: true,
      publishedForm: true,
    },
    where: and(
      eq(formsTable.id, params.formId),
      eq(formsTable.published, true),
    ),
  })

  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Form does not exit.',
    })
  }

  return form
})
