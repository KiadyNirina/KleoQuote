<!-- app/pages/settings.vue -->
<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-semibold mb-1">Paramètres de l'entreprise</h1>
    <p class="text-sm text-slate-500 mb-6">
      Ces informations sont reprises automatiquement dans les nouveaux devis et dans l'export PDF.
    </p>

    <CompanySettingsForm />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Paramètres entreprise — KleoQuote',
  description: "Configurez l'identité de Kleonix : logo, cachet, coordonnées et mentions légales.",
  ogTitle: 'Paramètres — KleoQuote',
  ogDescription: "Configurez l'identité de Kleonix pour les devis.",
  twitterCard: 'summary',
})
</script>