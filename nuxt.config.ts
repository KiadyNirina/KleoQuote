// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
  ],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  pinia: {
    storesDirs: ['app/stores/**'],
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  compatibilityDate: '2025-07-01',
})
