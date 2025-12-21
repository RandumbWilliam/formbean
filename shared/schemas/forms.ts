import * as z from 'zod'

export const createFormSchema = z.object({
  title: z.string(),
  pages: z.array(
    z.object({
      id: z.string(),
      elementInstances: z.array(z.any()),
      rules: z.any().nullable(),
    }),
  ).min(1),
})
