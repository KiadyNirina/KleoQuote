<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-amber-200 selection:text-stone-950">
    <!-- En-tête principal -->
    <header class="sticky top-0 z-50 bg-[#FAF9F6]/85 backdrop-blur-md border-b border-stone-200/80">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="group flex items-center gap-2.5 shrink-0">
          <span
            class="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm shadow-sm transition-transform duration-200 group-hover:-rotate-3"
          >
            K.
          </span>
          <span class="font-bold tracking-tight text-lg text-stone-900">
            KleoQuote
          </span>
        </NuxtLink>

        <!-- Navigation principale -->
        <nav class="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
          <NuxtLink
            to="/"
            class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors whitespace-nowrap"
            exact-active-class="!bg-stone-900 !text-white font-semibold shadow-xs"
          >
            Accueil
          </NuxtLink>
          <NuxtLink
            to="/devis"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors whitespace-nowrap"
            active-class="!bg-amber-300 !text-stone-950 font-semibold shadow-xs"
          >
            <span>Éditeur</span>
          </NuxtLink>
          <NuxtLink
            to="/history"
            class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors whitespace-nowrap"
            active-class="!bg-stone-900 !text-white font-semibold shadow-xs"
          >
            Historique
          </NuxtLink>
          <NuxtLink
            to="/settings"
            class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors whitespace-nowrap"
            active-class="!bg-stone-900 !text-white font-semibold shadow-xs"
          >
            Paramètres
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Contenu de la page -->
    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <!-- Pied de page éditorial -->
    <footer class="border-t border-stone-200/80 bg-white/70 backdrop-blur-xs">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500"
      >
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
          <span class="font-medium text-stone-700">© {{ year }} KleoQuote</span>
          <span class="text-stone-300">•</span>
          <span>Tous droits réservés.</span>
        </div>

        <div class="flex items-center gap-5">
          <span class="hidden md:inline font-mono text-[11px] text-stone-400">
            STOCKAGE LOCAL
          </span>
          <NuxtLink
            to="/terms"
            class="font-medium text-stone-600 hover:text-stone-900 hover:underline underline-offset-4 transition-colors"
          >
            Conditions d'utilisation
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>