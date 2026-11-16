<!-- app/pages/index.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold mb-1">Nouveau devis</h1>
        <p class="text-sm text-slate-500">
          Renseignez les informations à gauche, l'aperçu se met à jour en temps réel.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <span v-if="savedMessage" class="text-xs text-green-600">Enregistré ✓</span>
        <button
          type="button"
          class="px-3 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50 disabled:opacity-50"
          @click="onSave"
        >
          Enregistrer
        </button>
        <button
          type="button"
          class="px-3 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
          @click="onReset"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          class="px-3 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800 disabled:opacity-50"
          @click="onExport"
        >
          Télécharger le PDF
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div>
        <QuoteForm />
      </div>
      <div class="lg:sticky lg:top-20">
        <QuotePreview :quote="quoteStore.current" :company="companyStore.settings" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuoteStore } from '~/stores/quote'
import { useCompanyStore } from '~/stores/company'
import { useHistoryStore } from '~/stores/history'
import { useQuoteCalculations } from '~/composables/useQuoteCalculations'
import { computed } from 'vue'

useSeoMeta({
  title: 'Nouveau devis — KleoQuote',
  description: 'Créez et prévisualisez un devis Kleonix en temps réel, puis exportez-le en PDF.',
  ogTitle: 'KleoQuote — Générateur de devis Kleonix',
  ogDescription: 'Créez et prévisualisez un devis Kleonix en temps réel, puis exportez-le en PDF.',
  twitterCard: 'summary',
})

const quoteStore = useQuoteStore()
const companyStore = useCompanyStore()
const historyStore = useHistoryStore()
const { computeQuoteTotals } = useQuoteCalculations()
const { exportQuote } = usePdfExport()

function onReset() {
  if (confirm('Réinitialiser le devis en cours ?')) {
    quoteStore.reset()
  }
}

function onExport() {
  exportQuote(quoteStore.current, companyStore.settings)
}

const savedMessage = ref(false)

function onSave() {
  const totals = computeQuoteTotals(quoteStore.current)
  historyStore.save(quoteStore.current, totals.total)
  savedMessage.value = true
  setTimeout(() => { savedMessage.value = false }, 2000)
}
</script>