<!-- app/pages/terms.vue -->
<template>
  <div class="max-w-3xl mx-auto px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
      Conditions d'utilisation
    </h1>
    <p class="text-sm text-slate-500 mb-10">
      Dernière mise à jour : {{ lastUpdated }}
    </p>

    <div class="prose prose-slate max-w-none">
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-slate-900 mb-3">1. Objet</h2>
        <p class="text-sm text-slate-700 leading-relaxed">
          KleoQuote est une application web développée par Kleonix pour faciliter
          la création, la personnalisation et l'export de devis professionnels.
          L'application est mise à disposition de toute personne ou organisation
          souhaitant préparer des propositions commerciales claires et prêtes à
          envoyer.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-lg font-semibold text-slate-900 mb-3">2. Accès à l'application</h2>
        <p class="text-sm text-slate-700 leading-relaxed">
          L'application est accessible librement depuis un navigateur moderne.
          Aucun compte utilisateur n'est requis dans cette version : les données
          sont conservées localement dans le navigateur de l'utilisateur.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-lg font-semibold text-slate-900 mb-3">3. Données et confidentialité</h2>
        <p class="text-sm text-slate-700 leading-relaxed mb-3">
          Les devis, les paramètres de l'entreprise et les images (logo, cachet)
          sont stockés dans le <code class="text-xs bg-slate-100 px-1.5 py-0.5 rounded">localStorage</code>
          du navigateur. Aucune donnée n'est transmise à un serveur tiers.
        </p>
        <ul class="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1">
          <li>Aucun compte utilisateur n'est créé.</li>
          <li>Aucun cookie de suivi n'est utilisé.</li>
          <li>Les données restent sur le poste de l'utilisateur.</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-lg font-semibold text-slate-900 mb-3">4. Responsabilités</h2>
        <p class="text-sm text-slate-700 leading-relaxed">
          Kleonix s'efforce de maintenir l'application disponible et fonctionnelle,
          mais ne saurait être tenu responsable des pertes de données liées à
          la suppression du stockage local, à un changement de navigateur ou à
          une défaillance matérielle. Il est recommandé de conserver une copie
          des devis exportés au format PDF.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-lg font-semibold text-slate-900 mb-3">5. Propriété intellectuelle</h2>
        <p class="text-sm text-slate-700 leading-relaxed">
          L'application, son code source et ses éléments graphiques sont la
          propriété exclusive de Kleonix. Toute reproduction ou diffusion sans
          autorisation écrite est interdite.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-lg font-semibold text-slate-900 mb-3">6. Évolution des conditions</h2>
        <p class="text-sm text-slate-700 leading-relaxed">
          Kleonix se réserve le droit de modifier les présentes conditions à tout
          moment. Les utilisateurs sont invités à consulter cette page
          régulièrement.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-900 mb-3">7. Contact</h2>
        <p class="text-sm text-slate-700 leading-relaxed">
          Pour toute question relative à ces conditions, contactez l'équipe
          Kleonix via les coordonnées disponibles sur le site officiel de
          l'entreprise.
        </p>
      </section>
    </div>

    <div class="mt-12 pt-6 border-t border-slate-200">
      <NuxtLink to="/" class="text-sm text-slate-600 hover:underline underline-offset-4">
        ← Retour à l'accueil
      </NuxtLink>
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
  description: "Conditions d'utilisation de KleoQuote, application de création de devis développée par Kleonix.",
  robots: 'noindex',
})
</script>