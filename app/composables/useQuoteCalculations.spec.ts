// app/composables/useQuoteCalculations.spec.ts
import { describe, it, expect } from 'vitest'
import { useQuoteCalculations } from './useQuoteCalculations'
import type { LineItem, Quote } from '#shared/types/quote'

const { computeLineTotal, computeSubtotal, computeDiscount, computeTaxes, computeQuoteTotals } =
  useQuoteCalculations()

const makeItem = (id: string, name: string, quantity: number, unitPrice: number): LineItem => ({
  id,
  name,
  quantity,
  unitPrice,
})

describe('computeLineTotal', () => {
  it('multiplie quantité et prix unitaire', () => {
    expect(computeLineTotal(makeItem('1', 'Dev', 3, 150))).toBe(450)
  })

  it('arrondit à 2 décimales', () => {
    expect(computeLineTotal(makeItem('1', 'Dev', 1, 10.555))).toBe(10.56)
  })
})

describe('computeSubtotal', () => {
  it('additionne les totaux de ligne', () => {
    const items = [makeItem('1', 'A', 1, 100), makeItem('2', 'B', 2, 50.25)]
    expect(computeSubtotal(items)).toBe(200.5)
  })

  it('retourne 0 pour un tableau vide', () => {
    expect(computeSubtotal([])).toBe(0)
  })
})

describe('computeDiscount', () => {
  it('calcule une remise en pourcentage', () => {
    expect(computeDiscount(1000, { type: 'percentage', value: 10 })).toBe(100)
  })

  it('calcule une remise fixe', () => {
    expect(computeDiscount(1000, { type: 'fixed', value: 150 })).toBe(150)
  })

  it('plafonne la remise au sous-total', () => {
    expect(computeDiscount(100, { type: 'fixed', value: 200 })).toBe(100)
  })

  it('retourne 0 sans remise', () => {
    expect(computeDiscount(1000)).toBe(0)
  })
})

describe('computeTaxes', () => {
  it('additionne plusieurs taxes', () => {
    const taxes = [
      { id: '1', label: 'TVA 20%', rate: 20 },
      { id: '2', label: 'Taxe locale 5%', rate: 5 },
    ]
    expect(computeTaxes(1000, taxes)).toBe(250)
  })

  it('retourne 0 sans taxe', () => {
    expect(computeTaxes(1000, [])).toBe(0)
  })
})

describe('computeQuoteTotals', () => {
  const makeQuote = (overrides: Partial<Quote> = {}): Quote => ({
    id: 'q1',
    type: 'quote',
    number: 'DEV-001',
    createdAt: '2025-01-01',
    validUntil: '2025-01-31',
    deliveryDelay: '2 semaines',
    currency: 'EUR',
    client: { company: 'ACME', contactName: 'Jean', email: 'j@acme.com', address: 'Paris' },
    title: 'Site web',
    description: 'Refonte complète',
    items: [makeItem('1', 'Design', 1, 1000), makeItem('2', 'Dev', 2, 500)],
    taxes: [{ id: '1', label: 'TVA 20%', rate: 20 }],
    paymentTerms: '30 jours',
    conditions: { included: [], excluded: [], maintenance: '', otherNotes: '' },
    signature: { show: true },
    ...overrides,
  })

  it('calcule le total avec taxe et sans remise', () => {
    const totals = computeQuoteTotals(makeQuote())
    expect(totals.subtotal).toBe(2000)
    expect(totals.discount).toBe(0)
    expect(totals.taxes).toBe(400)
    expect(totals.total).toBe(2400)
    expect(totals.depositAmount).toBe(0)
    expect(totals.remaining).toBe(2400)
  })

  it('applique une remise avant les taxes', () => {
    const totals = computeQuoteTotals(
      makeQuote({ discount: { type: 'percentage', value: 10 } })
    )
    expect(totals.subtotal).toBe(2000)
    expect(totals.discount).toBe(200)
    expect(totals.taxes).toBe(360) // 20% de 1800
    expect(totals.total).toBe(2160)
  })

  it('calcule un acompte en pourcentage', () => {
    const totals = computeQuoteTotals(
      makeQuote({ deposit: { type: 'percentage', value: 30 } })
    )
    expect(totals.total).toBe(2400)
    expect(totals.depositAmount).toBe(720)
    expect(totals.remaining).toBe(1680)
  })

  it('calcule un acompte fixe', () => {
    const totals = computeQuoteTotals(
      makeQuote({ deposit: { type: 'fixed', value: 500 } })
    )
    expect(totals.depositAmount).toBe(500)
    expect(totals.remaining).toBe(1900)
  })
})