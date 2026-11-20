<!-- app/pages/terms.vue -->
<template>
  <div class="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-amber-200 selection:text-stone-950 relative">
    <!-- Grille architecturale subtile en arrière-plan -->
    <div
      class="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35"
      aria-hidden="true"
    />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- En-tête éditorial -->
      <div class="pb-8 mb-8 border-b border-stone-200/90 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2.5 mb-3">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-900 text-amber-400 border border-stone-900">
              <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
              Mentions légales
            </span>
            <span class="font-mono text-[11px] uppercase tracking-wider text-stone-500">
              MISE À JOUR : {{ lastUpdated }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Conditions d'utilisation
          </h1>
        </div>

        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm font-semibold text-stone-800 hover:border-stone-900 hover:bg-stone-50 transition-all shadow-2xs shrink-0 self-start sm:self-auto"
        >
          <span>← Retour à l'accueil</span>
        </NuxtLink>
      </div>

      <!-- Articles juridiques -->
      <div class="space-y-4">
        <!-- 01. Objet -->
        <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-7 h-7 rounded-lg bg-stone-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              01
            </span>
            <h2 class="text-base font-bold text-stone-900">Objet</h2>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed">
            KleoQuote est une application web développée par Kleonix pour faciliter
            la création, la personnalisation et l'export de devis et de factures
            professionnels. L'application est mise à disposition de toute personne
            ou organisation souhaitant préparer des propositions commerciales
            claires et prêtes à envoyer.
          </p>
        </section>

        <!-- 02. Accès à l'application -->
        <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              02
            </span>
            <h2 class="text-base font-bold text-stone-900">Accès à l'application</h2>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed">
            L'application est accessible librement depuis un navigateur moderne.
            Aucun compte utilisateur n'est requis dans cette version : les données
            sont conservées localement dans le navigateur de l'utilisateur.
          </p>
        </section>

        <!-- 03. Données et confidentialité -->
        <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-7 h-7 rounded-lg bg-amber-300 text-stone-950 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              03
            </span>
            <h2 class="text-base font-bold text-stone-900">Données et confidentialité</h2>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed mb-4">
            Les documents (devis et factures), les paramètres de l'entreprise,
            l'historique des documents enregistrés et les images (logo, cachet)
            sont stockés dans le
            <code class="font-mono text-xs font-semibold text-stone-900 bg-amber-100/80 border border-amber-200/80 px-1.5 py-0.5 rounded">localStorage</code>
            du navigateur. Aucune donnée n'est transmise à un serveur tiers.
          </p>
          <ul class="space-y-2 text-sm text-stone-700 bg-stone-50/80 border border-stone-200/70 rounded-xl p-4">
            <li class="flex items-center gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>Aucun compte utilisateur n'est créé.</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>Aucun cookie de suivi n'est utilisé.</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>Les données restent sur le poste de l'utilisateur.</span>
            </li>
          </ul>
        </section>

        <!-- 04. Responsabilités -->
        <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              04
            </span>
            <h2 class="text-base font-bold text-stone-900">Responsabilités</h2>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed">
            Kleonix s'efforce de maintenir l'application disponible et fonctionnelle,
            mais ne saurait être tenu responsable des pertes de données liées à
            la suppression du stockage local, à un changement de navigateur ou à
            une défaillance matérielle. Il est recommandé de conserver une copie
            des documents exportés au format PDF.
          </p>
        </section>

        <!-- 05. Propriété intellectuelle -->
        <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              05
            </span>
            <h2 class="text-base font-bold text-stone-900">Propriété intellectuelle</h2>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed">
            L'application, son code source et ses éléments graphiques sont la
            propriété exclusive de Kleonix. Toute reproduction ou diffusion sans
            autorisation écrite est interdite.
          </p>
        </section>

        <!-- 06. Évolution des conditions -->
        <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              06
            </span>
            <h2 class="text-base font-bold text-stone-900">Évolution des conditions</h2>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed">
            Kleonix se réserve le droit de modifier les présentes conditions à tout
            moment. Les utilisateurs sont invités à consulter cette page
            régulièrement.
          </p>
        </section>

        <!-- 07. Contact -->
        <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              07
            </span>
            <h2 class="text-base font-bold text-stone-900">Contact</h2>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed">
            Pour toute question relative à ces conditions, contactez l'équipe
            Kleonix via les coordonnées disponibles sur le site officiel de
            l'entreprise.
          </p>
        </section>
      </div>

      <!-- Pied de page de la section -->
      <div class="mt-10 pt-6 border-t border-stone-200/80 flex items-center justify-between gap-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 hover:underline underline-offset-4 transition-colors"
        >
          <span>← Retour à l'accueil</span>
        </NuxtLink>
        <span class="font-mono text-[11px] text-stone-400">
          KLEOQUTE • KLEONIX
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lastUpdated = new Date().toLocaleDateString('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

useSeoMeta({
  title: "Conditions d'utilisation — KleoQuote",
  description: "Conditions d'utilisation de KleoQuote, application de création de devis et factures développée par Kleonix.",
  robots: 'noindex',
})
</script>