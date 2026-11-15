// app/utils/format.ts
import type { Currency } from '#shared/types/quote'

const LOCALE_MAP: Record<Currency, string> = {
  EUR: 'fr-FR',
  USD: 'en-US',
  MAD: 'fr-MA',
  GBP: 'en-GB',
  CHF: 'fr-CH',
  MGA: 'fr-MG',
}

// Devises sans sous-unité (0 décimale)
const ZERO_DECIMAL: Currency[] = ['MGA']

export function formatMoney(amount: number, currency: Currency): string {
  const decimals = ZERO_DECIMAL.includes(currency) ? 0 : 2
  return new Intl.NumberFormat(LOCALE_MAP[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}