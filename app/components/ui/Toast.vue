<!-- app/components/ui/Toast.vue -->
<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <TransitionGroup
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm shadow-lg"
          >
            <span class="text-emerald-400">✓</span>
            {{ toast.message }}
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const { toasts } = useToast()
</script>