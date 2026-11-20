<!-- app/pages/settings.vue -->
<template>
  <div class="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-amber-200 selection:text-stone-950 relative">
    <!-- Grille architecturale subtile en arrière-plan -->
    <div
      class="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35"
      aria-hidden="true"
    />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <!-- En-tête éditorial -->
      <div class="pb-8 mb-8 border-b border-stone-200/90 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div class="max-w-2xl">
          <div class="flex flex-wrap items-center gap-2.5 mb-3">
            <span
              class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-900 text-amber-400 border border-stone-900"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
              Profil & Identité
            </span>
            <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400">
              PARAMÈTRES GLOBAUX
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-2">
            Paramètres de l'entreprise
          </h1>
          <p class="text-sm text-stone-600 leading-relaxed max-w-xl">
            Définissez l'identité, les coordonnées, les visuels (logo et cachet) et la devise par défaut repris automatiquement dans vos documents et exports PDF.
          </p>
        </div>

        <div class="shrink-0">
          <NuxtLink
            to="/devis"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm font-semibold text-stone-800 hover:border-stone-900 hover:bg-stone-50 transition-all shadow-2xs"
          >
            <span>Aller à l'éditeur</span>
            <span>→</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Formulaire de configuration -->
      <div class="rounded-2xl">
        <CompanySettingsForm />
      </div>
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