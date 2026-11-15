// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  pinia: {
    storesDirs: ['app/stores/**'],
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  compatibilityDate: '2025-07-01',
})
