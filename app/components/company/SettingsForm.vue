<!-- app/components/company/SettingsForm.vue -->
<template>
  <form class="space-y-6" @submit.prevent>
    <!-- Identité -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Identité</h2>

      <FormField label="Nom de l'entreprise" :required="true">
        <FormInput v-model="company.name" placeholder="ex : Kleonix" />
      </FormField>

      <FormField label="Logo">
        <div class="flex items-center gap-4">
          <div
            v-if="company.logoDataUrl"
            class="w-20 h-20 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden"
          >
            <img :src="company.logoDataUrl" alt="Logo" class="max-w-full max-h-full object-contain" />
          </div>
          <div v-else class="w-20 h-20 rounded-md border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
            Aucun
          </div>
          <div class="flex flex-col gap-2">
            <input
              ref="fileInput"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              class="hidden"
              @change="onLogoChange"
            />
            <button
              type="button"
              class="px-3 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
              @click="fileInput?.click()"
            >
              Choisir un fichier
            </button>
            <button
              v-if="company.logoDataUrl"
              type="button"
              class="text-xs text-red-600 hover:underline text-left"
              @click="company.logoDataUrl = undefined"
            >
              Supprimer le logo
            </button>
          </div>
        </div>
        <p class="text-xs text-slate-500 mt-1">
          PNG, JPG ou SVG. L'image est redimensionnée automatiquement (max 400 px).
        </p>
      </FormField>

      <FormField label="Cachet de l'entreprise">
        <div class="flex items-center gap-4">
          <div
            v-if="company.stampDataUrl"
            class="w-20 h-20 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden"
          >
            <img :src="company.stampDataUrl" alt="Cachet" class="max-w-full max-h-full object-contain" />
          </div>
          <div v-else class="w-20 h-20 rounded-md border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
            Aucun
          </div>
          <div class="flex flex-col gap-2">
            <input
              ref="stampInput"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              class="hidden"
              @change="onStampChange"
            />
            <button
              type="button"
              class="px-3 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
              @click="stampInput?.click()"
            >
              Choisir un fichier
            </button>
            <button
              v-if="company.stampDataUrl"
              type="button"
              class="text-xs text-red-600 hover:underline text-left"
              @click="company.stampDataUrl = undefined"
            >
              Supprimer le cachet
            </button>
          </div>
        </div>
        <p class="text-xs text-slate-500 mt-1">
          Apparaîtra dans le bloc « Bon pour accord » du PDF, zone émetteur.
        </p>
      </FormField>
    </section>

    <!-- Coordonnées -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Coordonnées</h2>
      <FormField label="Adresse">
        <FormTextarea
          v-model="company.address"
          :rows="2"
          placeholder="ex : Lot II M 45 Bis, Antananarivo 101, Madagascar"
        />
      </FormField>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Email">
          <FormInput v-model="company.email" type="email" placeholder="ex : contact@kleonix.mg" />
        </FormField>
        <FormField label="Téléphone">
          <FormInput v-model="company.phone" placeholder="ex : +261 34 00 000 00" />
        </FormField>
        <FormField label="Site web">
          <FormInput v-model="company.website" placeholder="ex : https://kleonix.mg" />
        </FormField>
        <FormField label="Devise par défaut">
          <FormSelect v-model="company.defaultCurrency" :options="currencyOptions" />
        </FormField>
      </div>
    </section>

    <!-- Administratif -->
    <section class="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <h2 class="text-base font-semibold">Informations administratives</h2>
      <FormField label="Mentions légales (SIRET, TVA intracom, RCS…)">
        <FormTextarea
          v-model="company.legalInfo"
          :rows="3"
          placeholder="ex : NIF 1234567890 — STAT 98765 11 2024 0 12345"
        />
      </FormField>
      <FormField label="Conditions générales par défaut">
        <FormTextarea
          v-model="company.defaultTerms"
          :rows="6"
          placeholder="ex : Devis valable 30 jours. Acompte de 30 % à la commande. Solde à la livraison."
        />
      </FormField>
    </section>

    <!-- Actions -->
    <div class="flex items-center justify-between">
      <button
        type="button"
        class="px-3 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
        @click="onReset"
      >
        Rétablir les valeurs par défaut
      </button>
      <div class="flex items-center gap-3">
        <span v-if="savedMessage" class="text-xs text-green-600">{{ savedMessage }}</span>
        <button
          type="button"
          class="px-3 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800"
          @click="onSave"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '~/stores/company'
import type { CompanySettings } from '#shared/types/quote'

const companyStore = useCompanyStore()
const { settings: company } = storeToRefs(companyStore)

const draft = ref<CompanySettings>({ ...company.value })
watch(company, (v) => { draft.value = { ...v } }, { deep: true })

const fileInput = ref<HTMLInputElement | null>(null)
const savedMessage = ref('')

const currencyOptions = [
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'USD', label: 'USD — Dollar US' },
  { value: 'MAD', label: 'MAD — Dirham marocain' },
  { value: 'GBP', label: 'GBP — Livre sterling' },
  { value: 'CHF', label: 'CHF — Franc suisse' },
  { value: 'MGA', label: 'MGA — Ariary malgache' },
]

const stampInput = ref<HTMLInputElement | null>(null)

async function onStampChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const dataUrl = await resizeImage(file, 300)
  company.value.stampDataUrl = dataUrl
  input.value = ''
}

async function onLogoChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const dataUrl = await resizeImage(file, 400)
  company.value.logoDataUrl = dataUrl
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
        const w = Math.round(img.width * ratio)
        const h = Math.round(img.height * ratio)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Canvas non disponible'))
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85))
      }
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function onSave() {
  companyStore.update({ ...company.value })
  savedMessage.value = 'Enregistré'
  setTimeout(() => { savedMessage.value = '' }, 2000)
}

function onReset() {
  if (confirm('Rétablir les valeurs par défaut ? Les modifications seront perdues.')) {
    companyStore.reset()
  }
}
</script>