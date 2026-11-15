// app/stores/quote.ts
import { defineStore } from 'pinia'
import type { Quote } from '#shared/types/quote'
import { createEmptyQuote } from '#shared/constants/defaults'
import { useCompanyStore } from '~/stores/company'

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    current: createEmptyQuote() as Quote,
  }),

  actions: {
    reset() {
      const company = useCompanyStore()
      const quote = createEmptyQuote()
      quote.currency = company.settings.defaultCurrency
      this.current = quote
    },

    replace(quote: Quote) {
      this.current = quote
    },
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})