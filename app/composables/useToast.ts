// app/composables/useToast.ts
import { ref } from 'vue'

interface Toast {
  id: number
  message: string
}

// État au niveau module (partagé entre tous les appels)
const toasts = ref<Toast[]>([])
let counter = 0

export function useToast() {
  function show(message: string, duration = 2500) {
    const id = ++counter
    toasts.value.push({ id, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  return { toasts, show }
}