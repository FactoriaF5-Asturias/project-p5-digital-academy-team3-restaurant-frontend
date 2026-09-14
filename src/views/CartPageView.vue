<script setup>

    import { ref, computed, onMounted } from 'vue'
    import { fetchCartItems } from '../services/CartService.js'
    import CartItemsSection from '../components/CartItemsSection.vue'

    // import the rest of the components. not needed now.

    const props = defineProps({
        shippingCost: {
            type: Number,
            default: 3.5
        }
    })

    const items = ref([])
    const isLoading = ref(true)
    const loadError = ref(null)
    const deliveryMethod = ref('delivery')

    async function loadItems() {
        isLoading.value = true
        loadError.value = null
        try {
            items.value = await fetchCartItems()
        } catch (err) {
            loadError.value = err
        } finally {
            isLoading.value = false
        }
    }

    onMounted(loadItems)

    function incrementQty(id) {
        const item = items.value.find((i) => iid === id)
        if (item) item.quantity++
    }

    function decrementQty(id) {
        const item = items.value.find((i) => i.id === id)
        if (item && item.quantity > 1) item.quantity--
    }

    function removeItem(id) {
        items.value = items.value.filter((item) => item.id !== id)
    }

    const subtotal = computed(() =>
        items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const shipping = computed(() =>
        deliveryMethod.value === 'delivery' ? props.shippingCost : 0
    )

    const total = computed(() => subtotal.value + shipping.value)

</script>

<template>
    <div class="cart-page">
        <div class="cart-page_layout">
            <p v-if="isLoading" class="cart-page_status">Cargando cesta...</p>

            <div v-else-if="loadError" class="cart-page_status">
                <p>No se pudo cargar tu cesta.</p>
                <button type="button" @click="loadItems">Reintentar</button>
            </div>

            <p v-else-if="items.length === 0" class="cart-page_status">Tu cesta está vacía</p>

            <CartItemsSection
                v-else
                :items="items"
                @increment="incrementQty"
                @decrement="decrementQty"
                @remove="removeItem"
                @continue-shopping="$router.push('/menu')"
            />
            
            <aside class="cart-page_summary">
                <p>Subtotal: {{ subtotal.toFixed(2) }}€</p>
                <p>Envío: {{ shipping.toFixed(2) }}€</p>
                <p>Total: {{ total.toFixed(2) }}€</p>
            </aside>
        </div>
    </div>
</template>

<style scoped>
@reference '../main.css';

.cart-page {
    @apply
    min-h-screen bg-bg-body px-8 py-12;
}

.cart-page_layout {
    @apply
    mx-auto grid max-w-5xl grid-cols-1
    items-start gap-10 md:grid-cols-[1.6fr_1fr];
}

.cart-page_status {
    @apply
    font-body text-text-muted;
}
</style>