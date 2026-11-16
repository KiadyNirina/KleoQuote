// app/stores/history.ts
import { defineStore } from 'pinia'
import type { Quote } from '#shared/types/quote'

export interface SavedQuote {
  id: string
  number: string
  clientCompany: string
  clientContact: string
  title: string
  currency: string
  total: number
  savedAt: string
  quote: Quote
}

export const useHistoryStore = defineStore('history', {
  state: () => ({
    entries: [] as SavedQuote[],
  }),

  actions: {
    save(quote: Quote, total: number) {
      const entry: SavedQuote = {
        id: quote.id,
        number: quote.number || 'Sans numéro',
        clientCompany: quote.client.company || '—',
        clientContact: quote.client.contactName || '',
        title: quote.title || 'Sans titre',
        currency: quote.currency,
        total,
        savedAt: new Date().toISOString(),
        quote: JSON.parse(JSON.stringify(quote)),  // deep clone, no proxies
      }

      const index = this.entries.findIndex((e) => e.id === entry.id)
      if (index >= 0) this.entries[index] = entry
      else this.entries.unshift(entry)
    },

    remove(id: string) {
      this.entries = this.entries.filter((e) => e.id !== id)
    },

    get(id: string): SavedQuote | undefined {
      return this.entries.find((e) => e.id === id)
    },

    clear() {
      this.entries = []
    },
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})