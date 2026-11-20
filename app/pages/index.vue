<!-- app/pages/index.vue -->
<template>
  <div class="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-amber-200 selection:text-stone-950 relative overflow-hidden">
    <!-- Motif de grille architecturale en arrière-plan -->
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"
      aria-hidden="true"
    />

    <div class="relative max-w-6xl mx-auto px-6 lg:px-8 pt-12 pb-24">
      <!-- Section Hero Asymétrique (2 colonnes) -->
      <section class="pt-14 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <!-- Colonne Gauche : Titre & CTA -->
        <div class="lg:col-span-7 space-y-8">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-semibold tracking-wide uppercase">
            <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            Studio de facturation hors-ligne
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-stone-900 leading-[1.08]">
            Chiffrez vos projets avec une
            <span class="relative inline-block">
              <span class="relative z-10 text-stone-900">précision chirurgicale.</span>
              <span class="absolute bottom-1.5 left-0 w-full h-3 bg-amber-300/70 -z-0 rounded-sm"></span>
            </span>
          </h1>

          <p class="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
            Oubliez les tableurs complexes. Rédigez vos devis et factures avec aperçu A4 en direct, calcul automatique des taxes et export PDF instantané.
          </p>

          <!-- Boutons d'action -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <NuxtLink
              to="/devis"
              class="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-stone-900 text-white text-sm font-semibold shadow-lg shadow-stone-900/15 hover:bg-stone-800 hover:-translate-y-0.5 transition-all"
            >
              <span>Nouveau document</span>
              <span class="px-1.5 py-0.5 text-[10px] font-mono bg-stone-700 text-stone-200 rounded">A4</span>
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>

            <NuxtLink
              to="/history"
              class="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white border border-stone-300 text-sm font-semibold text-stone-800 hover:border-stone-900 hover:bg-stone-50 transition-all"
            >
              Ouvrir mes archives
            </NuxtLink>
          </div>

          <!-- Bannière de reprise de brouillon intégrée -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="hasDraft"
              class="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 shadow-sm flex items-center justify-between gap-4 max-w-xl"
            >
              <div class="min-w-0">
                <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                  <span>Brouillon détecté</span>
                  <span>•</span>
                  <span>{{ isDraftInvoice ? 'Facture' : 'Devis' }}</span>
                </div>
                <div class="text-sm font-semibold text-stone-900 truncate mt-0.5">
                  {{ draftLabel }}
                </div>
              </div>
              <NuxtLink
                to="/devis"
                class="shrink-0 px-3.5 py-2 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                Continuer →
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Colonne Droite : Maquette visuelle d'un document A4 -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-md">
            <!-- Carte arrière décorative -->
            <div
              class="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-stone-300 to-amber-200/60 rotate-2 opacity-70"
              aria-hidden="true"
            />
            <!-- Feuille A4 stylisée -->
            <div class="relative rounded-2xl bg-white border border-stone-200/90 shadow-xl p-6 sm:p-7 space-y-6">
              <div class="flex items-start justify-between border-b border-stone-100 pb-4">
                <div>
                  <span class="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold">
                    DEVIS #2026-042
                  </span>
                  <div class="mt-2 h-3 w-32 bg-stone-800 rounded-sm"></div>
                  <div class="mt-1.5 h-2 w-20 bg-stone-300 rounded-sm"></div>
                </div>
                <div class="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-400">
                  LOGO
                </div>
              </div>

              <!-- Lignes simulées -->
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-stone-100 text-xs">
                  <div class="space-y-1">
                    <div class="font-semibold text-stone-800">Conception Identité Visuelle</div>
                    <div class="text-stone-400 text-[11px]">Charte graphique & maquettes</div>
                  </div>
                  <span class="font-mono font-semibold text-stone-900">1 200,00 €</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-stone-100 text-xs">
                  <div class="space-y-1">
                    <div class="font-semibold text-stone-800">Développement Web</div>
                    <div class="text-stone-400 text-[11px]">Intégration responsive</div>
                  </div>
                  <span class="font-mono font-semibold text-stone-900">2 450,00 €</span>
                </div>
              </div>

              <!-- Bloc Total -->
              <div class="bg-stone-50 rounded-xl p-4 space-y-2 border border-stone-100">
                <div class="flex justify-between text-xs text-stone-500">
                  <span>Sous-total HT</span>
                  <span class="font-mono">3 650,00 €</span>
                </div>
                <div class="flex justify-between text-xs text-stone-500">
                  <span>TVA (20%)</span>
                  <span class="font-mono">730,00 €</span>
                </div>
                <div class="pt-2 border-t border-stone-200 flex justify-between items-center">
                  <span class="text-xs font-bold uppercase tracking-wider text-stone-900">Net à payer</span>
                  <span class="font-mono text-base font-extrabold text-stone-900 bg-amber-200/70 px-2 py-0.5 rounded">
                    4 380,00 €
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Bento Grid des fonctionnalités -->
      <section class="pt-12 border-t border-stone-200/80">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-amber-700">Boîte à outils</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Tout ce qu'il faut, sans le superflu.
            </h2>
          </div>
          <p class="text-xs text-stone-500 max-w-xs">
            Données 100 % privées : tout reste stocké dans votre navigateur.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            :class="[
              'group rounded-2xl border border-stone-200/90 bg-white p-6 transition-all hover:border-stone-900 hover:shadow-md flex flex-col justify-between',
              index === 0 || index === 3 ? 'md:col-span-3 bg-stone-900 text-white border-stone-900' : 'md:col-span-3 lg:col-span-2'
            ]"
          >
            <div>
              <div class="flex items-center justify-between mb-6">
                <div
                  :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    index === 0 || index === 3
                      ? 'bg-stone-800 text-amber-400'
                      : 'bg-stone-100 text-stone-800 group-hover:bg-amber-300 group-hover:text-stone-950'
                  ]"
                  v-html="feature.icon"
                />
                <span
                  :class="[
                    'font-mono text-xs font-semibold',
                    index === 0 || index === 3 ? 'text-stone-500' : 'text-stone-300'
                  ]"
                >
                  0{{ index + 1 }}
                </span>
              </div>

              <h3
                :class="[
                  'text-base font-bold mb-2',
                  index === 0 || index === 3 ? 'text-white' : 'text-stone-900'
                ]"
              >
                {{ feature.title }}
              </h3>
              <p
                :class="[
                  'text-sm leading-relaxed',
                  index === 0 || index === 3 ? 'text-stone-300' : 'text-stone-600'
                ]"
              >
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>
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
    description: 'Sous-total, remise, taxes, acompte et reste à payer — calculés à la volée sans erreur.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`,
  },
  {
    title: 'Aperçu temps réel',
    description: 'Chaque frappe se reflète immédiatement dans l\'aperçu A4.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
  },
  {
    title: 'Export PDF A4',
    description: 'Document professionnel avec logo, cachet et conditions.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>`,
  },
  {
    title: 'Devis et factures',
    description: 'Basculez d\'un type à l\'autre en un clic, chaque document conserve sa mise en page et sa numérotation.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  },
  {
    title: 'Historique local',
    description: 'Retrouvez, ouvrez ou dupliquez vos documents enregistrés en un clic.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
  {
    title: 'Six devises',
    description: 'EUR, USD, MAD, GBP, CHF et MGA (Ariary) avec formatage natif.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="18"/></svg>`,
  },
]

useSeoMeta({
  title: 'KleoQuote — Générateur de devis et factures',
  description: 'Créez, prévisualisez et exportez vos devis et factures en PDF en quelques minutes.',
})
</script>