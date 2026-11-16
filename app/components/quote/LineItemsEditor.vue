<!-- app/components/quote/LineItemsEditor.vue -->
<template>
  <div class="space-y-3">
    <VueDraggable
      v-model="localItems"
      :animation="150"
      handle=".drag-handle"
      class="space-y-3"
    >
      <div
        v-for="(item, index) in localItems"
        :key="item.id"
        class="rounded-lg border border-slate-200 bg-white p-4 space-y-3"
      >
        <div class="flex items-start gap-3">
          <!-- Poignée de drag -->
          <button
            type="button"
            class="drag-handle mt-6 p-2 text-slate-400 hover:text-slate-700 cursor-grab active:cursor-grabbing"
            title="Déplacer"
          >
            ⋮⋮
          </button>

          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField label="Nom de la prestation" :required="true">
              <FormInput
                :model-value="item.name"
                placeholder="ex : Développement page d'accueil"
                @update:model-value="update(index, { name: $event })"
              />
            </FormField>
            <FormField label="Description">
              <FormInput
                :model-value="item.description"
                placeholder="ex : Intégration responsive avec animation"
                @update:model-value="update(index, { description: $event })"
              />
            </FormField>
          </div>

          <!-- Bouton supprimer (on garde la colonne) -->
          <button
            type="button"
            class="mt-6 p-2 rounded-md text-red-600 hover:bg-red-50"
            title="Supprimer la ligne"
            @click="remove(index)"
          >
            ✕
          </button>
        </div>

        <!-- Le reste de vos champs (quantité, prix, total) reste inchangé -->
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
    </VueDraggable>

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
import { VueDraggable } from 'vue-draggable-plus'
import { ref, watch } from 'vue'
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

const localItems = ref<LineItem[]>([...props.items])

// Parent -> Enfant : uniquement si la valeur a réellement changé
watch(
  () => props.items,
  (v) => {
    // Comparaison par référence de tableau et par ids
    if (v.length === localItems.value.length && v.every((it, i) => it.id === localItems.value[i]?.id)) return
    localItems.value = [...v]
  },
  { deep: true }
)

// Enfant -> Parent : uniquement si l'ordre ou le contenu a changé
watch(
  localItems,
  (v) => {
    const same =
      v.length === props.items.length &&
      v.every((it, i) => it.id === props.items[i]?.id && it === props.items[i])
    if (same) return
    emit('update:items', [...v])
  },
  { deep: true }
)

function update(index: number, patch: Partial<LineItem>) {
  const current = localItems.value[index]
  if (!current) return
  Object.assign(current, patch)
}

function remove(index: number) {
  localItems.value = localItems.value.filter((_, i) => i !== index)
}

function addItem() {
  const newItem: LineItem = {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
  }
  localItems.value = [...localItems.value, newItem]
}
</script>