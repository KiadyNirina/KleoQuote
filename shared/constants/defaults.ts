// shared/constants/defaults.ts
import type { CompanySettings, Quote, DocumentType } from '#shared/types/quote'

export function createEmptyQuote(type: DocumentType = 'quote'): Quote {
  const today = new Date()
  const validUntil = new Date()
  validUntil.setDate(today.getDate() + 30)
  const dueDate = new Date()
  dueDate.setDate(today.getDate() + 30)

  return {
    id: crypto.randomUUID(),
    type,
    number: '',
    createdAt: today.toISOString().slice(0, 10),
    validUntil: validUntil.toISOString().slice(0, 10),
    dueDate: type === 'invoice' ? dueDate.toISOString().slice(0, 10) : undefined,
    status: type === 'invoice' ? 'draft' : undefined,
    deliveryDelay: '',
    currency: 'EUR',
    client: { company: '', contactName: '', email: '', phone: '', address: '' },
    title: '',
    description: '',
    items: [],
    taxes: [],
    paymentTerms: '',
    conditions: { included: [], excluded: [], maintenance: '', otherNotes: '' },
  }
}

export function createDefaultCompany(): CompanySettings {
  return {
    name: 'Kleonix',
    stampDataUrl: undefined,
    address: '',
    email: '',
    phone: '',
    website: '',
    legalInfo: '',
    defaultTerms: '',
    defaultCurrency: 'EUR',
  }
}