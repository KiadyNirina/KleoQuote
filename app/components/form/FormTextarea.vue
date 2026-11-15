<!-- app/components/form/FormTextarea.vue -->
<template>
  <textarea
    :id="id"
    :value="modelValue"
    :rows="rows"
    :placeholder="placeholder"
    class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
           focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    modelValue?: string
    rows?: number
    placeholder?: string
  }>(),
  { rows: 3 }
)

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>