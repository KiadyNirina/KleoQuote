<!-- app/components/ui/ConfirmDialog.vue -->
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/45 backdrop-blur-xs"
        @click.self="onCancel"
      >
        <div
          class="w-full max-w-md rounded-2xl bg-[#FAF9F6] shadow-2xl border border-stone-200/90 overflow-hidden transition-all"
        >
          <!-- Liseré supérieur d'accentuation -->
          <div
            class="h-1.5 w-full"
            :class="destructive ? 'bg-red-600' : 'bg-amber-400'"
            aria-hidden="true"
          />

          <div class="p-6">
            <div class="flex items-start gap-4">
              <!-- Icône contextuelle -->
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                :class="
                  destructive
                    ? 'bg-red-50 text-red-600 border-red-200/80'
                    : 'bg-amber-100/80 text-amber-900 border-amber-300/70'
                "
              >
                <svg
                  v-if="destructive"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>

              <!-- Contenu texte -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span
                    class="font-mono text-[10px] font-bold uppercase tracking-widest"
                    :class="destructive ? 'text-red-600' : 'text-amber-800'"
                  >
                    {{ destructive ? 'Action irréversible' : 'Validation requise' }}
                  </span>
                </div>
                <h3 :id="titleId" class="text-base font-bold text-stone-900 leading-snug">
                  {{ title }}
                </h3>
                <p class="mt-2 text-sm text-stone-600 leading-relaxed">
                  {{ message }}
                </p>
              </div>
            </div>

            <!-- Pied de boîte de dialogue -->
            <div class="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-end gap-2.5">
              <button
                type="button"
                class="px-4 py-2 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-700 hover:border-stone-900 hover:text-stone-900 transition-colors cursor-pointer"
                @click="onCancel"
              >
                {{ cancelLabel }}
              </button>
              <button
                type="button"
                class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
                :class="
                  destructive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                "
                @click="onConfirm"
              >
                {{ confirmLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    destructive?: boolean
  }>(),
  {
    title: 'Confirmation',
    confirmLabel: 'Confirmer',
    cancelLabel: 'Annuler',
    destructive: false,
  }
)

const emit = defineEmits<{ confirm: []; cancel: [] }>()

const titleId = `confirm-dialog-${Math.random().toString(36).slice(2, 9)}`

function onConfirm() {
  emit('confirm')
}

function onCancel() {
  emit('cancel')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) {
    onCancel()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>