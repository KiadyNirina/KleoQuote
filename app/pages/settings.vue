<!-- app/pages/settings.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- En-tête -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-3">
          <span
            class="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900 text-white"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
            Configuration
          </span>
        </div>
        <h1 class="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
          Paramètres de l'entreprise
        </h1>
        <p class="text-sm text-slate-500 leading-relaxed max-w-xl">
          Ces informations sont reprises automatiquement dans les nouveaux devis et factures, ainsi que dans l'export PDF.
        </p>
      </div>

      <CompanySettingsForm />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Paramètres entreprise — KleoQuote',
  description: "Configurez l'identité de votre entreprise : logo, cachet, coordonnées, mentions légales et devise par défaut.",
  ogTitle: 'Paramètres — KleoQuote',
  ogDescription: "Configurez l'identité de votre entreprise pour les devis et factures.",
  twitterCard: 'summary',
})
</script>