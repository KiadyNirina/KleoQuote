// app/utils/format.ts
import type { Currency } from '#shared/types/quote'

const LOCALE_MAP: Record<Currency, string> = {
  EUR: 'fr-FR',
  USD: 'en-US',
  MAD: 'fr-MA',
  GBP: 'en-GB',
  CHF: 'fr-CH',
}

export function formatMoney(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(LOCALE_MAP[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}