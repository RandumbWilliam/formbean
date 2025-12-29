import crypto from 'node:crypto'
import * as z from 'zod'
import { db } from '~~/server/db'
import { submissionsTable } from '~~/server/db/schema'

const paramsSchema = z.object({
  formId: z.uuidv4(),
})

const querySchema = z.object({
  draft: z.stringbool().optional(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, paramsSchema.parse)
  const query = await getValidatedQuery(event, querySchema.parse)
  const body = await readBody(event)
  const ipAddress = getRequestIP(event, { xForwardedFor: true })
  const userAgent = getRequestHeader(event, 'user-agent')

  const fingerprint = crypto.createHash('sha256')
    .update(`${ipAddress}|${userAgent}`)
    .digest('hex')

  await db.insert(submissionsTable).values({
    formId: params.formId,
    fingerprint,
    ipAddress,
    userAgent,
    draft: query.draft,
    data: body,
  })
})
