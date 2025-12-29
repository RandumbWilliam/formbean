import type { UploadedFile } from '~~/shared/types/files.type'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No files uploaded',
    })
  }

  const storage = useStorage('s3')

  const results: UploadedFile[] = []

  for (const file of formData) {
    const ext = file.filename?.split('.').pop()
    const key = `${crypto.randomUUID()}.${ext}`

    await storage.setItemRaw(
      key,
      file.data,
      {
        filename: file.filename,
        contentType: file.type,
      },
    )

    // TODO: s3 variables
    results.push({
      key,
      filename: file.filename,
      size: file.data.length,
      contentType: file.type,
      url: `http://localhost:4566/formbean/${key}`,
    })
  }

  return results
})
