<script setup>
import { computed } from 'vue'
import clockIcon from '../assets/clock.svg'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['accept', 'reject', 'update-status'])

const orderType = computed(() => {
  if (props.order.orderType) return props.order.orderType
  if (props.order.tabletId) return `Mesa ${props.order.tabletId}`

  return ''
})

const orderItems = computed(() => props.order.items || [])
const orderTime = computed(() => {
  if (!props.order.createdAt) return ''

  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(props.order.createdAt))
})
const orderStatus = computed(() => props.order.statusName)
const isNewOrder = computed(() => orderStatus.value === 'PENDING')
</script>

<template>
  <article class="order-card">
    <header class="order-card__header">
        <h2 class="order-card__title">
          Pedido #{{ order.id }}
        </h2>

        <div class="order-card__meta">
            <div class="order-card__type">
                {{ orderType }}
            </div>

            <div class="order-card__time">
                <img
                    :src="clockIcon"
                    alt=""
                    class="order-card__time-icon"
                />

                <span>{{ orderTime }}</span>
            </div>
        </div>
    </header>

    <div class="order-card__divider"></div>

    <ul class="order-card__items">
      <li
        v-for="item in orderItems"
        :key="item.id || item.productId"
        class="order-card__item"
      >
        <span class="order-card__quantity">
          {{ item.quantity }}x
        </span>

        <div>
          <p class="order-card__item-name">
            {{ item.productName }}
          </p>
        </div>
      </li>
    </ul>

    <div
        v-if="!isNewOrder"
        class="order-card__status"
        >
        <label class="order-card__status-label">
            Cambiar Estado:
        </label>

        <select
          class="order-card__status-select"
          :value="orderStatus"
          @change="emit('update-status', order.id, $event.target.value)"
        >
            <option value="ACCEPTED">En proceso</option>
            <option value="DELAYED">Con retraso</option>
            <option value="COMPLETED">Listo</option>
        </select>
    </div>

    <div
      v-if="isNewOrder"
      class="order-card__actions"
    >
      <button
        class="order-card__button order-card__button--reject"
        type="button"
        @click="emit('reject', order.id)"
      >
        Rechazar
      </button>

      <button
        class="order-card__button order-card__button--accept"
        type="button"
        @click="emit('accept', order.id)"
      >
        Aceptar
      </button>
    </div>
  </article>
</template>

<style scoped>
@reference "../main.css";

.order-card {
  @apply 
    w-72
    rounded-lg
    border-l-4 
    border-border-brand 
    bg-bg-container 
    p-6 
    shadow-md;
}

.order-card__header {
  @apply
    mb-3
    flex
    items-start
    justify-between
    gap-4;
}

.order-card__title {
  @apply
    text-xl
    font-bold
    text-text-default;
}

.order-card__meta {
  @apply 
    flex
    flex-col
    items-end;
}

.order-card__type {
  @apply
    text-base
    font-semibold
    text-text-muted;
}

.order-card__time {
  @apply
    flex
    items-center
    justify-end
    gap-1
    text-xs
    text-text-muted;
}

.order-card__time-icon {
  @apply
    h-3
    w-3;
}

.order-card__divider {
  @apply
    mb-3
    border-t
    border-border-default;
}

.order-card__items {
  @apply
    space-y-3;
}

.order-card__item {
  @apply
    flex
    items-start
    gap-3;
}

.order-card__quantity {
  @apply
    flex
    h-7
    min-w-8
    shrink-0
    items-center
    justify-center
    rounded-md
    bg-bg-error
    px-3
    py-1
    text-sm
    font-semibold
    text-text-error;
}

.order-card__item-name {
  @apply
    text-base
    font-medium
    text-text-default;
}

.order-card__status {
  @apply
    mt-6
    border-t
    border-border-default
    pt-6;
}

.order-card__status-label {
  @apply
    mb-1
    block
    text-xs
    text-text-muted;
}

.order-card__status-select {
  @apply
    w-full
    cursor-pointer
    rounded-md
    border
    border-border-default
    bg-bg-input
    px-3
    py-1
    text-xs
    text-text-default
    outline-none
    focus:border-border-strong
    focus:ring-1
    focus:ring-border-strong;
}

.order-card__actions {
  @apply
    mt-6
    flex
    gap-4
    border-t
    border-border-default
    pt-6;
}

.order-card__button {
  @apply
    flex
    h-10
    flex-1
    cursor-pointer
    items-center
    justify-center
    rounded-xl
    px-4
    text-base
    font-semibold
    leading-none;
}

.order-card__button--reject {
  @apply
    border-2
    border-border-brand
    text-text-brand
    hover:bg-bg-error;
}

.order-card__button--accept {
  @apply
    bg-bg-special
    text-text-on-special
    hover:bg-bg-special-hover;
}


</style>