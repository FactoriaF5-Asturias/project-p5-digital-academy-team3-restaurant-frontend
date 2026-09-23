<script setup>
import { computed, ref } from 'vue'
import clockIcon from '../assets/clock.svg'
import chevronDownIcon from '../assets/chevron-down.svg'

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

const isStatusMenuOpen = ref(false)

const statusOptions = [
  { label: 'En proceso', value: 'ACCEPTED' },
  { label: 'Con retraso', value: 'DELAYED' },
  { label: 'Listo', value: 'COMPLETED' },
]

const currentStatusLabel = computed(() => {
  const currentStatus = statusOptions.find((option) => option.value === orderStatus.value)

  return currentStatus ? currentStatus.label : 'Cambiar estado'
})

const statusSelectClass = computed(() => ({
  'order-card__status-select--accepted': orderStatus.value === 'ACCEPTED',
  'order-card__status-select--delayed': orderStatus.value === 'DELAYED',
  'order-card__status-select--completed': orderStatus.value === 'COMPLETED',
}))

function updateStatus(status) {
  emit('update-status', props.order.id, status)
  isStatusMenuOpen.value = false
}
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

        <div class="order-card__status-dropdown">
        <button
          class="order-card__status-select"
          :class="statusSelectClass"
          type="button"
          @click="isStatusMenuOpen = !isStatusMenuOpen"
        >
          <span>{{ currentStatusLabel }}</span>
          <img
            :src="chevronDownIcon"
            alt=""
            class="order-card__status-arrow"
          />
        </button>

        <div
          v-if="isStatusMenuOpen"
          class="order-card__status-menu"
        >
          <button
            v-for="option in statusOptions"
            :key="option.value"
            class="order-card__status-option"
            type="button"
            @click="updateStatus(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
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
    flex
    flex-col
    w-full
    max-w-96
    min-h-[20rem]
    md:max-w-80
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
    max-h-32
    space-y-2
    overflow-y-auto
    pr-2;
}

.order-card__items::-webkit-scrollbar {
  width: 6px;
}

.order-card__items::-webkit-scrollbar-track {
  background: transparent;
}

.order-card__items::-webkit-scrollbar-thumb {
  @apply 
    rounded-full
    bg-border-default;
}

.order-card__items::-webkit-scrollbar-thumb:hover {
  @apply 
    bg-border-brand;
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
    mt-auto
    border-t
    border-border-default
    pt-2;
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
    flex
    items-center
    justify-between
    h-10
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
    mt-auto
    flex
    gap-3
    border-t
    border-border-default
    pt-4
    xl:gap-4
    xl:pt-6;
}

.order-card__button {
  @apply
    flex
    h-9
    flex-1
    cursor-pointer
    items-center
    justify-center
    rounded-xl
    px-3
    text-sm
    font-semibold
    leading-none
    xl:h-10
    xl:px-4
    xl:text-base;
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

.order-card__status-dropdown {
  @apply 
    relative;
}

.order-card__status-menu {
  @apply 
    absolute
    left-0
    top-full
    z-10
    mt-1
    w-full
    rounded-md 
    border 
    border-border-default 
    bg-bg-container 
    shadow-md;
}

.order-card__status-option {
  @apply 
    w-full 
    px-3 
    py-2 
    text-left 
    text-sm 
    text-text-default 
    hover:bg-bg-surface;
}

.order-card__status-select--accepted {
  @apply 
    border-border-default 
    bg-bg-input 
    text-text-default;
}

.order-card__status-select--delayed {
  @apply 
  border-border-brand 
  bg-bg-error 
  text-text-brand;
}

.order-card__status-select--completed {
  @apply 
  border-bg-special 
  bg-bg-container-high 
  text-text-special;
}

.order-card__status-arrow {
  @apply 
  h-4 
  w-4 
  shrink-0 
  text-text-muted;
}

</style>