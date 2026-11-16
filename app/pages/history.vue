<!-- app/pages/history.vue -->
<template>
  <div class="max-w-5xl mx-auto px-6 lg:px-8 py-12">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 mb-1">Historique des devis</h1>
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

    <!-- État vide -->
    <div
      v-if="historyStore.entries.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center"
    >
      <p class="text-slate-600 mb-2">Aucun devis enregistré pour le moment.</p>
      <p class="text-xs text-slate-400">
        Créez un devis et cliquez sur « Enregistrer » pour le retrouver ici.
      </p>
    </div>

    <!-- Liste -->
    <div v-else class="space-y-3">
      <div
        v-for="entry in historyStore.entries"
        :key="entry.id"
        class="rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 mb-1">
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
import type { Currency } from '#shared/types/quote'

const router = useRouter()
const historyStore = useHistoryStore()
const quoteStore = useQuoteStore()

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
  if (confirm(`Supprimer le devis « ${number} » de l'historique ?`)) {
    historyStore.remove(id)
  }
}

useSeoMeta({
  title: 'Historique des devis — KleoQuote',
  description: 'Retrouvez les devis enregistrés localement dans votre navigateur.',
  robots: 'noindex',
})
</script>