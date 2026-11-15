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
      <button
        type="button"
        class="px-3 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
        @click="onReset"
      >
        Réinitialiser
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <!-- Formulaire -->
      <div>
        <QuoteForm />
      </div>

      <!-- Aperçu sticky -->
      <div class="lg:sticky lg:top-20">
        <QuotePreview :quote="quoteStore.current" :company="companyStore.settings" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuoteStore } from '~/stores/quote'
import { useCompanyStore } from '~/stores/company'

const quoteStore = useQuoteStore()
const companyStore = useCompanyStore()

function onReset() {
  if (confirm('Réinitialiser le devis en cours ?')) {
    quoteStore.reset()
  }
}
</script>