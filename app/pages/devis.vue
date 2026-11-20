<!-- app/pages/devis.vue -->
<template>
  <div class="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-amber-200 selection:text-stone-950 relative">
    <!-- Grille architecturale subtile en arrière-plan -->
    <div
      class="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <!-- En-tête de l'atelier d'édition -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 mb-8 border-b border-stone-200/90">
        <div class="max-w-2xl">
          <div class="flex flex-wrap items-center gap-2.5 mb-3">
            <span
              class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
              :class="isInvoice
                ? 'bg-amber-100/90 text-amber-900 border-amber-300/80'
                : 'bg-stone-900 text-amber-400 border-stone-900'"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
              {{ isInvoice ? 'Mode Facture' : 'Mode Devis' }}
            </span>

            <span
              v-if="quoteStore.current.number"
              class="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-stone-200 text-stone-700"
            >
              #{{ quoteStore.current.number }}
            </span>

            <span class="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-400 font-mono">
              <span>•</span>
              <span>SYNCHRO A4</span>
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-2">
            {{ isInvoice ? 'Rédiger une facture' : 'Rédiger un devis' }}
          </h1>
          <p class="text-sm text-stone-600 leading-relaxed">
            Renseignez les champs dans le formulaire — la feuille A4 à droite reflète chaque modification en direct.
          </p>
        </div>

        <!-- Barre de contrôle & actions -->
        <div class="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3">
          <!-- Segmented control Devis / Facture -->
          <div class="inline-flex p-1 rounded-xl bg-stone-200/70 border border-stone-300/70 self-start sm:self-auto lg:self-end">
            <button
              type="button"
              class="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer"
              :class="!isInvoice
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'"
              @click="askSwitchType('quote')"
            >
              Devis
            </button>
            <button
              type="button"
              class="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer"
              :class="isInvoice
                ? 'bg-amber-300 text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'"
              @click="askSwitchType('invoice')"
            >
              Facture
            </button>
          </div>

          <!-- Actions document -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-700 hover:border-stone-900 hover:text-stone-900 transition-all cursor-pointer"
              @click="askReset"
            >
              Réinitialiser
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-900 hover:bg-stone-100 hover:border-stone-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-stone-300 disabled:hover:bg-white cursor-pointer"
              :disabled="!isValid"
              @click="onSave"
            >
              Enregistrer
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-stone-800 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-stone-900 cursor-pointer"
              :disabled="!isValid"
              @click="onExport"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Exporter PDF</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bandeau de prérequis si incomplet -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-if="!isValid"
          class="mb-7 rounded-xl border-l-4 border-amber-500 bg-amber-50/90 border border-amber-200/80 px-4 py-3 text-xs sm:text-sm text-stone-700 flex items-center gap-3 shadow-2xs"
        >
          <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
          <span>
            Renseignez le <strong class="font-semibold text-stone-900">numéro</strong>, le <strong class="font-semibold text-stone-900">client</strong> (société, contact, email), l'<strong class="font-semibold text-stone-900">objet</strong> et au moins <strong class="font-semibold text-stone-900">une prestation</strong> pour débloquer l'enregistrement et l'export PDF.
          </span>
        </div>
      </Transition>

      <!-- Espace de travail 2 colonnes : Formulaire & Aperçu A4 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-6">
          <QuoteForm />
        </div>

        <div class="lg:col-span-6 lg:sticky lg:top-24">
          <div class="flex items-center justify-between mb-3 px-1">
            <span class="text-[11px] font-bold uppercase tracking-widest text-stone-400 font-mono">
              Aperçu du document
            </span>
            <span class="text-[11px] font-mono text-stone-400">
              FORMAT A4
            </span>
          </div>
          <div class="rounded-2xl ring-1 ring-stone-200/90 shadow-lg bg-white overflow-hidden">
            <QuotePreview :quote="quoteStore.current" :company="companyStore.settings" />
          </div>
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

    <!-- Toasts inline -->
    <Teleport to="body">
      <div class="fixed bottom-6 right-6 z-[90] flex flex-col gap-2 pointer-events-none">
        <TransitionGroup
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-for="t in localToasts"
            :key="t.id"
            class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-medium shadow-xl border border-stone-800 pointer-events-auto"
          >
            <span class="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span>{{ t.message }}</span>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
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

const localToasts = ref<{ id: number; message: string }[]>([])
let toastCounter = 0

function showToast(message: string) {
  const id = ++toastCounter
  localToasts.value.push({ id, message })
  setTimeout(() => {
    localToasts.value = localToasts.value.filter((t) => t.id !== id)
  }, 2500)
}

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