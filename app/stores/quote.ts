// app/stores/quote.ts
import { defineStore } from 'pinia'
import type { Quote, DocumentType } from '#shared/types/quote'
import { createEmptyQuote } from '#shared/constants/defaults'
import { useCompanyStore } from '~/stores/company'

export const useQuoteStore = defineStore('quote', {
  state: () => {
    const q = createEmptyQuote()
    if (!q.signature) q.signature = { show: true }
    return { current: q }
  },

  actions: {
    reset() {
      const company = useCompanyStore()
      const quote = createEmptyQuote('quote' as const)
      quote.currency = company.settings.defaultCurrency
      this.current = quote
    },

    newDocument(type: DocumentType) {
      const company = useCompanyStore()
      const doc = createEmptyQuote(type)
      doc.currency = company.settings.defaultCurrency
      this.current = doc
    },

    replace(doc: Quote) {
      if (!doc.signature) doc.signature = { show: true }
      this.current = doc
    },
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})