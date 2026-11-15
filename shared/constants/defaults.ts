// shared/constants/defaults.ts
import type { CompanySettings, Quote } from '#shared/types/quote'

export function createEmptyQuote(): Quote {
  const today = new Date()
  const validUntil = new Date()
  validUntil.setDate(today.getDate() + 30)

  return {
    id: crypto.randomUUID(),
    number: '',
    createdAt: today.toISOString().slice(0, 10),
    validUntil: validUntil.toISOString().slice(0, 10),
    deliveryDelay: '',
    currency: 'EUR',
    client: {
      company: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
    },
    title: '',
    description: '',
    items: [],
    taxes: [],
    paymentTerms: '',
    conditions: {
      included: [],
      excluded: [],
      maintenance: '',
      otherNotes: '',
    },
  }
}

export function createDefaultCompany(): CompanySettings {
  return {
    name: 'Kleonix',
    address: '',
    email: '',
    phone: '',
    website: '',
    legalInfo: '',
    defaultTerms: '',
    defaultCurrency: 'EUR',
  }
}