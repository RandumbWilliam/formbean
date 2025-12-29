import { eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '~~/server/db'
import { formsTable } from '~~/server/db/schema'

const paramsSchema = z.object({
  formId: z.uuidv4(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, paramsSchema.parse)

  const form = await db.query.formsTable.findFirst({
    where: eq(formsTable.id, params.formId),
  })

  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Form does not exit.',
    })
  }

  return form
})
