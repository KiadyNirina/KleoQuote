<!-- app/pages/index.vue -->
<template>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-slate-100/80 to-transparent"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto px-6 lg:px-8 pt-20 pb-24">
      <!-- Eyebrow -->
      <div class="flex justify-center mb-6">
        <span
          class="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-slate-500 bg-white/70 backdrop-blur border border-slate-200 rounded-full px-3 py-1"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Générateur de devis et factures
        </span>
      </div>

      <!-- Hero -->
      <h1
        class="text-center text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]"
      >
        Des documents clairs,<br />
        <span class="text-slate-400">en quelques minutes.</span>
      </h1>
      <p class="mt-6 text-center text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
        Créez, personnalisez et exportez vos devis et factures.
        Aperçu en temps réel, calcul automatique, PDF prêt à envoyer.
      </p>

      <!-- Actions principales -->
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          to="/devis"
          class="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Créer un document
          <span class="transition-transform group-hover:translate-x-0.5">→</span>
        </NuxtLink>
        <NuxtLink
          to="/history"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-white hover:border-slate-400 transition-colors"
        >
          Voir l'historique
        </NuxtLink>
        <NuxtLink
          to="/settings"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-white hover:border-slate-400 transition-colors"
        >
          Paramètres
        </NuxtLink>
      </div>

      <!-- Reprise du brouillon -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="hasDraft"
          class="mt-12 mx-auto max-w-xl rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-5 py-4 flex items-center justify-between gap-4 shadow-sm"
        >
          <div class="min-w-0">
            <div class="text-xs uppercase tracking-wider text-slate-500 mb-0.5">
              {{ isDraftInvoice ? 'Facture en cours' : 'Devis en cours' }}
            </div>
            <div class="text-sm font-medium text-slate-900 truncate">
              {{ draftLabel }}
            </div>
          </div>
          <NuxtLink
            to="/devis"
            class="shrink-0 text-sm font-medium text-slate-900 hover:underline underline-offset-4"
          >
            Reprendre →
          </NuxtLink>
        </div>
      </Transition>

      <!-- Séparateur décoratif -->
      <div class="mt-24 mb-12 flex items-center justify-center gap-4" aria-hidden="true">
        <span class="h-px w-16 bg-slate-200"></span>
        <span class="text-xs uppercase tracking-widest text-slate-400">Fonctionnalités</span>
        <span class="h-px w-16 bg-slate-200"></span>
      </div>

      <!-- Grille des fonctionnalités -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all"
        >
          <div
            class="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors"
            v-html="feature.icon"
          />
          <h3 class="text-sm font-semibold text-slate-900 mb-1">{{ feature.title }}</h3>
          <p class="text-xs text-slate-600 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Note de bas de page -->
      <p class="mt-16 text-center text-xs text-slate-400">
        Les brouillons et l'historique sont sauvegardés localement dans votre navigateur.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuoteStore } from '~/stores/quote'

const quoteStore = useQuoteStore()

const hasDraft = computed(() => {
  const q = quoteStore.current
  return Boolean(q.number || q.client.company || q.title || q.items.length > 0)
})

const isDraftInvoice = computed(() => quoteStore.current.type === 'invoice')

const draftLabel = computed(() => {
  const q = quoteStore.current
  const parts: string[] = []
  if (q.number) parts.push(q.number)
  if (q.client.company) parts.push(q.client.company)
  if (q.title) parts.push(q.title)
  const fallback = q.type === 'invoice' ? 'Facture sans titre' : 'Devis sans titre'
  return parts.join(' — ') || fallback
})

const features = [
  {
    title: 'Calcul automatique',
    description: 'Sous-total, remise, taxes, acompte et reste à payer — sans erreur.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`,
  },
  {
    title: 'Aperçu temps réel',
    description: 'Chaque frappe se reflète immédiatement dans l\'aperçu A4.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
  },
  {
    title: 'Export PDF A4',
    description: 'Document professionnel avec logo, cachet et conditions.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>`,
  },
  {
    title: 'Devis et factures',
    description: 'Basculez d\'un type à l\'autre, chaque document garde son format propre.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  },
  {
    title: 'Historique local',
    description: 'Retrouvez, ouvrez ou dupliquez vos documents enregistrés en un clic.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
  {
    title: 'Six devises',
    description: 'EUR, USD, MAD, GBP, CHF et MGA (Ariary) avec formatage natif.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="18"/></svg>`,
  },
]

useSeoMeta({
  title: 'KleoQuote — Générateur de devis et factures',
  description: 'Créez, prévisualisez et exportez vos devis et factures en PDF en quelques minutes.',
})
</script>