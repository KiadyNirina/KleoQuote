<!-- app/components/company/SettingsForm.vue -->
<template>
  <form class="space-y-6" @submit.prevent>
    <!-- 01. Identité & visuels -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            01
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">Identité & visuels</h2>
            <p class="text-xs text-stone-500">Nom commercial, logo d'en-tête et cachet officiel.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          MARQUE
        </span>
      </div>

      <div class="space-y-6">
        <FormField label="Nom de l'entreprise" :required="true">
          <FormInput v-model="company.name" placeholder="ex : Kleonix" />
        </FormField>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Bloc Logo -->
          <div class="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-stone-700">Logo</span>
              <span class="font-mono text-[10px] text-stone-400">MAX 400PX</span>
            </div>

            <div class="flex items-center gap-4">
              <div
                v-if="company.logoDataUrl"
                class="w-20 h-20 rounded-xl border border-stone-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-2xs"
              >
                <img :src="company.logoDataUrl" alt="Logo" class="max-w-full max-h-full object-contain p-1" />
              </div>
              <div
                v-else
                class="w-20 h-20 rounded-xl border border-dashed border-stone-300 bg-white/70 flex items-center justify-center text-[11px] font-medium text-stone-400 shrink-0"
              >
                Aucun
              </div>

              <div class="flex flex-col items-start gap-2 min-w-0">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  class="hidden"
                  @change="onLogoChange"
                />
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-stone-800 hover:border-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  @click="fileInput?.click()"
                >
                  Choisir un fichier
                </button>
                <button
                  v-if="company.logoDataUrl"
                  type="button"
                  class="text-xs font-medium text-red-600 hover:text-red-700 hover:underline underline-offset-2 cursor-pointer"
                  @click="company.logoDataUrl = undefined"
                >
                  Supprimer le logo
                </button>
              </div>
            </div>

            <p class="text-[11px] text-stone-500 leading-relaxed">
              PNG, JPG ou SVG. Redimensionnement automatique.
            </p>
          </div>

          <!-- Bloc Cachet -->
          <div class="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-stone-700">Cachet de l'entreprise</span>
              <span class="font-mono text-[10px] text-stone-400">MAX 300PX</span>
            </div>

            <div class="flex items-center gap-4">
              <div
                v-if="company.stampDataUrl"
                class="w-20 h-20 rounded-xl border border-stone-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-2xs"
              >
                <img :src="company.stampDataUrl" alt="Cachet" class="max-w-full max-h-full object-contain p-1" />
              </div>
              <div
                v-else
                class="w-20 h-20 rounded-xl border border-dashed border-stone-300 bg-white/70 flex items-center justify-center text-[11px] font-medium text-stone-400 shrink-0"
              >
                Aucun
              </div>

              <div class="flex flex-col items-start gap-2 min-w-0">
                <input
                  ref="stampInput"
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  class="hidden"
                  @change="onStampChange"
                />
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-stone-800 hover:border-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  @click="stampInput?.click()"
                >
                  Choisir un fichier
                </button>
                <button
                  v-if="company.stampDataUrl"
                  type="button"
                  class="text-xs font-medium text-red-600 hover:text-red-700 hover:underline underline-offset-2 cursor-pointer"
                  @click="company.stampDataUrl = undefined"
                >
                  Supprimer le cachet
                </button>
              </div>
            </div>

            <p class="text-[11px] text-stone-500 leading-relaxed">
              Placé dans le bloc « Bon pour accord » du PDF (zone émetteur).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. Coordonnées -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            02
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">Coordonnées & devise</h2>
            <p class="text-xs text-stone-500">Adresse postale, canaux de contact et devise par défaut.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          CONTACT
        </span>
      </div>

      <div class="space-y-4">
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
      </div>
    </section>

    <!-- 03. Informations administratives -->
    <section class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-2xs transition-colors focus-within:border-stone-400">
      <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-amber-300 text-stone-950 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            03
          </span>
          <div>
            <h2 class="text-base font-bold text-stone-900">Informations administratives</h2>
            <p class="text-xs text-stone-500">Identifiants légaux et conditions générales pré-remplies.</p>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">
          LÉGAL
        </span>
      </div>

      <div class="space-y-4">
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
      </div>
    </section>

    <!-- Barre d'actions -->
    <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <button
        type="button"
        class="px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-700 hover:border-stone-900 hover:text-stone-900 transition-colors self-start cursor-pointer"
        @click="onReset"
      >
        Rétablir les valeurs par défaut
      </button>

      <div class="flex items-center justify-end gap-3">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <span
            v-if="toast"
            class="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 shadow-md"
          >
            <span class="text-amber-400 font-bold">✓</span>
            <span>{{ toast }}</span>
          </span>
        </Transition>

        <button
          type="button"
          class="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-stone-800 hover:-translate-y-0.5 transition-all cursor-pointer"
          @click="onSave"
        >
          Enregistrer
        </button>
      </div>
    </div>

    <!-- Dialog de confirmation (Reset) -->
    <UiConfirmDialog
      :open="showResetDialog"
      title="Rétablir les valeurs par défaut ?"
      message="Tous les paramètres actuels (logo, cachet, coordonnées, mentions légales) seront remplacés par les valeurs d'origine. Cette action est irréversible."
      confirm-label="Rétablir"
      :destructive="true"
      @confirm="confirmReset"
      @cancel="showResetDialog = false"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '~/stores/company'
import UiConfirmDialog from '~/components/ui/ConfirmDialog.vue'

const companyStore = useCompanyStore()
const { settings: company } = storeToRefs(companyStore)

const fileInput = ref<HTMLInputElement | null>(null)
const stampInput = ref<HTMLInputElement | null>(null)

// Toast
const toast = ref('')
function showToast(msg: string) {
  toast.value = msg
  setTimeout(() => { toast.value = '' }, 2500)
}

// Dialog de confirmation
const showResetDialog = ref(false)

const currencyOptions = [
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'USD', label: 'USD — Dollar US' },
  { value: 'MAD', label: 'MAD — Dirham marocain' },
  { value: 'GBP', label: 'GBP — Livre sterling' },
  { value: 'CHF', label: 'CHF — Franc suisse' },
  { value: 'MGA', label: 'MGA — Ariary malgache' },
]

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
  showToast('Paramètres enregistrés')
}

function onReset() {
  showResetDialog.value = true
}

function confirmReset() {
  companyStore.reset()
  showResetDialog.value = false
  showToast('Valeurs par défaut restaurées')
}
</script>