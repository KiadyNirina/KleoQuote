<!-- app/pages/devis.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- En-tête -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
        <div class="max-w-xl">
          <div class="flex items-center gap-2 mb-3">
            <span
              class="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full"
              :class="isInvoice
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-900 text-white'"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              {{ isInvoice ? 'Facture' : 'Devis' }}
            </span>
            <span v-if="quoteStore.current.number" class="text-xs text-slate-500">
              {{ quoteStore.current.number }}
            </span>
          </div>
          <h1 class="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            {{ isInvoice ? 'Nouvelle facture' : 'Nouveau devis' }}
          </h1>
          <p class="text-sm text-slate-500 leading-relaxed">
            Renseignez les informations à gauche — l'aperçu se met à jour instantanément.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-3 w-full lg:w-auto">
          <!-- Sélecteur de type -->
          <div class="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-sm self-start lg:self-end">
            <button
              type="button"
              class="px-4 py-2 text-sm rounded-lg transition-all"
              :class="!isInvoice
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'"
              @click="askSwitchType('quote')"
            >
              Devis
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm rounded-lg transition-all"
              :class="isInvoice
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'"
              @click="askSwitchType('invoice')"
            >
              Facture
            </button>
          </div>

          <!-- Barre d'actions -->
          <div class="flex items-center gap-2 self-start lg:self-end">
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              @click="askReset"
            >
              Réinitialiser
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="!isValid"
              @click="onSave"
            >
              Enregistrer
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              :disabled="!isValid"
              @click="onExport"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Bandeau d'aide si invalide -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div
          v-if="!isValid"
          class="mb-6 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 flex items-center gap-2"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Complétez le numéro, le client, l'objet et au moins une prestation pour activer l'enregistrement et l'export.
        </div>
      </Transition>

      <!-- Contenu 2 colonnes -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <QuoteForm />
        </div>
        <div class="lg:sticky lg:top-24">
          <QuotePreview :quote="quoteStore.current" :company="companyStore.settings" />
        </div>
      </div>
    </div>

    <!-- Dialogs -->
    <UiConfirmDialog
      :open="dialog.open"
      :title="dialog.title"
      :message="dialog.message"
      :confirm-label="dialog.confirmLabel"
      :destructive="dialog.destructive"
      @confirm="onDialogConfirm"
      @cancel="closeDialog"
    />

    <!-- Toasts -->
    <UiToast />
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
import UiConfirmDialog from '~/components/ui/ConfirmDialog.vue'

useSeoMeta({
  title: 'Éditeur — KleoQuote',
  description: 'Créez et prévisualisez un devis ou une facture Kleonix en temps réel.',
})

const quoteStore = useQuoteStore()
const companyStore = useCompanyStore()
const historyStore = useHistoryStore()
const { computeQuoteTotals } = useQuoteCalculations()
const { exportQuote } = usePdfExport()
const { show: showToast } = useToast()
const route = useRoute()

const isInvoice = computed(() => quoteStore.current.type === 'invoice')
const isValid = computed(() => {
  const q = quoteStore.current
  return Boolean(q.number && q.client.company && q.client.contactName && q.client.email && q.title && q.items.length > 0)
})

// === Dialog state ===
interface DialogState {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  destructive: boolean
  onConfirm: () => void
}

const dialog = ref<DialogState>({
  open: false,
  title: '',
  message: '',
  confirmLabel: 'Confirmer',
  destructive: false,
  onConfirm: () => {},
})

function closeDialog() {
  dialog.value.open = false
}

function onDialogConfirm() {
  dialog.value.onConfirm()
  closeDialog()
}

function askReset() {
  dialog.value = {
    open: true,
    title: isInvoice.value ? 'Réinitialiser la facture ?' : 'Réinitialiser le devis ?',
    message: 'Le contenu actuel sera remplacé par un document vierge. Cette action ne supprime pas l\'historique.',
    confirmLabel: 'Réinitialiser',
    destructive: true,
    onConfirm: () => {
      quoteStore.reset()
      showToast('Document réinitialisé')
    },
  }
}

function askSwitchType(type: DocumentType) {
  if (quoteStore.current.type === type) return
  dialog.value = {
    open: true,
    title: `Passer en ${type === 'invoice' ? 'facture' : 'devis'} ?`,
    message: 'Le contenu actuel (client, prestations, conditions) sera conservé. Seuls les champs spécifiques au type seront ajustés.',
    confirmLabel: 'Changer',
    destructive: false,
    onConfirm: () => applySwitchType(type),
  }
}

function applySwitchType(type: DocumentType) {
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
  showToast(`Type modifié : ${type === 'invoice' ? 'facture' : 'devis'}`)
}

function onExport() {
  if (!isValid.value) return
  exportQuote(quoteStore.current, companyStore.settings)
  showToast('PDF généré')
}

function onSave() {
  if (!isValid.value) return
  const totals = computeQuoteTotals(quoteStore.current)
  historyStore.save(quoteStore.current, totals.total)
  showToast('Enregistré dans l\'historique')
}

onMounted(() => {
  if (route.query.type === 'invoice' && !isInvoice.value) {
    quoteStore.newDocument('invoice')
  }
})
</script>