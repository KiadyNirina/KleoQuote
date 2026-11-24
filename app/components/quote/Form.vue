<!-- app/components/quote/QuoteForm.vue -->
<template>
  <form class="space-y-6" @submit.prevent>
    <!-- 01. En-tête du document -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            01
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">
              {{ isInvoice ? 'Informations de la facture' : 'Informations du devis' }}
            </h2>
            <p class="text-xs text-stone-500">Référence, dates clés et devise de facturation.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          MÉTADONNÉES
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField :label="isInvoice ? 'Numéro de facture' : 'Numéro de devis'" :required="true">
          <FormInput v-model="quote.number" :placeholder="isInvoice ? 'ex : FAC-2026-001' : 'ex : DEV-2026-001'" />
        </FormField>
        <FormField label="Date de création" :required="true">
          <FormInput v-model="quote.createdAt" type="date" />
        </FormField>
        <FormField v-if="!isInvoice" label="Valide jusqu'au" :required="true">
          <FormInput v-model="quote.validUntil" type="date" />
        </FormField>
        <FormField v-else label="Échéance de paiement" :required="true">
          <FormInput v-model="quote.dueDate" type="date" />
        </FormField>
        <FormField v-if="isInvoice" label="Statut">
          <FormSelect v-model="quote.status" :options="statusOptions" />
        </FormField>
        <FormField label="Délai de réalisation">
          <FormInput v-model="quote.deliveryDelay" placeholder="ex : 3 semaines" />
        </FormField>
        <FormField label="Devise">
          <FormSelect v-model="quote.currency" :options="currencyOptions" />
        </FormField>
      </div>
    </section>

    <!-- 02. Client -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            02
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">Destinataire</h2>
            <p class="text-xs text-stone-500">Coordonnées de l'entreprise ou du contact client.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          CLIENT
        </span>
      </div>

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
        <div class="md:col-span-2">
          <FormField label="Adresse complète" :required="true">
            <FormInput v-model="quote.client.address" placeholder="ex : 12 rue de l'Indépendance, Antananarivo" />
          </FormField>
        </div>
      </div>
    </section>

    <!-- 03. Objet & description -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            03
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">
              {{ isInvoice ? 'Objet de la facture' : 'Objet du devis' }}
            </h2>
            <p class="text-xs text-stone-500">Intitulé principal et contexte de la mission.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          PROJET
        </span>
      </div>

      <div class="space-y-4">
        <FormField label="Titre" :required="true">
          <FormInput v-model="quote.title" placeholder="ex : Refonte du site vitrine" />
        </FormField>
        <FormField label="Description générale">
          <FormTextarea
            v-model="quote.description"
            :rows="3"
            placeholder="ex : Refonte complète du site avec nouveau design, intégration CMS et formation de l'équipe."
          />
        </FormField>
      </div>
    </section>

    <!-- 04. Prestations -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-amber-300 text-stone-950 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            04
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">Prestations & chiffrage</h2>
            <p class="text-xs text-stone-500">Ajoutez vos lignes de produits, services ou forfaits.</p>
          </div>
        </div>
        <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
          {{ quote.items.length }} {{ quote.items.length > 1 ? 'lignes' : 'ligne' }}
        </span>
      </div>

      <QuoteLineItemsEditor
        :items="quote.items"
        :currency="quote.currency"
        @update:items="quote.items = $event"
      />
    </section>

    <!-- 05. Financier -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            05
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">Réductions, taxes & acompte</h2>
            <p class="text-xs text-stone-500">Ajustements financiers et modalités de règlement.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          FINANCES
        </span>
      </div>

      <div class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70">
            <FormField label="Remise commerciale">
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
          </div>

          <div class="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70">
            <FormField label="Acompte demandé">
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
        </div>

        <!-- Bloc Taxes -->
        <div class="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-stone-700">Taxes applicables</span>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              @click="addTax"
            >
              <span class="text-amber-400 font-bold">+</span>
              <span>Ajouter une taxe</span>
            </button>
          </div>

          <div v-if="quote.taxes.length === 0" class="text-xs text-stone-500 py-1">
            Aucune taxe configurée (ex : TVA 20 %).
          </div>

          <div class="space-y-2">
            <div v-for="(tax, i) in quote.taxes" :key="tax.id" class="flex items-center gap-2">
              <div class="flex-1">
                <FormInput
                  :model-value="tax.label"
                  placeholder="Libellé (ex : TVA 20%)"
                  @update:model-value="updateTax(i, { label: $event })"
                />
              </div>
              <div class="w-28">
                <FormInput
                  type="number"
                  :model-value="tax.rate"
                  placeholder="Taux %"
                  @update:model-value="updateTax(i, { rate: Number($event) })"
                />
              </div>
              <button
                type="button"
                aria-label="Supprimer cette taxe"
                class="w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                @click="removeTax(i)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <FormField label="Conditions de paiement">
          <FormInput v-model="quote.paymentTerms" placeholder="ex : 30 % à la commande, solde à la livraison" />
        </FormField>
      </div>
    </section>

    <!-- 06. Conditions -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            06
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">
              {{ isInvoice ? 'Clauses & mentions' : 'Conditions du devis' }}
            </h2>
            <p class="text-xs text-stone-500">Périmètre inclus, exclusions et remarques complémentaires.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          CLAUSES
        </span>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

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
      </div>
    </section>

    <!-- 07. Bon pour accord -->
    <section v-if="quote.signature" class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            07
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">Bon pour accord</h2>
            <p class="text-xs text-stone-500">Informations de signature pour l'acceptation du document.</p>
          </div>
        </div>
        <label class="flex items-center gap-2 cursor-pointer mt-1">
          <input 
            type="checkbox" 
            v-model="quote.signature.show" 
            class="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
          />
          <span class="text-sm font-medium text-stone-700">Afficher dans le PDF</span>
        </label>
      </div>

      <div v-if="quote.signature.show" class="space-y-6">
        <!-- Émetteur -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Émetteur</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Date de signature émetteur">
              <FormInput 
                v-model="quote.signature.issuerSignedAt" 
                type="date" 
              />
            </FormField>
          </div>
          <p class="text-xs text-stone-500 mt-2">
            La signature et le cachet de l'émetteur sont configurés dans les <NuxtLink to="/settings" class="underline hover:text-stone-800">paramètres de l'entreprise</NuxtLink>.
          </p>
        </div>

        <!-- Client -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Client</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Nom du signataire (Client)">
              <FormInput 
                v-model="quote.signature.signerName" 
                placeholder="ex : Jean Rakoto" 
              />
            </FormField>
            <FormField label="Date de signature (Client)">
              <FormInput 
                v-model="quote.signature.signedAt" 
                type="date" 
              />
            </FormField>
            <FormField label="Lieu de signature">
              <FormInput 
                v-model="quote.signature.location" 
                placeholder="ex : Antananarivo" 
              />
            </FormField>
            
            <FormField label="Preuve d'acceptation">
              <FormSelect 
                v-model="signatureProofType" 
                :options="[
                  { value: 'none', label: 'Aucune (lignes vides)' },
                  { value: 'signature', label: 'Signature (image)' },
                  { value: 'stamp', label: 'Cachet (image)' }
                ]"
                @update:model-value="onProofTypeChange"
              />
            </FormField>
          </div>
          
          <!-- Upload conditionnel -->
          <div v-if="signatureProofType === 'signature'" class="mt-4">
            <FormField label="Signature du client (image)">
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                class="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-stone-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-stone-800"
                @change="onClientSignatureUpload"
              />
              <div v-if="quote.signature?.clientSignatureDataUrl" class="mt-2">
                <img :src="quote.signature.clientSignatureDataUrl" alt="Signature" class="max-h-16 object-contain" />
                <button type="button" class="text-xs text-red-600 mt-1 hover:underline" @click="quote.signature.clientSignatureDataUrl = undefined">Supprimer</button>
              </div>
            </FormField>
          </div>
          
          <div v-if="signatureProofType === 'stamp'" class="mt-4">
            <FormField label="Cachet du client (image)">
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                class="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-stone-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-stone-800"
                @change="onClientStampUpload"
              />
              <div v-if="quote.signature?.clientStampDataUrl" class="mt-2">
                <img :src="quote.signature.clientStampDataUrl" alt="Cachet" class="max-h-16 object-contain" />
                <button type="button" class="text-xs text-red-600 mt-1 hover:underline" @click="quote.signature.clientStampDataUrl = undefined">Supprimer</button>
              </div>
            </FormField>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-stone-500">
        Le bloc de signature ne sera pas inclus dans le PDF.
      </p>
    </section>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuoteStore } from '~/stores/quote'

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

const isInvoice = computed(() => quote.value.type === 'invoice')
const statusOptions = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'sent', label: 'Envoyée' },
  { value: 'paid', label: 'Payée' },
  { value: 'overdue', label: 'En retard' },
  { value: 'cancelled', label: 'Annulée' },
]

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

// Date émetteur par défaut = date de création
onMounted(() => {
  if (quote.value.signature && !quote.value.signature.issuerSignedAt && quote.value.createdAt) {
    quote.value.signature.issuerSignedAt = quote.value.createdAt
  }
})

watch(() => quote.value.createdAt, (newVal) => {
  if (quote.value.signature && !quote.value.signature.issuerSignedAt) {
    quote.value.signature.issuerSignedAt = newVal
  }
})

// État local pour piloter le select
const signatureProofType = ref<'none' | 'signature' | 'stamp'>('none')

// Initialisation depuis l'état du store
function syncProofTypeFromStore() {
  if (!quote.value.signature) return
  if (quote.value.signature.clientSignatureDataUrl) signatureProofType.value = 'signature'
  else if (quote.value.signature.clientStampDataUrl) signatureProofType.value = 'stamp'
  else signatureProofType.value = 'none'
}

onMounted(syncProofTypeFromStore)

watch(
  () => quote.value.id,
  () => syncProofTypeFromStore()
)

function onProofTypeChange(value: string) {
  if (!quote.value.signature) return
  if (value === 'none') {
    quote.value.signature.clientSignatureDataUrl = undefined
    quote.value.signature.clientStampDataUrl = undefined
  } else if (value === 'signature') {
    quote.value.signature.clientStampDataUrl = undefined
  } else if (value === 'stamp') {
    quote.value.signature.clientSignatureDataUrl = undefined
  }
}

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

async function onClientSignatureUpload(event: Event) {
  if (!quote.value.signature) return
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  quote.value.signature.clientSignatureDataUrl = await resizeImage(file, 400)
  input.value = ''
}

async function onClientStampUpload(event: Event) {
  if (!quote.value.signature) return
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  quote.value.signature.clientStampDataUrl = await resizeImage(file, 300)
  input.value = ''
}

function resizeImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * ratio)
        canvas.height = Math.round(img.height * ratio)
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Canvas non disponible'))
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85))
      }
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
</script>