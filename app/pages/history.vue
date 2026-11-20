<!-- app/pages/history.vue -->
<template>
  <div class="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-amber-200 selection:text-stone-950 relative">
    <!-- Grille architecturale subtile en arrière-plan -->
    <div
      class="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- En-tête éditorial -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-stone-200/90">
        <div>
          <div class="flex items-center gap-2.5 mb-3">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-900 text-amber-400 border border-stone-900">
              <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
              Archives locales
            </span>
            <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400">
              {{ counts.all }} {{ counts.all > 1 ? 'DOCUMENTS' : 'DOCUMENT' }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-1.5">
            Historique des devis et factures
          </h1>
          <p class="text-sm text-stone-600">
            Documents enregistrés localement dans votre navigateur — ouvrez, dupliquez ou modifiez à tout moment.
          </p>
        </div>

        <NuxtLink
          to="/devis"
          class="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-stone-800 hover:-translate-y-0.5 transition-all shrink-0 self-start sm:self-auto"
        >
          <span class="text-amber-400 font-bold">+</span>
          <span>Nouveau document</span>
        </NuxtLink>
      </div>

      <!-- Filtres -->
      <div class="flex flex-wrap items-center gap-2 mb-6">
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          :class="activeFilter === 'all'
            ? 'bg-stone-900 text-white shadow-xs'
            : 'bg-white text-stone-600 border border-stone-300/80 hover:border-stone-900 hover:text-stone-900'"
          @click="activeFilter = 'all'"
        >
          Tout <span class="ml-1 font-mono text-xs opacity-75">({{ counts.all }})</span>
        </button>

        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          :class="activeFilter === 'quote'
            ? 'bg-stone-900 text-white shadow-xs'
            : 'bg-white text-stone-600 border border-stone-300/80 hover:border-stone-900 hover:text-stone-900'"
          @click="activeFilter = 'quote'"
        >
          Devis <span class="ml-1 font-mono text-xs opacity-75">({{ counts.quote }})</span>
        </button>

        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          :class="activeFilter === 'invoice'
            ? 'bg-amber-300 text-stone-950 shadow-xs'
            : 'bg-white text-stone-600 border border-stone-300/80 hover:border-stone-900 hover:text-stone-900'"
          @click="activeFilter = 'invoice'"
        >
          Factures <span class="ml-1 font-mono text-xs opacity-75">({{ counts.invoice }})</span>
        </button>
      </div>

      <!-- État vide -->
      <div
        v-if="filteredEntries.length === 0"
        class="rounded-2xl border border-dashed border-stone-300 bg-white/80 p-12 text-center"
      >
        <div class="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-400 font-mono text-sm font-bold flex items-center justify-center mx-auto mb-3">
          ∅
        </div>
        <p class="text-sm font-semibold text-stone-800 mb-1">
          <template v-if="activeFilter === 'all'">Aucun document enregistré pour le moment.</template>
          <template v-else-if="activeFilter === 'quote'">Aucun devis enregistré.</template>
          <template v-else>Aucune facture enregistrée.</template>
        </p>
        <p class="text-xs text-stone-500 max-w-md mx-auto">
          Rédigez un devis ou une facture dans l'éditeur puis cliquez sur « Enregistrer » pour le conserver ici.
        </p>
      </div>

      <!-- Liste des documents -->
      <div v-else class="space-y-3.5">
        <article
          v-for="entry in filteredEntries"
          :key="entry.id"
          class="group rounded-2xl border border-stone-200/90 bg-white p-5 shadow-2xs hover:border-stone-400 transition-all"
        >
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md font-bold border"
                  :class="entry.quote.type === 'invoice'
                    ? 'bg-amber-100/90 text-amber-900 border-amber-300/80'
                    : 'bg-stone-900 text-amber-400 border-stone-900'"
                >
                  {{ entry.quote.type === 'invoice' ? 'Facture' : 'Devis' }}
                </span>

                <span class="font-mono text-sm font-bold text-stone-900">
                  {{ entry.number }}
                </span>

                <span class="text-stone-300">•</span>

                <span class="font-mono text-xs text-stone-500">
                  {{ formatDate(entry.savedAt) }}
                </span>
              </div>

              <h2 class="text-base font-bold text-stone-900 truncate">
                {{ entry.title }}
              </h2>

              <p class="text-xs text-stone-600 mt-1">
                <span class="font-semibold text-stone-800">{{ entry.clientCompany }}</span>
                <template v-if="entry.clientContact"> — {{ entry.clientContact }}</template>
              </p>
            </div>

            <!-- Montant -->
            <div class="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
              <span class="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                Total
              </span>
              <span class="font-mono text-base font-extrabold text-stone-900 bg-amber-200/60 px-2.5 py-0.5 rounded-md mt-0.5">
                {{ formatMoney(entry.total, entry.currency as Currency) }}
              </span>
            </div>
          </div>

          <!-- Barre d'actions -->
          <div class="flex items-center justify-between gap-2 mt-4 pt-3.5 border-t border-stone-100">
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                @click="onLoad(entry.id)"
              >
                Ouvrir
              </button>
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-stone-700 hover:border-stone-900 hover:text-stone-900 transition-colors cursor-pointer"
                @click="onDuplicate(entry.id)"
              >
                Dupliquer
              </button>
            </div>

            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
              @click="onDelete(entry.id, entry.number)"
            >
              Supprimer
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHistoryStore } from '~/stores/history'
import { useQuoteStore } from '~/stores/quote'
import { formatMoney } from '~/utils/format'
import type { Currency, Quote } from '#shared/types/quote'

const router = useRouter()
const historyStore = useHistoryStore()
const quoteStore = useQuoteStore()

const activeFilter = ref<'all' | 'quote' | 'invoice'>('all')

const filteredEntries = computed(() => {
  if (activeFilter.value === 'all') return historyStore.entries
  return historyStore.entries.filter((e) => (e.quote.type ?? 'quote') === activeFilter.value)
})

const counts = computed(() => ({
  all: historyStore.entries.length,
  quote: historyStore.entries.filter((e) => (e.quote.type ?? 'quote') === 'quote').length,
  invoice: historyStore.entries.filter((e) => e.quote.type === 'invoice').length,
}))

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function onLoad(id: string) {
  const entry = historyStore.get(id)
  if (!entry) return
  quoteStore.replace(JSON.parse(JSON.stringify(entry.quote)))
  router.push('/devis')
}

function onDuplicate(id: string) {
  const entry = historyStore.get(id)
  if (!entry) return
  const copy = JSON.parse(JSON.stringify(entry.quote)) as Quote
  copy.id = crypto.randomUUID()
  copy.number = copy.number ? `${copy.number}-copie` : ''
  quoteStore.replace(copy)
  router.push('/devis')
}

function onDelete(id: string, number: string) {
  const entry = historyStore.get(id)
  const label = (entry?.quote.type ?? 'quote') === 'invoice' ? 'la facture' : 'le devis'
  if (confirm(`Supprimer ${label} « ${number} » de l'historique ?`)) {
    historyStore.remove(id)
  }
}

useSeoMeta({
  title: 'Historique des devis — KleoQuote',
  description: 'Retrouvez les devis enregistrés localement dans votre navigateur.',
  robots: 'noindex',
})
</script>