<script setup>
import { ref } from 'vue'
import OrderFilter from '../components/OrderFilter.vue'
import KitchenHeader from '../components/KitchenHeader.vue'
import KitchenSidebar from '../components/KitchenSidebar.vue'

const orderSummary = {
  newOrders: 12,
  inProgressOrders: 5,
  readyOrders: 8,
}

const selectedOrderType = ref('all')
const selectedOrderStatus = ref('all')

const orderTypeOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Para Llevar', value: 'takeaway' },
  { label: 'En Sala', value: 'dine-in' },
  { label: 'Envío a Domicilio', value: 'delivery' },
]

const orderStatusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Nuevos', value: 'new' },
  { label: 'En proceso', value: 'in-progress' },
  { label: 'Con retraso', value: 'delayed' },
  { label: 'Listo', value: 'ready' },
]
</script>

<template>
  <div class="kitchen-dashboard">
    <KitchenSidebar />

    <main class="kitchen-dashboard__main">
      <KitchenHeader :summary="orderSummary" />

      <div class="kitchen-dashboard__content">
        <section class="kitchen-dashboard__top-row">
          <h1 class="kitchen-dashboard__title">
            Cola de<br />
            Preparación
          </h1>

          <OrderFilter
            v-model="selectedOrderType"
            label="Filtrar"
            label-second-line="por tipo:"
            :options="orderTypeOptions"
            variant="primary"
          />
        </section>

        <section class="kitchen-dashboard__status-row">
          <OrderFilter
            v-model="selectedOrderStatus"
            label="Filtrar"
            label-second-line="por estado:"
            :options="orderStatusOptions"
            variant="secondary"
          />
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "../main.css";

.kitchen-dashboard {
  @apply min-h-screen;
}

.kitchen-dashboard__main {
  @apply min-h-screen pl-56;
}

.kitchen-dashboard__content {
  @apply px-7 py-5;
}

.kitchen-dashboard__top-row {
  @apply mb-8 flex items-center gap-12;
}

.kitchen-dashboard__title {
  @apply text-3xl font-bold leading-tight text-text-default;
}

.kitchen-dashboard__status-row {
  @apply flex items-center;
}
</style>