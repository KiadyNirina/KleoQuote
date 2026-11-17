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
      <div class="flex items-center gap-2 mb-4">
        <span class="text-xs uppercase tracking-wider text-slate-500">Type de document</span>
        <div class="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
          <button
            type="button"
            class="px-3 py-1.5 text-sm rounded-md transition-colors"
            :class="quoteStore.current.type === 'quote'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900'"
            @click="switchType('quote')"
          >
            Devis
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-sm rounded-md transition-colors"
            :class="quoteStore.current.type === 'invoice'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900'"
            @click="switchType('invoice')"
          >
            Facture
          </button>
        </div>
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
import type { DocumentType } from '#shared/types/quote'

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
const route = useRoute()

onMounted(() => {
  if (route.query.type === 'invoice' && quoteStore.current.type !== 'invoice') {
    quoteStore.newDocument('invoice' as const)
  }
})

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

function switchType(type: DocumentType) {
  if (type !== 'quote' && type !== 'invoice') return
  if (quoteStore.current.type === type) return
  if (!confirm(`Changer en ${type === 'invoice' ? 'facture' : 'devis'} ? Le contenu actuel sera conservé.`)) return
  quoteStore.current.type = type
  if (type === 'invoice' && !quoteStore.current.dueDate) {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    quoteStore.current.dueDate = d.toISOString().slice(0, 10)
  }
  if (type === 'invoice' && !quoteStore.current.status) {
    quoteStore.current.status = 'draft'
  }
}
</script>