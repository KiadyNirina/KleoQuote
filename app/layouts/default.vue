<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-lg">
          <span class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm">
            K
          </span>
          <span>KleoQuote</span>
        </NuxtLink>

        <nav class="flex items-center gap-1">
          <NuxtLink
            to="/"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100"
            active-class="bg-slate-100"
          >
            Devis
          </NuxtLink>
          <NuxtLink
            to="/settings"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100"
            active-class="bg-slate-100"
          >
            Paramètres
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
        KleoQuote — Générateur de devis Kleonix
      </div>
    </footer>
  </div>
</template>