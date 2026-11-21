<!-- app/pages/index.vue -->
<template>
  <div class="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-amber-200 selection:text-stone-950 relative overflow-hidden">
    <!-- Motif de grille architecturale en arrière-plan -->
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_40%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"
      aria-hidden="true"
    />

    <div class="relative max-w-6xl mx-auto px-6 lg:px-8 pt-12 pb-24">
      <!-- 1. SECTION HERO ASYMÉTRIQUE -->
      <section class="pt-10 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
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
            <div
              class="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-stone-300 to-amber-200/60 rotate-2 opacity-70"
              aria-hidden="true"
            />
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

      <!-- 2. SECTION BENTO GRID DES FONCTIONNALITÉS -->
      <section id="features" class="pt-16 pb-20 border-t border-stone-200/80 scroll-mt-20">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-amber-700 font-mono">Boîte à outils</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
              Tout ce qu'il faut, sans le superflu.
            </h2>
          </div>
          <p class="text-xs text-stone-500 max-w-xs leading-relaxed">
            Données 100 % privées : vos documents et paramètres restent stockés localement dans votre navigateur.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            :class="[
              'group rounded-2xl border p-6 transition-all flex flex-col justify-between',
              featureSpanClass(index),
              isDarkCard(index)
                ? 'bg-stone-900 text-white border-stone-900 shadow-md hover:bg-stone-800/95'
                : 'bg-white text-stone-900 border-stone-200/90 hover:border-stone-900 hover:shadow-md'
            ]"
          >
            <div>
              <div class="flex items-center justify-between mb-6">
                <div
                  :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    isDarkCard(index)
                      ? 'bg-stone-800 text-amber-400'
                      : 'bg-stone-100 text-stone-800 group-hover:bg-amber-300 group-hover:text-stone-950'
                  ]"
                  v-html="feature.icon"
                />
                <span
                  :class="[
                    'font-mono text-xs font-bold',
                    isDarkCard(index) ? 'text-amber-400/80' : 'text-stone-400'
                  ]"
                >
                  0{{ index + 1 }}
                </span>
              </div>

              <h3
                :class="[
                  'text-base font-bold mb-2',
                  isDarkCard(index) ? 'text-white' : 'text-stone-900'
                ]"
              >
                {{ feature.title }}
              </h3>
              <p
                :class="[
                  'text-sm leading-relaxed',
                  isDarkCard(index) ? 'text-stone-300' : 'text-stone-600'
                ]"
              >
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. COMMENT ÇA MARCHE ? -->
      <section class="py-20 border-t border-stone-200/80">
        <div class="max-w-2xl mb-12">
          <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 font-mono">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Simple & rapide
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 mt-2 leading-tight">
            De votre projet à un document professionnel en trois étapes.
          </h2>
          <p class="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Pas besoin de maîtriser les tableurs ou les logiciels de comptabilité. KleoQuote simplifie la création de vos documents pour vous permettre de vous concentrer sur votre activité.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="(step, idx) in steps"
            :key="step.number"
            class="relative rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-2xs hover:border-stone-900 transition-all flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-6">
                <span
                  class="px-2.5 py-1 rounded-lg font-mono text-xs font-bold"
                  :class="idx === 2 ? 'bg-amber-300 text-stone-950' : 'bg-stone-900 text-amber-400'"
                >
                  {{ step.number }}
                </span>
                <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400">
                  ÉTAPE {{ idx + 1 }}/3
                </span>
              </div>

              <h3 class="text-base font-bold text-stone-900 mb-2">
                {{ step.title }}
              </h3>
              <p class="text-sm text-stone-600 leading-relaxed">
                {{ step.description }}
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>{{ step.tag }}</span>
              <span v-if="idx < 2" class="text-stone-300">→</span>
              <span v-else class="text-emerald-600 font-bold">PDF PRÊT</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. PERSONNALISATION DES DOCUMENTS -->
      <section class="py-20 border-t border-stone-200/80">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <!-- Colonne Gauche : Contenu & grille d'éléments -->
          <div class="lg:col-span-7 space-y-6">
            <div>
              <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 font-mono">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                Présentation professionnelle
              </span>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 mt-2 leading-tight">
                Chaque document reflète votre identité.
              </h2>
              <p class="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
                Donnez une apparence professionnelle à vos devis et factures. Intégrez vos informations, votre logo et vos éléments de présentation pour créer des documents cohérents avec l'identité de votre entreprise.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                v-for="(item, idx) in customizationItems"
                :key="item.label"
                class="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-stone-200/90 hover:border-stone-400 transition-colors"
              >
                <span class="w-6 h-6 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  0{{ idx + 1 }}
                </span>
                <div>
                  <div class="text-sm font-semibold text-stone-900">{{ item.label }}</div>
                  <div class="text-xs text-stone-500 mt-0.5">{{ item.hint }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonne Droite : Aperçu structurel A4 annoté -->
          <div class="lg:col-span-5">
            <div class="rounded-2xl bg-white border border-stone-200/90 shadow-lg p-6 space-y-5 relative">
              <div class="flex items-center justify-between border-b border-stone-100 pb-4">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-xl bg-stone-900 text-amber-400 font-bold text-sm flex items-center justify-center">
                    LOGO
                  </div>
                  <div>
                    <div class="text-xs font-bold text-stone-900">Votre Entreprise</div>
                    <div class="text-[11px] text-stone-400 font-mono">NIF • STAT • Adresse</div>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold uppercase">
                  Identité
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div class="font-mono text-[10px] uppercase text-stone-400 mb-1">Émetteur</div>
                  <div class="font-semibold text-stone-800">Coordonnées & contact</div>
                </div>
                <div class="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div class="font-mono text-[10px] uppercase text-stone-400 mb-1">Destinataire</div>
                  <div class="font-semibold text-stone-800">Client & adresse</div>
                </div>
              </div>

              <div class="p-3.5 rounded-xl border border-dashed border-stone-300 bg-stone-50/50 space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="font-medium text-stone-700">Détail des prestations</span>
                  <span class="font-mono font-semibold text-stone-900">HT / TTC</span>
                </div>
                <div class="h-2 w-3/4 bg-stone-200 rounded-full"></div>
                <div class="h-2 w-1/2 bg-stone-200 rounded-full"></div>
              </div>

              <div class="pt-2 flex items-end justify-between gap-4 border-t border-stone-100">
                <div class="text-[11px] text-stone-500 max-w-[180px]">
                  Conditions de règlement, validité et clauses personnalisées.
                </div>
                <div class="px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/80 text-center shrink-0">
                  <div class="font-mono text-[9px] uppercase tracking-wider text-amber-800 font-bold">
                    Bon pour accord
                  </div>
                  <div class="text-[11px] font-semibold text-stone-800 mt-0.5">
                    Cachet & signature
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. POUR QUI EST KLEOQUOTE ? -->
      <section class="py-20 border-t border-stone-200/80">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div class="max-w-2xl">
            <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              Un outil pour votre activité
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-2">
              Pensé pour ceux qui font avancer les projets.
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed">
            Que vous travailliez seul ou au sein d'une petite structure, KleoQuote vous accompagne au quotidien avec simplicité et efficacité.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="(profile, idx) in targetProfiles"
            :key="profile.title"
            class="group rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs hover:border-stone-900 transition-all"
          >
            <div class="flex items-center justify-between mb-5">
              <div
                class="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 group-hover:bg-amber-300 group-hover:text-stone-950 flex items-center justify-center transition-colors"
                v-html="profile.icon"
              />
              <span class="font-mono text-xs font-bold text-stone-400">0{{ idx + 1 }}</span>
            </div>
            <h3 class="text-base font-bold text-stone-900 mb-2">
              {{ profile.title }}
            </h3>
            <p class="text-sm text-stone-600 leading-relaxed">
              {{ profile.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- 7. FAQ — QUESTIONS FRÉQUENTES -->
      <section class="py-20 border-t border-stone-200/80">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <!-- Colonne Gauche sticky -->
          <div class="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              Besoin d'informations ?
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Les réponses à vos questions.
            </h2>
            <p class="text-sm text-stone-600 leading-relaxed">
              Vous souhaitez en savoir plus sur KleoQuote avant de commencer ? Retrouvez ici les réponses aux questions les plus fréquentes concernant son utilisation et ses fonctionnalités.
            </p>
          </div>

          <!-- Colonne Droite : Accordéon FAQ -->
          <div class="lg:col-span-8 space-y-3">
            <div
              v-for="(faq, idx) in faqs"
              :key="faq.question"
              class="rounded-2xl border bg-white transition-colors overflow-hidden"
              :class="openFaqIndex === idx ? 'border-stone-900 shadow-xs' : 'border-stone-200/90 hover:border-stone-400'"
            >
              <button
                type="button"
                class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                :aria-expanded="openFaqIndex === idx"
                @click="toggleFaq(idx)"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="font-mono text-xs font-bold text-amber-700 shrink-0">
                    0{{ idx + 1 }}
                  </span>
                  <span class="text-sm sm:text-base font-bold text-stone-900">
                    {{ faq.question }}
                  </span>
                </div>
                <span
                  class="w-7 h-7 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 font-mono text-sm font-bold flex items-center justify-center shrink-0 transition-transform"
                  :class="openFaqIndex === idx ? 'rotate-45 !bg-stone-900 !text-amber-400 !border-stone-900' : ''"
                >
                  +
                </span>
              </button>

              <div
                v-if="openFaqIndex === idx"
                class="px-5 pb-5 pt-1 pl-12 text-sm text-stone-600 leading-relaxed border-t border-stone-100"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. CTA FINAL — INVITATION À COMMENCER -->
      <section class="pt-10">
        <div class="rounded-3xl bg-white border border-stone-200/90 p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
          <div
            class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-amber-100/60 to-transparent"
            aria-hidden="true"
          />

          <div class="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div class="max-w-2xl space-y-3">
              <div class="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-800 font-mono">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                Moins de temps à formater, plus de temps à entreprendre.
              </div>

              <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Votre prochain document professionnel commence ici.
              </h2>

              <p class="text-sm sm:text-base text-stone-600 leading-relaxed">
                Créez vos devis et factures en quelques minutes. Profitez d'un outil simple, intuitif et pensé pour faciliter votre quotidien professionnel.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3 shrink-0">
              <NuxtLink
                to="/devis"
                class="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-stone-900 text-white text-sm font-semibold shadow-md hover:bg-stone-800 hover:-translate-y-0.5 transition-all"
              >
                <span>Créer mon premier devis</span>
                <span class="text-amber-400 transition-transform group-hover:translate-x-1">→</span>
              </NuxtLink>

              <a
                href="#features"
                class="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm font-semibold text-stone-800 hover:border-stone-900 hover:bg-white transition-all"
              >
                Découvrir les fonctionnalités
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

function isDarkCard(index: number): boolean {
  return index === 0 || index === 4
}

function featureSpanClass(index: number): string {
  switch (index) {
    case 0:
      return 'lg:col-span-3'
    case 1:
      return 'lg:col-span-3'
    case 2:
      return 'lg:col-span-2'
    case 3:
      return 'lg:col-span-2'
    case 4:
      return 'lg:col-span-2'
    case 5:
      return 'lg:col-span-6'
    default:
      return 'lg:col-span-2'
  }
}

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

const steps = [
  {
    number: '01',
    title: 'Renseignez les informations',
    description: 'Ajoutez les coordonnées de votre entreprise, les informations de votre client et les détails de votre prestation.',
    tag: 'CLIENT & PROJET',
  },
  {
    number: '02',
    title: 'Composez votre document',
    description: 'Ajoutez vos articles, définissez les quantités, les prix et les éventuelles remises. Les calculs sont effectués automatiquement.',
    tag: 'CHIFFRAGE AUTO',
  },
  {
    number: '03',
    title: 'Exportez votre PDF',
    description: 'Visualisez le résultat en temps réel et téléchargez votre document au format PDF, prêt à être partagé.',
    tag: 'FORMAT A4',
  },
]

const customizationItems = [
  { label: "Identité et coordonnées de l'entreprise", hint: 'Nom, adresse, contact et mentions légales' },
  { label: 'Logo professionnel', hint: 'Intégré automatiquement en en-tête' },
  { label: 'Informations du client', hint: 'Société, interlocuteur et adresse complète' },
  { label: 'Détails des prestations', hint: 'Lignes chiffrées, quantités et remises' },
  { label: 'Conditions et modalités de paiement', hint: 'Validité, échéance, acompte et clauses' },
  { label: 'Signature et cachet', hint: 'Bloc « Bon pour accord » prêt à signer' },
]

const privacyPoints = [
  {
    title: 'Stockage local',
    description: 'Vos documents sont conservés directement sur votre appareil dans le navigateur.',
  },
  {
    title: 'Sans inscription',
    description: "Utilisez immédiatement l'application sans créer de compte ni mot de passe.",
  },
  {
    title: 'Confidentialité',
    description: 'Vos devis, factures et visuels ne sont jamais centralisés sur un serveur externe.',
  },
  {
    title: 'Accès direct',
    description: 'Retrouvez, modifiez ou dupliquez vos archives à tout moment depuis votre navigateur.',
  },
]

const targetProfiles = [
  {
    title: 'Freelances & indépendants',
    description: 'Préparez rapidement vos devis et factures pour vos clients, avec une présentation soignée.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  },
  {
    title: 'Entrepreneurs & petites entreprises',
    description: 'Simplifiez la gestion de vos documents commerciaux au quotidien sans outil complexe.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  },
  {
    title: 'Agences & prestataires de services',
    description: 'Présentez clairement vos prestations et formalisez vos propositions commerciales.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  },
]

const openFaqIndex = ref<number | null>(0)

function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'KleoQuote est-il gratuit ?',
    answer: "Oui, KleoQuote est accessible librement pour créer, personnaliser et exporter vos devis et factures au format PDF sans abonnement.",
  },
  {
    question: "Dois-je créer un compte pour utiliser l'application ?",
    answer: "Non, aucune inscription n'est requise. Vous pouvez commencer à rédiger votre premier document dès l'ouverture de l'éditeur.",
  },
  {
    question: 'Où sont stockés mes documents ?',
    answer: "Vos brouillons, vos documents enregistrés et les paramètres de votre entreprise (logo, cachet, coordonnées) sont conservés localement dans le stockage (localStorage) de votre navigateur.",
  },
  {
    question: 'Puis-je utiliser KleoQuote sans connexion Internet ?',
    answer: "Une fois l'application chargée dans votre navigateur, la saisie, le calcul automatique et la consultation de votre historique fonctionnent localement sur votre appareil.",
  },
  {
    question: 'Puis-je modifier ou dupliquer un ancien document ?',
    answer: "Oui. Depuis la page Historique, vous pouvez rouvrir n'importe quel devis ou facture enregistré pour le modifier, ou le dupliquer en un clic pour gagner du temps.",
  },
  {
    question: 'Puis-je convertir un devis en facture ?',
    answer: "Oui, directement depuis l'éditeur grâce au sélecteur Devis / Facture : toutes les informations du client et vos lignes de prestations sont conservées automatiquement.",
  },
  {
    question: 'Quelles devises sont prises en charge ?',
    answer: "KleoQuote prend en charge six devises avec leur formatage natif : Euro (EUR), Dollar US (USD), Dirham marocain (MAD), Livre sterling (GBP), Franc suisse (CHF) et Ariary malgache (MGA).",
  },
  {
    question: 'Comment sauvegarder mes documents ?',
    answer: "Cliquez sur « Enregistrer » dans l'éditeur pour archiver le document dans votre historique local, et utilisez « Exporter PDF » pour conserver une copie définitive sur votre ordinateur.",
  },
]

useSeoMeta({
  title: 'KleoQuote — Générateur de devis et factures',
  description: 'Créez, prévisualisez et exportez vos devis et factures en PDF en quelques minutes.',
})
</script>