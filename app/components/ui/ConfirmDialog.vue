<!-- app/components/ui/ConfirmDialog.vue -->
<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    @click.self="onCancel"
  >
    <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6">
      <h3 class="text-base font-semibold text-slate-900 mb-2">{{ title }}</h3>
      <p class="text-sm text-slate-600 mb-6">{{ message }}</p>
      <div class="flex items-center justify-end gap-2">
        <button
          type="button"
          class="px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          @click="onCancel"
        >
          {{ cancelLabel }}
        </button>
        <button
          type="button"
          class="px-3 py-2 rounded-lg text-white text-sm transition-colors"
          :class="destructive ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800'"
          @click="onConfirm"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
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

function onConfirm() {
  emit('confirm')
}

function onCancel() {
  emit('cancel')
}
</script>