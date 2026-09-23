<script setup>
import { computed, onMounted, ref } from 'vue'
import OrderFilter from '../components/OrderFilter.vue'
import KitchenHeader from '../components/KitchenHeader.vue'
import KitchenSidebar from '../components/KitchenSidebar.vue'
import { fetchOrders, updateOrderStatus } from '../services/OrderService'
import OrderCard from '../components/OrderCard.vue'

const orders = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

async function loadOrders() {
  try {
    isLoading.value = true
    errorMessage.value = ''
    orders.value = await fetchOrders()
  } catch {
    errorMessage.value = 'No se pudieron cargar los pedidos.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadOrders()
})

const orderSummary = computed(() => ({
  newOrders: orders.value.filter((order) => order.statusName === 'PENDING').length,
  inProgressOrders: orders.value.filter((order) =>
    ['ACCEPTED', 'IN PROGRESS', 'DELAYED'].includes(order.statusName)
  ).length,
  readyOrders: orders.value.filter((order) => order.statusName === 'COMPLETED').length,
}))

const selectedOrderType = ref('all')
const selectedOrderStatus = ref('all')

const orderTypeOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Para Llevar', value: 'TAKEAWAY' },
  { label: 'En Sala', value: 'DINE IN' },
  { label: 'Envío a Domicilio', value: 'DELIVERY' },
]

const orderStatusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Nuevos', value: 'PENDING' },
  { label: 'En proceso', value: 'ACCEPTED' },
  { label: 'Con retraso', value: 'DELAYED' },
  { label: 'Listo', value: 'COMPLETED' },
]

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesType =
      selectedOrderType.value === 'all' ||
      order.orderTypeName === selectedOrderType.value

    const matchesStatus =
      selectedOrderStatus.value === 'all' ||
      order.statusName === selectedOrderStatus.value

    return matchesType && matchesStatus
  })
      .sort((firstOrder, secondOrder) => {
        const statusPriority = {
          PENDING: 1,
          ACCEPTED: 2,
          DELAYED: 3,
          COMPLETED: 4,
          CANCELLED: 5,
        }

        const firstPriority = statusPriority[firstOrder.statusName] || 99
        const secondPriority = statusPriority[secondOrder.statusName] || 99

        if (firstPriority !== secondPriority) {
          return firstPriority - secondPriority
        }
        
        return new Date(secondOrder.createdAt) - new Date(firstOrder.createdAt)
      })
})

async function handleUpdateStatus(orderId, statusName) {
  try {
    await updateOrderStatus(orderId, statusName)
    await loadOrders()
  } catch {
    errorMessage.value = 'No se pudo actualizar el estado del pedido.'
  }
}

async function handleAcceptOrder(orderId) {
  await handleUpdateStatus(orderId, 'ACCEPTED')
}

async function handleRejectOrder(orderId) {
  await handleUpdateStatus(orderId, 'CANCELLED')
}
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

        <p
          v-if="isLoading"
          class="kitchen-dashboard__message"
        >
          Cargando pedidos...
        </p>

        <p
          v-else-if="errorMessage"
          class="kitchen-dashboard__message"
        >
          {{ errorMessage }}
        </p>

        <p
          v-else-if="filteredOrders.length === 0"
          class="kitchen-dashboard__message"
        >
          No hay pedidos.
        </p>

        <section
          v-else
          class="kitchen-dashboard__orders"
        >
          <OrderCard
            v-for="order in filteredOrders"
            :key="order.id"
            :order="order"
            @update-status="handleUpdateStatus"
            @accept="handleAcceptOrder"
            @reject="handleRejectOrder"
          />
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "../main.css";

.kitchen-dashboard {
  @apply flex min-h-screen flex-col md:block;
}

.kitchen-dashboard__main {
  @apply min-h-screen md:pl-56;
}

.kitchen-dashboard__content {
  @apply px-4 py-5 md:px-7;
}

.kitchen-dashboard__top-row {
  @apply mb-6 flex flex-col items-start gap-4 md:mb-8 md:flex-row md:items-center md:gap-12;
}

.kitchen-dashboard__title {
  @apply text-3xl font-bold leading-tight text-text-default;
}

.kitchen-dashboard__status-row {
  @apply flex items-center;
}

.kitchen-dashboard__message {
  @apply mt-8 text-sm text-text-muted;
}

.kitchen-dashboard__orders {
  @apply mt-6 grid grid-cols-1 justify-items-center gap-4 md:mt-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-6;
}
</style>
