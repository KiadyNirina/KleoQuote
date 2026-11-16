<!-- app/components/quote/QuoteForm.vue -->
<template>
  <form class="space-y-6" @submit.prevent>
    <!-- En-tête -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">En-tête du devis</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Numéro de devis" :required="true">
          <FormInput v-model="quote.number" placeholder="ex : DEV-2026-001" />
        </FormField>
        <FormField label="Date de création" :required="true">
          <FormInput v-model="quote.createdAt" type="date" />
        </FormField>
        <FormField label="Valide jusqu'au" :required="true">
          <FormInput v-model="quote.validUntil" type="date" />
        </FormField>
        <FormField label="Délai de réalisation">
          <FormInput v-model="quote.deliveryDelay" placeholder="ex : 3 semaines" />
        </FormField>
        <FormField label="Devise">
          <FormSelect v-model="quote.currency" :options="currencyOptions" />
        </FormField>
      </div>
    </section>

    <!-- Client -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Client</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Société" :required="true">
          <FormInput v-model="quote.client.company" placeholder="ex : ACME SARL" />
        </FormField>
        <FormField label="Contact" :required="true">
          <FormInput v-model="quote.client.contactName" placeholder="ex : Jean Rakoto" />
        </FormField>
        <FormField label="Email" :required="true">
          <FormInput v-model="quote.client.email" type="email" placeholder="ex : contact@acme.mg" />
        </FormField>
        <FormField label="Téléphone">
          <FormInput v-model="quote.client.phone" placeholder="ex : +261 34 00 000 00" />
        </FormField>
        <FormField label="Adresse" :required="true">
          <FormInput v-model="quote.client.address" placeholder="ex : 12 rue de l'Indépendance, Antananarivo" />
        </FormField>
      </div>
    </section>

    <!-- Objet & description -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Objet du devis</h2>
      <FormField label="Titre" :required="true">
        <FormInput v-model="quote.title" placeholder="ex : Refonte du site vitrine" />
      </FormField>
      <FormField label="Description générale">
        <FormTextarea
          v-model="quote.description"
          :rows="4"
          placeholder="ex : Refonte complète du site avec nouveau design, intégration CMS et formation de l'équipe."
        />
      </FormField>
    </section>

    <!-- Prestations -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Prestations</h2>
      <QuoteLineItemsEditor
        :items="quote.items"
        :currency="quote.currency"
        @update:items="quote.items = $event"
      />
    </section>

    <!-- Financier -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Réductions, taxes et acompte</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Remise">
          <div class="flex gap-2">
            <FormSelect
              :model-value="discountType"
              :options="[
                { value: 'none', label: 'Aucune' },
                { value: 'percentage', label: 'Pourcentage (%)' },
                { value: 'fixed', label: 'Montant fixe' },
              ]"
              @update:model-value="onDiscountTypeChange"
            />
            <FormInput
              v-if="discountType !== 'none'"
              type="number"
              :model-value="quote.discount?.value ?? 0"
              @update:model-value="quote.discount = { type: discountType as 'percentage' | 'fixed', value: Number($event) }"
            />
          </div>
        </FormField>

        <FormField label="Acompte">
          <div class="flex gap-2">
            <FormSelect
              :model-value="depositType"
              :options="[
                { value: 'none', label: 'Aucun' },
                { value: 'percentage', label: 'Pourcentage (%)' },
                { value: 'fixed', label: 'Montant fixe' },
              ]"
              @update:model-value="onDepositTypeChange"
            />
            <FormInput
              v-if="depositType !== 'none'"
              type="number"
              :model-value="quote.deposit?.value ?? 0"
              @update:model-value="quote.deposit = { type: depositType as 'percentage' | 'fixed', value: Number($event) }"
            />
          </div>
        </FormField>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-slate-700">Taxes</span>
          <button
            type="button"
            class="text-sm text-slate-600 hover:underline"
            @click="addTax"
          >
            + Ajouter une taxe
          </button>
        </div>
        <div v-if="quote.taxes.length === 0" class="text-sm text-slate-500">
          Aucune taxe configurée.
        </div>
        <div v-for="(tax, i) in quote.taxes" :key="tax.id" class="flex gap-2 mb-2">
          <FormInput
            :model-value="tax.label"
            placeholder="Libellé (ex : TVA 20%)"
            @update:model-value="updateTax(i, { label: $event })"
          />
          <FormInput
            type="number"
            :model-value="tax.rate"
            placeholder="Taux %"
            @update:model-value="updateTax(i, { rate: Number($event) })"
          />
          <button
            type="button"
            class="px-2 text-red-600 hover:bg-red-50 rounded-md"
            @click="removeTax(i)"
          >
            ✕
          </button>
        </div>
      </div>

      <FormField label="Conditions de paiement">
        <FormInput v-model="quote.paymentTerms" placeholder="ex : 30 % à la commande, solde à la livraison" />
      </FormField>
    </section>

    <!-- Conditions -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Conditions du devis</h2>
      <FormField label="Prestations incluses (une par ligne)">
        <FormTextarea
          :model-value="quote.conditions.included.join('\n')"
          :rows="3"
          placeholder="ex :&#10;Design responsive&#10;Intégration CMS&#10;Formation de 2 heures"
          @update:model-value="quote.conditions.included = splitLines($event)"
        />
      </FormField>
      <FormField label="Prestations non incluses (une par ligne)">
        <FormTextarea
          :model-value="quote.conditions.excluded.join('\n')"
          :rows="3"
          placeholder="ex :&#10;Hébergement&#10;Nom de domaine&#10;Maintenance mensuelle"
          @update:model-value="quote.conditions.excluded = splitLines($event)"
        />
      </FormField>
      <FormField label="Conditions de maintenance">
        <FormTextarea
          v-model="quote.conditions.maintenance"
          :rows="2"
          placeholder="ex : Maintenance corrective incluse 3 mois, puis 50 000 Ar/mois"
        />
      </FormField>
      <FormField label="Autres remarques">
        <FormTextarea
          v-model="quote.conditions.otherNotes"
          :rows="2"
          placeholder="ex : Tarifs valables sous réserve de disponibilité"
        />
      </FormField>
    </section>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuoteStore } from '~/stores/quote'
import { ref, watch } from 'vue'

const quoteStore = useQuoteStore()
const { current: quote } = storeToRefs(quoteStore)

const currencyOptions = [
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'USD', label: 'USD — Dollar US' },
  { value: 'MAD', label: 'MAD — Dirham marocain' },
  { value: 'GBP', label: 'GBP — Livre sterling' },
  { value: 'CHF', label: 'CHF — Franc suisse' },
  { value: 'MGA', label: 'MGA — Ariary malgache' },
]

const discountType = computed(() => quote.value.discount?.type ?? 'none')
const depositType = computed(() => quote.value.deposit?.type ?? 'none')

const includedText = ref<string>(quote.value.conditions.included.join('\n'))
const excludedText = ref<string>(quote.value.conditions.excluded.join('\n'))

// Synchronisation locale -> store
watch(includedText, (v) => {
  quote.value.conditions.included = splitLines(v)
})

watch(excludedText, (v) => {
  quote.value.conditions.excluded = splitLines(v)
})

// Synchronisation store -> local (utile si le store est réinitialisé ou restauré)
watch(
  () => quote.value.conditions.included,
  (v) => {
    const joined = v.join('\n')
    if (joined !== includedText.value) includedText.value = joined
  }
)

watch(
  () => quote.value.conditions.excluded,
  (v) => {
    const joined = v.join('\n')
    if (joined !== excludedText.value) excludedText.value = joined
  }
)

function onDiscountTypeChange(value: string) {
  if (value === 'none') quote.value.discount = undefined
  else quote.value.discount = { type: value as 'percentage' | 'fixed', value: 0 }
}

function onDepositTypeChange(value: string) {
  if (value === 'none') quote.value.deposit = undefined
  else quote.value.deposit = { type: value as 'percentage' | 'fixed', value: 0 }
}

function addTax() {
  quote.value.taxes.push({ id: crypto.randomUUID(), label: '', rate: 0 })
}

function updateTax(index: number, patch: Partial<{ label: string; rate: number }>) {
  const current = quote.value.taxes[index]
  if (!current) return
  const next = [...quote.value.taxes]
  next[index] = Object.assign({}, current, patch)
  quote.value.taxes = next
}

function removeTax(index: number) {
  quote.value.taxes = quote.value.taxes.filter((_, i) => i !== index)
}

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}
</script>