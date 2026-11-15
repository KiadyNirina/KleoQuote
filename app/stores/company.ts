// app/stores/company.ts
import { defineStore } from 'pinia'
import type { CompanySettings } from '#shared/types/quote'
import { createDefaultCompany } from '#shared/constants/defaults'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    settings: createDefaultCompany() as CompanySettings,
  }),

  actions: {
    update(settings: Partial<CompanySettings>) {
      this.settings = { ...this.settings, ...settings }
    },

    reset() {
      this.settings = createDefaultCompany()
    },
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})