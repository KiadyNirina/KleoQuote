<!-- app/pages/devis.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-semibold mb-1">
          {{ isInvoice ? 'Nouvelle facture' : 'Nouveau devis' }}
        </h1>
        <p class="text-sm text-slate-500">
          Renseignez les informations à gauche, l'aperçu se met à jour en temps réel.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <!-- Sélecteur de type -->
        <div class="flex items-center gap-2">
          <span class="text-xs uppercase tracking-wider text-slate-500">Type</span>
          <div class="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              type="button"
              class="px-3 py-1.5 text-sm rounded-md transition-colors"
              :class="!isInvoice
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'"
              @click="switchType('quote')"
            >
              Devis
            </button>
            <button
              type="button"
              class="px-3 py-1.5 text-sm rounded-md transition-colors"
              :class="isInvoice
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'"
              @click="switchType('invoice')"
            >
              Facture
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <span v-if="savedMessage" class="text-xs text-green-600">Enregistré ✓</span>
          <button
            type="button"
            class="px-3 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50 disabled:opacity-50"
            :disabled="!isValid"
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
            :disabled="!isValid"
            @click="onExport"
          >
            Télécharger le PDF
          </button>
        </div>
      </div>
    </div>

    <!-- Contenu -->
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuoteStore } from '~/stores/quote'
import { useCompanyStore } from '~/stores/company'
import { useHistoryStore } from '~/stores/history'
import { useQuoteCalculations } from '~/composables/useQuoteCalculations'
import type { DocumentType } from '#shared/types/quote'

useSeoMeta({
  title: 'Nouveau document — KleoQuote',
  description: 'Créez et prévisualisez un devis ou une facture Kleonix en temps réel.',
})

const quoteStore = useQuoteStore()
const companyStore = useCompanyStore()
const historyStore = useHistoryStore()
const { computeQuoteTotals } = useQuoteCalculations()
const { exportQuote } = usePdfExport()
const route = useRoute()

const isInvoice = computed(() => quoteStore.current.type === 'invoice')
const savedMessage = ref(false)

const isValid = computed(() => {
  const q = quoteStore.current
  return Boolean(
    q.number &&
    q.client.company &&
    q.client.contactName &&
    q.client.email &&
    q.title &&
    q.items.length > 0
  )
})

onMounted(() => {
  if (route.query.type === 'invoice' && !isInvoice.value) {
    quoteStore.newDocument('invoice')
  }
})

function onReset() {
  const label = isInvoice.value ? 'la facture' : 'le devis'
  if (confirm(`Réinitialiser ${label} en cours ?`)) {
    quoteStore.reset()
  }
}

function onExport() {
  if (!isValid.value) return
  exportQuote(quoteStore.current, companyStore.settings)
}

function onSave() {
  if (!isValid.value) return
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

  if (type === 'invoice') {
    if (!quoteStore.current.dueDate) {
      const d = new Date()
      d.setDate(d.getDate() + 30)
      quoteStore.current.dueDate = d.toISOString().slice(0, 10)
    }
    if (!quoteStore.current.status) {
      quoteStore.current.status = 'draft'
    }
  }
}
</script>