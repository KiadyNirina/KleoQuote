// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
    'nuxt-pdfmake',
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

  app: {
    head: {
      title: 'KleoQuote — Générateur de devis Kleonix',
      htmlAttrs: {
        lang: 'fr',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
