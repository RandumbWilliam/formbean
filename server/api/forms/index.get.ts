import { db } from '~~/server/db'

export default defineEventHandler(async () => {
  const forms = await db.query.formsTable.findMany()

  return forms
})
