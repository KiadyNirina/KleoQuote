<!-- app/pages/index.vue -->
<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero -->
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
        Bienvenue sur KleoQuote
      </h1>
      <p class="text-slate-600 max-w-2xl mx-auto">
        Créez, personnalisez et exportez vos devis Kleonix en quelques minutes.
        L'aperçu se met à jour en temps réel, le PDF est prêt à envoyer.
      </p>
    </div>

    <!-- Actions principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      <NuxtLink
        to="/devis"
        class="group rounded-lg border border-slate-200 bg-white p-6 hover:border-slate-400 transition-colors"
      >
        <div class="flex items-start justify-between mb-3">
          <h2 class="text-lg font-semibold">Créer un devis</h2>
          <span class="text-slate-400 group-hover:text-slate-700 transition-colors text-xl">→</span>
        </div>
        <p class="text-sm text-slate-600">
          Remplissez le formulaire, visualisez l'aperçu en direct et téléchargez le PDF.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="group rounded-lg border border-slate-200 bg-white p-6 hover:border-slate-400 transition-colors"
      >
        <div class="flex items-start justify-between mb-3">
          <h2 class="text-lg font-semibold">Paramètres entreprise</h2>
          <span class="text-slate-400 group-hover:text-slate-700 transition-colors text-xl">→</span>
        </div>
        <p class="text-sm text-slate-600">
          Configurez l'identité Kleonix : logo, cachet, coordonnées, mentions légales.
        </p>
      </NuxtLink>
    </div>

    <!-- Raccourci brouillon en cours -->
    <div
      v-if="hasDraft"
      class="rounded-lg border border-amber-200 bg-amber-50 p-4 mb-10 flex items-center justify-between gap-4"
    >
      <div>
        <div class="text-sm font-medium text-amber-900">Un devis est en cours d'édition</div>
        <div class="text-xs text-amber-800">
          {{ draftLabel }}
        </div>
      </div>
      <NuxtLink
        to="/devis"
        class="px-3 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800 whitespace-nowrap"
      >
        Reprendre
      </NuxtLink>
    </div>

    <!-- Fonctionnalités -->
    <div class="rounded-lg border border-slate-200 bg-white p-6">
      <h2 class="text-base font-semibold mb-4">Ce que fait KleoQuote</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
        <li class="flex items-start gap-2">
          <span class="text-green-600 mt-0.5">✓</span>
          Calcul automatique des totaux (remise, taxes, acompte)
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 mt-0.5">✓</span>
          Aperçu A4 en temps réel à chaque frappe
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 mt-0.5">✓</span>
          Export PDF professionnel prêt à envoyer
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 mt-0.5">✓</span>
          Logo et cachet Kleonix intégrés au document
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 mt-0.5">✓</span>
          Six devises supportées (EUR, USD, MAD, GBP, CHF, MGA)
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-600 mt-0.5">✓</span>
          Brouillons sauvegardés automatiquement dans le navigateur
        </li>
      </ul>
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

const draftLabel = computed(() => {
  const q = quoteStore.current
  const parts: string[] = []
  if (q.number) parts.push(q.number)
  if (q.client.company) parts.push(q.client.company)
  if (q.title) parts.push(q.title)
  return parts.join(' — ') || 'Devis sans titre'
})

useSeoMeta({
  title: 'KleoQuote — Générateur de devis Kleonix',
  description: 'Créez, prévisualisez et exportez vos devis Kleonix en PDF en quelques minutes.',
})
</script>