<script setup>

    import { ref, computed, onMounted } from 'vue'
    import { fetchCartItems } from '../services/CartService.js'
    import CartItemsSection from '../components/CartItemsSection.vue'
    import CartSummary from '../components/CartSummary.vue'
    import EmptyCart from '../components/EmptyCart.vue'
    import CartLoadingState from '../components/CartLoadingState.vue'
    import CartErrorState from '../components/CartErrorState.vue'

    const props = defineProps({
        shippingCost: {
            type: Number,
            default: 3.5
        }
    })

    defineEmits(['checkout'])

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
        const item = items.value.find((i) => i.id === id)
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
            <CartLoadingState
                v-if="isLoading"
            />

            <CartErrorState
                v-else-if="loadError" @retry="loadItems"
            />

            <EmptyCart
                v-else-if="items.length === 0"
                @continue-shopping="$router.push('/home')"
            />

            <CartItemsSection
                v-else
                :items="items"
                @increment="incrementQty"
                @decrement="decrementQty"
                @remove="removeItem"
                @continue-shopping="$router.push('/home')"
            />
            
            <CartSummary
                v-if="!isLoading && !loadError && items.length > 0"
                :subtotal="subtotal"
                :shipping="shipping"
                :total="total"
                :delivery-method="deliveryMethod"
                :disabled="items.length === 0"
                @update:delivery-method="deliveryMethod = $event"
                @checkout="$emit('checkout', { items, deliveryMethod, total })"
            />
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