import antfu from '@antfu/eslint-config'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import drizzle from 'eslint-plugin-drizzle'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    vue: true,
    plugins: {
      'better-tailwindcss': betterTailwindcss,
      'drizzle': drizzle,
    },
    rules: {
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error',
      'no-console': [
        'warn',
        {
          allow: [
            'warn',
            'error',
          ],
        },
      ],
      ...betterTailwindcss.configs['recommended-warn'].rules,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/assets/css/tailwind.css',
      },
    },
  }),
)
