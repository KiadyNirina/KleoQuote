<!-- app/components/quote/Preview.vue -->
<template>
  <div class="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
    <!-- Barre d'info -->
    <div class="px-4 py-2 border-b border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
      <span>Aperçu du devis</span>
      <span>{{ quote.currency }}</span>
    </div>

    <!-- Feuille A4 simulée -->
    <div class="p-6 text-sm space-y-6">
      <!-- En-tête entreprise / client -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <img
              v-if="company.logoDataUrl"
              :src="company.logoDataUrl"
              alt="Logo"
              class="h-10 w-auto object-contain"
            />
            <span class="text-lg font-semibold">{{ company.name || 'Kleonix' }}</span>
          </div>
          <div class="text-xs text-slate-600 whitespace-pre-line">
            {{ company.address }}
            <template v-if="company.email"><br />{{ company.email }}</template>
            <template v-if="company.phone"><br />{{ company.phone }}</template>
            <template v-if="company.website"><br />{{ company.website }}</template>
          </div>
        </div>

        <div class="text-right">
          <div class="text-xs uppercase tracking-wide text-slate-500">Devis</div>
          <div class="text-base font-semibold">{{ quote.number || '—' }}</div>
          <div class="text-xs text-slate-600 mt-1">
            Émis le {{ formatDate(quote.createdAt) }}<br />
            Valide jusqu'au {{ formatDate(quote.validUntil) }}
          </div>
        </div>
      </div>

      <hr class="border-slate-200" />

      <!-- Client -->
      <div>
        <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Client</div>
        <div class="font-medium">{{ quote.client.company || '—' }}</div>
        <div class="text-xs text-slate-600 whitespace-pre-line">
          {{ quote.client.contactName }}
          <template v-if="quote.client.address"><br />{{ quote.client.address }}</template>
          <template v-if="quote.client.email"><br />{{ quote.client.email }}</template>
          <template v-if="quote.client.phone"><br />{{ quote.client.phone }}</template>
        </div>
      </div>

      <!-- Objet -->
      <div v-if="quote.title || quote.description">
        <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Objet</div>
        <div class="font-medium">{{ quote.title || '—' }}</div>
        <p v-if="quote.description" class="text-xs text-slate-600 mt-1 whitespace-pre-line">
          {{ quote.description }}
        </p>
      </div>

      <!-- Prestations -->
      <div>
        <div class="text-xs uppercase tracking-wide text-slate-500 mb-2">Prestations</div>
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-200 text-left text-slate-500">
              <th class="py-1 pr-2 font-medium">Prestation</th>
              <th class="py-1 px-2 font-medium text-right w-12">Qté</th>
              <th class="py-1 px-2 font-medium text-right w-24">PU</th>
              <th class="py-1 pl-2 font-medium text-right w-24">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="quote.items.length === 0">
              <td colspan="4" class="py-3 text-center text-slate-400 italic">
                Aucune prestation
              </td>
            </tr>
            <tr
              v-for="item in quote.items"
              :key="item.id"
              class="border-b border-slate-100 align-top"
            >
              <td class="py-2 pr-2">
                <div class="font-medium">{{ item.name || '—' }}</div>
                <div v-if="item.description" class="text-slate-500">{{ item.description }}</div>
              </td>
              <td class="py-2 px-2 text-right">{{ item.quantity }}</td>
              <td class="py-2 px-2 text-right">{{ formatMoney(item.unitPrice, quote.currency) }}</td>
              <td class="py-2 pl-2 text-right font-medium">
                {{ formatMoney(lineTotal(item), quote.currency) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Récapitulatif financier -->
      <div class="flex justify-end">
        <div class="w-full max-w-xs space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-slate-600">Sous-total</span>
            <span>{{ formatMoney(totals.subtotal, quote.currency) }}</span>
          </div>
          <div v-if="totals.discount > 0" class="flex justify-between text-slate-600">
            <span>Remise</span>
            <span>− {{ formatMoney(totals.discount, quote.currency) }}</span>
          </div>
          <div
            v-for="tax in quote.taxes"
            :key="tax.id"
            class="flex justify-between text-slate-600"
          >
            <span>{{ tax.label || 'Taxe' }} ({{ tax.rate }}%)</span>
            <span>{{ formatMoney((totals.subtotal - totals.discount) * tax.rate / 100, quote.currency) }}</span>
          </div>
          <div class="flex justify-between font-semibold text-sm border-t border-slate-200 pt-2 mt-1">
            <span>Total</span>
            <span>{{ formatMoney(totals.total, quote.currency) }}</span>
          </div>
          <div v-if="totals.depositAmount > 0" class="flex justify-between text-slate-600">
            <span>Acompte</span>
            <span>{{ formatMoney(totals.depositAmount, quote.currency) }}</span>
          </div>
          <div v-if="totals.depositAmount > 0" class="flex justify-between font-medium">
            <span>Reste à payer</span>
            <span>{{ formatMoney(totals.remaining, quote.currency) }}</span>
          </div>
        </div>
      </div>

      <!-- Conditions -->
      <div
        v-if="
          quote.conditions.included.length ||
          quote.conditions.excluded.length ||
          quote.conditions.maintenance ||
          quote.conditions.otherNotes ||
          quote.paymentTerms ||
          quote.deliveryDelay
        "
        class="space-y-3 pt-4 border-t border-slate-200"
      >
        <div v-if="quote.deliveryDelay">
          <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Délai de réalisation</div>
          <div class="text-xs text-slate-700">{{ quote.deliveryDelay }}</div>
        </div>
        <div v-if="quote.paymentTerms">
          <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Modalités de paiement</div>
          <div class="text-xs text-slate-700 whitespace-pre-line">{{ quote.paymentTerms }}</div>
        </div>
        <div v-if="quote.conditions.included.length">
          <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Inclus</div>
          <ul class="text-xs text-slate-700 list-disc list-inside space-y-0.5">
            <li v-for="(line, i) in quote.conditions.included" :key="i">{{ line }}</li>
          </ul>
        </div>
        <div v-if="quote.conditions.excluded.length">
          <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Non inclus</div>
          <ul class="text-xs text-slate-700 list-disc list-inside space-y-0.5">
            <li v-for="(line, i) in quote.conditions.excluded" :key="i">{{ line }}</li>
          </ul>
        </div>
        <div v-if="quote.conditions.maintenance">
          <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Maintenance</div>
          <div class="text-xs text-slate-700 whitespace-pre-line">{{ quote.conditions.maintenance }}</div>
        </div>
        <div v-if="quote.conditions.otherNotes">
          <div class="text-xs uppercase tracking-wide text-slate-500 mb-1">Remarques</div>
          <div class="text-xs text-slate-700 whitespace-pre-line">{{ quote.conditions.otherNotes }}</div>
        </div>
      </div>

      <!-- Bon pour accord -->
      <div class="pt-6 border-t border-slate-200">
        <div class="text-xs uppercase tracking-wide text-slate-500 mb-3">Bon pour accord</div>

        <div class="grid grid-cols-2 gap-6 text-xs text-slate-600">
          <!-- Émetteur : Kleonix -->
          <div class="space-y-3">
            <div class="font-medium text-slate-700">{{ company.name || 'Kleonix' }}</div>
            <div>Date : ____________________</div>
            <div>Signature : ____________________</div>
            <div v-if="company.stampDataUrl" class="pt-2">
              <img
                :src="company.stampDataUrl"
                alt="Cachet"
                class="max-h-20 object-contain"
              />
            </div>
          </div>

          <!-- Client -->
          <div class="space-y-3">
            <div class="font-medium text-slate-700">{{ quote.client.company || 'Client' }}</div>
            <div>Date : ____________________</div>
            <div>Signature : ____________________</div>
            <div>Nom : ____________________</div>
            <div>Cachet : ____________________</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Quote, CompanySettings, LineItem } from '#shared/types/quote'
import { useQuoteCalculations } from '~/composables/useQuoteCalculations'
import { formatMoney } from '~/utils/format'

const props = defineProps<{
  quote: Quote
  company: CompanySettings
}>()

const { computeLineTotal, computeQuoteTotals } = useQuoteCalculations()

const lineTotal = (item: LineItem) => computeLineTotal(item)
const totals = computed(() => computeQuoteTotals(props.quote))

function formatDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>