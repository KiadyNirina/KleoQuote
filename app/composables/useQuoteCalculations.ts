// app/composables/useQuoteCalculations.ts
import type { LineItem, Discount, Tax, Quote } from '#shared/types/quote'

const round2 = (n: number): number => Math.round(n * 100) / 100

export function useQuoteCalculations() {
  const computeLineTotal = (item: LineItem): number =>
    round2(item.quantity * item.unitPrice)

  const computeSubtotal = (items: LineItem[]): number =>
    round2(items.reduce((sum, item) => sum + computeLineTotal(item), 0))

  const computeDiscount = (subtotal: number, discount?: Discount): number => {
    if (!discount) return 0
    const amount =
      discount.type === 'percentage'
        ? subtotal * (discount.value / 100)
        : discount.value
    return round2(Math.min(amount, subtotal))
  }

  const computeTaxes = (base: number, taxes: Tax[]): number =>
    round2(taxes.reduce((sum, tax) => sum + base * (tax.rate / 100), 0))

  const computeQuoteTotals = (quote: Quote) => {
    const subtotal = computeSubtotal(quote.items)
    const discount = computeDiscount(subtotal, quote.discount)
    const taxableBase = round2(subtotal - discount)
    const taxes = computeTaxes(taxableBase, quote.taxes)
    const total = round2(taxableBase + taxes)

    const depositAmount = quote.deposit
      ? round2(
          quote.deposit.type === 'percentage'
            ? total * (quote.deposit.value / 100)
            : quote.deposit.value
        )
      : 0

    return {
      subtotal,
      discount,
      taxes,
      total,
      depositAmount,
      remaining: round2(total - depositAmount),
    }
  }

  return {
    computeLineTotal,
    computeSubtotal,
    computeDiscount,
    computeTaxes,
    computeQuoteTotals,
  }
}