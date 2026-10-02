<script setup>

    import { computed, onMounted, ref } from 'vue'
    import OrderFilter from '../OrderFilter.vue'
    import OrderCard from '../OrderCard.vue'
    import { fetchOrders, updateOrderStatus } from '../../services/OrderService.js'

    const orders = ref([])
    const isLoading = ref(true)
    const errorMessage = ref('')
    const selectedOrderType = ref('all')
    const selectedOrderStatus = ref('all')

    const orderTypeOptions = [
        { label: 'Todos', value: 'all' },
        { label: 'Para llevar', value: 'TAKEAWAY' },
        { label: 'En sala', value: 'DINE IN' },
        { label: 'A domicilio', value: 'DELIVERY' },
    ]

    const orderStatusOptions = [
        { label: 'Todos', value: 'all' },
        { label: 'Listos', value: 'COMPLETED' },
        { label: 'Cancelados', value: 'CANCELED' },
    ]

    async function loadOrders() {
        isLoading.value = true
        errorMessage.value = ''

        try {
            orders.value = await fetchOrders()
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
                ['COMPLETED', 'CANCELED'].includes(order.statusName)
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
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    )

</script>