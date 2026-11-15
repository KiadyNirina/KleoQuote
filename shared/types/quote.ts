// shared/types/quote.ts
export type Currency = 'EUR' | 'USD' | 'MAD' | 'GBP' | 'CHF'

export interface LineItem {
  id: string
  name: string
  description?: string
  quantity: number
  unitPrice: number
}

export interface Discount {
  type: 'percentage' | 'fixed'
  value: number
  label?: string
}

export interface Tax {
  id: string
  label: string
  rate: number
}

export interface Deposit {
  type: 'percentage' | 'fixed'
  value: number
}

export interface QuoteClient {
  company: string
  contactName: string
  email: string
  phone?: string
  address: string
}

export interface QuoteConditions {
  included: string[]
  excluded: string[]
  maintenance: string
  otherNotes: string
}

export interface Quote {
  id: string
  number: string
  createdAt: string
  validUntil: string
  deliveryDelay: string
  currency: Currency
  client: QuoteClient
  title: string
  description: string
  items: LineItem[]
  discount?: Discount
  taxes: Tax[]
  deposit?: Deposit
  paymentTerms: string
  conditions: QuoteConditions
}

export interface CompanySettings {
  name: string
  logoDataUrl?: string
  address: string
  email: string
  phone: string
  website: string
  legalInfo?: string
  defaultTerms: string
  defaultCurrency: Currency
}