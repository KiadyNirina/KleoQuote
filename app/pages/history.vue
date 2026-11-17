<!-- app/pages/history.vue -->
<template>
  <div class="max-w-5xl mx-auto px-6 lg:px-8 py-12">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 mb-1">Historique des devis et factures</h1>
        <p class="text-sm text-slate-500">
          Devis enregistrés localement dans votre navigateur.
        </p>
      </div>
      <NuxtLink
        to="/devis"
        class="px-3 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800"
      >
        + Nouveau devis
      </NuxtLink>
    </div>

    <div class="flex items-center gap-2 mb-6">
      <button
        type="button"
        class="px-3 py-1.5 rounded-md text-sm transition-colors"
        :class="activeFilter === 'all'
          ? 'bg-slate-900 text-white'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'"
        @click="activeFilter = 'all'"
      >
        Tout ({{ counts.all }})
      </button>
      <button
        type="button"
        class="px-3 py-1.5 rounded-md text-sm transition-colors"
        :class="activeFilter === 'quote'
          ? 'bg-slate-900 text-white'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'"
        @click="activeFilter = 'quote'"
      >
        Devis ({{ counts.quote }})
      </button>
      <button
        type="button"
        class="px-3 py-1.5 rounded-md text-sm transition-colors"
        :class="activeFilter === 'invoice'
          ? 'bg-slate-900 text-white'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'"
        @click="activeFilter = 'invoice'"
      >
        Factures ({{ counts.invoice }})
      </button>
    </div>

    <!-- État vide -->
    <div
      v-if="filteredEntries.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center"
    >
      <p class="text-slate-600 mb-2">
        <template v-if="activeFilter === 'all'">Aucun document enregistré pour le moment.</template>
        <template v-else-if="activeFilter === 'quote'">Aucun devis enregistré.</template>
        <template v-else>Aucune facture enregistrée.</template>
      </p>
      <p class="text-xs text-slate-400">
        Créez un document et cliquez sur « Enregistrer » pour le retrouver ici.
      </p>
    </div>

    <!-- Liste -->
    <div v-else class="space-y-3">
      <div
        v-for="entry in filteredEntries"
        :key="entry.id"
        class="rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <span
                class="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium"
                :class="entry.quote.type === 'invoice'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-600'"
              >
                {{ entry.quote.type === 'invoice' ? 'Facture' : 'Devis' }}
              </span>
              <span class="text-sm font-semibold text-slate-900">{{ entry.number }}</span>
              <span class="text-xs text-slate-400">·</span>
              <span class="text-xs text-slate-500">{{ formatDate(entry.savedAt) }}</span>
            </div>
            <div class="text-sm text-slate-700 truncate">{{ entry.title }}</div>
            <div class="text-xs text-slate-500 mt-1">
              {{ entry.clientCompany }}
              <template v-if="entry.clientContact"> — {{ entry.clientContact }}</template>
            </div>
          </div>

          <div class="text-right shrink-0">
            <div class="text-sm font-semibold text-slate-900">
              {{ formatMoney(entry.total, entry.currency as Currency) }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            class="text-xs text-slate-700 hover:underline underline-offset-4"
            @click="onLoad(entry.id)"
          >
            Ouvrir
          </button>
          <span class="text-slate-300">·</span>
          <button
            type="button"
            class="text-xs text-slate-700 hover:underline underline-offset-4"
            @click="onDuplicate(entry.id)"
          >
            Dupliquer
          </button>
          <span class="text-slate-300">·</span>
          <button
            type="button"
            class="text-xs text-red-600 hover:underline underline-offset-4"
            @click="onDelete(entry.id, entry.number)"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHistoryStore } from '~/stores/history'
import { useQuoteStore } from '~/stores/quote'
import { formatMoney } from '~/utils/format'
import type { Currency, Quote } from '#shared/types/quote'
import { ref, computed } from 'vue'

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