<script setup>

    import { ref, computed, onMounted } from 'vue'
    import { useCart } from '../composables/useCart.js'
    import { createOrder } from '../services/CartService.js'
    import CartItemsSection from '../components/CartItemsSection.vue'
    import CartSummary from '../components/CartSummary.vue'
    import EmptyCart from '../components/EmptyCart.vue'
    import CartLoadingState from '../components/CartLoadingState.vue'
    import CartErrorState from '../components/CartErrorState.vue'
    import MainHeader from '../components/common/MainHeader.vue'
    import MainFooter from '../components/common/MainFooter.vue'

    const props = defineProps({
        shippingCost: {
            type: Number,
            default: 3.5
        }
    })

    defineEmits(['checkout'])

    const { items, incrementQty, decrementQty, removeItem, clearCart } = useCart()

    const deliveryMethod = ref('delivery')
    const isSubmitting = ref(false)
    const submitError = ref(null)
    
    const isLoading = ref(false)
    const loadError = ref(null)

    function loadItems() {
        loadError.value = null
    }

    const total = computed(() => subtotal.value + shipping.value)

    const shipping = computed(() =>
        deliveryMethod.value === 'delivery' ? props.shippingCost : 0
    )

    const subtotal = computed(() =>
        items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    async function handleCheckout() {
        isSubmitting.value = true
        submitError.value = null
        try {
            await createOrder({
                items: items.value,
                orderTypeName: 'DINE IN',
                paymentMethodName: 'CASH',
                tabletId: 2
            })
            clearCart()
        } catch (err) {
            submitError.value = err
        } finally {
            isSubmitting.value = false
        }
    }

</script>

<template>
    <MainHeader />
    <div class="cart-page">
        <div
            class="cart-page_layout"
            :class="{ 'cart-page_layout-centered' : isLoading || loadError || items.length === 0}"
        >
            <CartLoadingState
                v-if="isLoading"
            />

            <CartErrorState
                v-else-if="loadError" @retry="loadItems"
            />

            <EmptyCart
                v-else-if="items.length === 0"
                @continue-shopping="$router.push('/')"
            />

            <CartItemsSection
                v-else
                :items="items"
                @increment="incrementQty"
                @decrement="decrementQty"
                @remove="removeItem"
                @continue-shopping="$router.push('/')"
            />
            
            <CartSummary
                v-if="!isLoading && !loadError && items.length > 0"
                :subtotal="subtotal"
                :shipping="shipping"
                :total="total"
                :delivery-method="deliveryMethod"
                :disabled="items.length === 0 || isSubmitting"
                @update:delivery-method="deliveryMethod = $event"
                @checkout="handleCheckout"
            />
        </div>

        <p v-if="submitError" class="cart-page_status">
            No se pudo enviar el pedido. Inténtelo de nuevo
        </p>
    </div>
    <MainFooter />
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

.cart-page_layout-centered {
    @apply
    flex min-h-[70vh] items-center justify-center
}

.cart-page_status {
    @apply
    font-body text-text-muted;
}
</style>