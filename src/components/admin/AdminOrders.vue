<script setup>

    import { computed, onMounted, ref } from 'vue'
    import OrderFilter from '../OrderFilter.vue'
    import OrderCard from '../OrderCard.vue'
    import { fetchOrders, updateOrderStatus, payOrder } from '../../services/OrderService.js'
    import { useAuth } from '../../composables/useAuth.js'

    const orders = ref([])
    const isLoading = ref(true)
    const errorMessage = ref('')
    const selectedOrderType = ref('all')
    const selectedOrderStatus = ref('all')

    const orderTypeOptions = [
        { label: 'Todos', value: 'all' },
        { label: 'Para llevar', value: 'TAKEAWAY' },
        { label: 'En sala', value: 'DINE IN' },
        { label: 'A domicilio', value: 'DELIVERY', hidden: true },
    ]

    const orderStatusOptions = [
        { label: 'Todos', value: 'all' },
        { label: 'Listos', value: 'COMPLETED' },
        { label: 'Cancelados', value: 'CANCELLED' },
    ]

    const { token } = useAuth()

    async function loadOrders() {
        isLoading.value = true
        errorMessage.value = ''

        try {
            orders.value = await fetchOrders(token.value)
        } catch (err) {
            errorMessage.value = err.message || `No se pudieron cargar los pedidos.`
        } finally {
            isLoading.value = false
        }
    }

    onMounted(loadOrders)

    const filteredOrders = computed(() => 
        orders.value
            .filter((order) => 
                ['COMPLETED', 'CANCELLED'].includes(order.statusName)
            )
            .filter((order) => {
                const matchesType =
                    selectedOrderType.value === 'all' ||
                    order.orderTypeName === selectedOrderType.value
                
                const matchesStatus =
                    selectedOrderStatus.value === 'all' ||
                    order.statusName === selectedOrderStatus.value
                
                return matchesType && matchesStatus
                
            })
            .sort((a, b) => {
                const getPriority = (order) => {
                    if (order.statusName === 'CANCELLED') return 3
                    if (order.paidAt) return 2

                    return 1
                }

                const priorityDifference = getPriority(a) - getPriority(b)

                if (priorityDifference !== 0) {
                    return priorityDifference
                }

                return new Date(b.createdAt) - new Date(a.createdAt)
            })
    )

    async function handlePayOrder(orderId) {
        const confirmed = window.confirm('¿Marcar este pedido como pagado? Esta acción generará una factura.')

        if (!confirmed) return

        try {
            await payOrder(orderId)
            await loadOrders()
        } catch (err) {
            errorMessage.value = err.message || 'No se pudo marcar el pedido como pagado.'
        }
    }

</script>

<template>
    <section class="admin-orders">
        <h1>Pedidos</h1>

        <div class="admin-orders__filters">
            <OrderFilter
                v-model="selectedOrderType"
                label="Filtrar por tipo:"
                :options="orderTypeOptions"
                variant="secondary"
            />

            <OrderFilter 
                v-model="selectedOrderStatus"
                label="Filtrar por estado:"
                :options="orderStatusOptions"
                variant="secondary"
            />
        </div>

        <p v-if="isLoading" class="admin-orders__message">
            Cargando pedidos...
        </p>
        <p v-else-if="errorMessage" class="admin-orders__message">
            {{ errorMessage }}
        </p>
        <p v-else-if="filteredOrders.length === 0" class="admin-orders__message">
            No hay pedidos.
        </p>

        <section v-else class="admin-orders__list">
            <OrderCard
                v-for="order in filteredOrders"
                :key="order.id"
                :order="order"
                show-payment-action
                @update-status="handleUpdateStatus"
                @pay="handlePayOrder"
            />
        </section>
    </section>
</template>

<style scoped>
@reference '../../main.css';

.admin-orders {
    @apply
    mx-auto w-full max-w-6xl;
}

.admin-orders h1 {
    @apply
    mb-6 font-display text-3xl
    font-bold text-text-default md:text-4xl;
}

.admin-orders__filters {
    @apply
    mb-6 flex flex-col gap-4;
}

.admin-orders__list {
    @apply
    grid grid-cols-1 justify-items-center
    gap-4 md:grid-cols-2 xl:grid-cols-3
}

.admin-orders__message {
    @apply
    mt-8 text-sm text-text-muted;
}
</style>