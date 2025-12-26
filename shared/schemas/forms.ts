import * as z from 'zod'

// TODO: zod type element instances
// TODO: zod type rules
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
