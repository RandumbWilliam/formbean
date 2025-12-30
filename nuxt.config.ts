import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', 'shadcn-nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/tailwind.css'],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  fonts: {
    families: [
      {
        name: 'Poppins',
        provider: 'google',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },
  nitro: {
    storage: {
      // TODO: s3 variables
      s3: {
        driver: 's3',
        bucket: 'formbean',
        region: 'us-east-2',
        accessKeyId: 'mock_access_key',
        secretAccessKey: 'mock_secret_key',
        endpoint: 'http://localhost:4566',
        forcePathStyle: true,
      },
    },
  },
})
