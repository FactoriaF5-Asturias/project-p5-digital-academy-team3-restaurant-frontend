<script setup>
import clockIcon from '../assets/clock.svg';

defineProps({
  order: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="inter w-72 rounded-lg border-l-4 border-card-red bg-white p-4 shadow-md">
    <header class="mb-4 flex items-start justify-between gap-4">
        <h2 class="text-lg font-bold text-stone-900">
          Pedido #{{ order.id }}
        </h2>

        <div class="flex flex-col items-end">
            <div class="rounded-md bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-700">
                {{ order.type }}
            </div>

            <div class="mt-1 flex items-center justify-end gap-1 text-xs text-stone-500">
                <img
                    :src="clockIcon"
                    alt=""
                    class="h-3 w-3"
                />

                <span>{{ order.time }}</span>
            </div>
        </div>
    </header>

    <div class="mb-5 border-t border-card-soft"></div>

    <ul class="space-y-3">
      <li
        v-for="item in order.items"
        :key="item.name"
        class="flex items-start gap-3"
      >
        <span class="flex h-7 min-w-8 shrink-0 items-center justify-center rounded bg-soft-red px-2 text-sm font-semibold text-brand-red">
          {{ item.quantity }}x
        </span>

        <div>
          <p class="text-sm font-medium text-stone-900">
            {{ item.name }}
          </p>
        </div>
      </li>
    </ul>

    <div
        v-if="order.status !== 'Nuevo'"
        class="mt-4 border-t border-card-soft pt-3"
        >
        <label class="mb-1 block text-[10px] text-stone-500">
            Cambiar Estado:
        </label>

        <select
            class="w-full rounded-md border border-card-soft bg-stone-50 px-2 py-1 text-xs"
            :value="order.status"
        >
            <option>En proceso</option>
            <option>Listo</option>
        </select>
    </div>

    <div
      v-if="order.status === 'Nuevo'"
      class="mt-4 flex gap-3 border-t border-card-soft pt-4"
    >
      <button class="h-10 flex-1 rounded-xl border-1-5 border-brand-red px-4 py-2 text-xs font-semibold text-brand-red">
        Rechazar
      </button>

      <button class="h-10 flex-1 rounded-xl bg-brand-green px-4 py-2 text-xs font-semibold text-white">
        Aceptar
      </button>
    </div>
  </article>
</template>