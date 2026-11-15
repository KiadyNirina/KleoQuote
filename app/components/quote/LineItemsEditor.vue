<!-- app/components/quote/LineItemsEditor.vue -->
<template>
  <div class="space-y-3">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="rounded-lg border border-slate-200 bg-white p-4 space-y-3"
    >
      <div class="flex items-start gap-3">
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField label="Nom de la prestation" :required="true">
            <FormInput
              :model-value="item.name"
              @update:model-value="update(index, { name: $event })"
            />
          </FormField>
          <FormField label="Description">
            <FormInput
              :model-value="item.description"
              @update:model-value="update(index, { description: $event })"
            />
          </FormField>
        </div>
        <button
          type="button"
          class="mt-6 p-2 rounded-md text-red-600 hover:bg-red-50"
          title="Supprimer la ligne"
          @click="remove(index)"
        >
          ✕
        </button>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <FormField label="Quantité">
          <FormInput
            type="number"
            :model-value="item.quantity"
            @update:model-value="update(index, { quantity: Number($event) })"
          />
        </FormField>
        <FormField label="Prix unitaire">
          <FormInput
            type="number"
            :model-value="item.unitPrice"
            @update:model-value="update(index, { unitPrice: Number($event) })"
          />
        </FormField>
        <FormField label="Total ligne">
          <div class="px-3 py-2 text-sm bg-slate-50 rounded-md border border-slate-200 text-right font-medium">
            {{ formatMoney(lineTotal(item), currency) }}
          </div>
        </FormField>
      </div>
    </div>

    <button
      type="button"
      class="w-full rounded-md border border-dashed border-slate-300 py-2 text-sm text-slate-600 hover:bg-slate-50"
      @click="addItem"
    >
      + Ajouter une prestation
    </button>
  </div>
</template>

<script setup lang="ts">
import type { LineItem, Currency } from '#shared/types/quote'
import { useQuoteCalculations } from '~/composables/useQuoteCalculations'
import { formatMoney } from '~/utils/format'

const props = defineProps<{
  items: LineItem[]
  currency: Currency
}>()

const emit = defineEmits<{ 'update:items': [items: LineItem[]] }>()

const { computeLineTotal } = useQuoteCalculations()
const lineTotal = (item: LineItem) => computeLineTotal(item)

function update(index: number, patch: Partial<LineItem>) {
  const current = props.items[index]
  if (!current) return
  const next = [...props.items]
  next[index] = Object.assign({}, current, patch)
  emit('update:items', next)
}

function remove(index: number) {
  const next = props.items.filter((_, i) => i !== index)
  emit('update:items', next)
}

function addItem() {
  const newItem: LineItem = {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
  }
  emit('update:items', [...props.items, newItem])
}
</script>