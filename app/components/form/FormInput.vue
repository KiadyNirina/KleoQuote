<!-- app/components/form/FormInput.vue -->
<template>
  <input
    :id="id"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
           focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500
           disabled:bg-slate-50"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    modelValue?: string | number
    type?: string
    placeholder?: string
  }>(),
  { type: 'text' }
)

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>