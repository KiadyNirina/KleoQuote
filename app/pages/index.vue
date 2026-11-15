<!-- app/pages/index.vue -->
<template>
  <div style="padding: 2rem; font-family: system-ui;">
    <h1>KleoQuote</h1>
    <p>Générateur de devis Kleonix</p>

    <hr style="margin: 2rem 0;" />

    <h2>Test de persistance Pinia</h2>
    <p>Devis en cours : {{ quoteStore.current.id }}</p>
    <p>Numéro : {{ quoteStore.current.number || '(vide)' }}</p>
    <p>Entreprise : {{ companyStore.settings.name }}</p>

    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
      <button @click="quoteStore.current.number = `DEV-${Date.now()}`">
        Changer le numéro
      </button>
      <button @click="quoteStore.reset()">Réinitialiser le devis</button>
    </div>
    <p style="margin-top: 1rem; font-size: 0.85rem; color: #666;">
      Cliquez sur « Changer le numéro », puis rechargez la page (F5) : le numéro doit rester affiché.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useQuoteStore } from '~/stores/quote'
import { useCompanyStore } from '~/stores/company'

const quoteStore = useQuoteStore()
const companyStore = useCompanyStore()
</script>