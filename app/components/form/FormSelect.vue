<!-- app/components/form/FormSelect.vue -->
<template>
  <select
    :id="id"
    :value="modelValue"
    class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
           focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  modelValue?: string
  options: { value: string; label: string }[]
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>