<script setup>

    import { ref, computed } from 'vue'
    import { useCart } from '../composables/useCart.js'
    import { createOrder, createPaymentIntent } from '../services/CartService.js'
    import { isStripeConfigured } from '../services/StripeService.js'
    import CartItemsSection from '../components/CartItemsSection.vue'
    import CartSummary from '../components/CartSummary.vue'
    import CardPaymentForm from '../components/CardPaymentForm.vue'
    import EmptyCart from '../components/EmptyCart.vue'
    import CartLoadingState from '../components/CartLoadingState.vue'
    import CartErrorState from '../components/CartErrorState.vue'
    import MainHeader from '../components/common/MainHeader.vue'
    import MainFooter from '../components/common/MainFooter.vue'
    import { useRouter } from 'vue-router'

    defineEmits(['checkout'])

    const { items, incrementQty, decrementQty, removeItem, clearCart } = useCart()

    const deliveryMethod = ref('dine-in')
    const isSubmitting = ref(false)
    const submitError = ref(null)
    const paymentMethod = ref('cash')
    const cardForm = ref(null)
    const cardAvailable = isStripeConfigured()

    const GENERIC_ERROR = 'No se pudo enviar el pedido. Inténtelo de nuevo'
    const REFUND_ERROR = 'No se pudo crear el pedido; el pago se ha devuelto. Revisa la cesta.'
    const CARD_UNAVAILABLE_ERROR = 'El pago con tarjeta no está disponible ahora mismo; puedes pagar en efectivo.'
    
    const isLoading = ref(false)
    const loadError = ref(null)

    function loadItems() {
        loadError.value = null
    }

    const total = computed(() => subtotal.value)

    const subtotal = computed(() =>
        items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const router = useRouter()

    function buildOrder(extra = {}) {
        return {
            items: items.value,
            orderTypeName: deliveryMethod.value === 'takeaway' ? 'TAKEAWAY' : 'DINE IN',
            paymentMethodName: 'CASH',
            tabletId: 2,
            ...extra
        }
    }

    async function payWithCard() {
        let intent
        try {
            intent = await createPaymentIntent(items.value)
        } catch (err) {
            submitError.value = err.status === 503 ? CARD_UNAVAILABLE_ERROR : GENERIC_ERROR
            return null
        }

        const result = await cardForm.value.pay(intent.clientSecret)
        if (result.error) {
            return null
        }

        try {
            return await createOrder(buildOrder({
                paymentMethodName: 'CARD',
                paymentIntentId: intent.paymentIntentId
            }))
        } catch (err) {
            submitError.value = err.status === 409 ? REFUND_ERROR : GENERIC_ERROR
            return null
        }
    }

    async function payWithCash() {
        try {
            return await createOrder(buildOrder())
        } catch {
            submitError.value = GENERIC_ERROR
            return null
        }
    }

    async function handleCheckout() {
        if (isSubmitting.value) return
        isSubmitting.value = true
        submitError.value = null
        try {
            const order = paymentMethod.value === 'card'
                ? await payWithCard()
                : await payWithCash()
            if (order) {
                clearCart()
                router.push(`/order-success/${order.id}`)
            }
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
                :total="total"
                :delivery-method="deliveryMethod"
                :payment-method="paymentMethod"
                :card-available="cardAvailable"
                :disabled="items.length === 0 || isSubmitting"
                @update:delivery-method="deliveryMethod = $event"
                @update:payment-method="paymentMethod = $event"
                @checkout="handleCheckout"
            >
                <template #payment-details>
                    <CardPaymentForm v-if="paymentMethod === 'card'" ref="cardForm" />
                </template>
            </CartSummary>
        </div>

        <p v-if="submitError" class="cart-page_status" role="alert">
            {{ submitError }}
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