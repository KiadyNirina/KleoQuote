// app/stores/quote.ts
import { defineStore } from 'pinia'
import type { Quote } from '#shared/types/quote'
import { createEmptyQuote } from '#shared/constants/defaults'

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    current: createEmptyQuote() as Quote,
  }),

  actions: {
    reset() {
      this.current = createEmptyQuote()
    },

    replace(quote: Quote) {
      this.current = quote
    },
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})