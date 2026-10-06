<script setup>

    import { ref, computed, watch } from 'vue'
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
    const paidIntentId = ref(null)
    const cardAvailable = isStripeConfigured()

    const GENERIC_ERROR = 'No se pudo enviar el pedido. Inténtelo de nuevo'
    const REFUND_ERROR = 'No se pudo crear el pedido; el pago se ha devuelto. Revisa la cesta.'
    const PAID_NOT_CONFIRMED_ERROR = 'El pago se ha realizado pero el pedido no se ha confirmado. Pulsa de nuevo para reintentar sin volver a pagar o avisa al personal.'
    const ALREADY_REGISTERED_ERROR = 'El pedido ya se registró con este pago; avisa al personal si no aparece.'
    const PAYMENT_INCOMPLETE_ERROR = 'El pago no se ha completado. Inténtalo de nuevo.'
    const CARD_NOT_READY_ERROR = 'El formulario de tarjeta aún no está listo.'
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

    const isCardPending = computed(() =>
        paymentMethod.value === 'card' && !paidIntentId.value && !cardForm.value?.isReady
    )

    const isCheckoutDisabled = computed(() =>
        items.value.length === 0 || isSubmitting.value || isCardPending.value
    )

    const isCartLocked = computed(() => isSubmitting.value || paidIntentId.value !== null)

    watch(paymentMethod, () => {
        submitError.value = null
    })

    function buildOrder(orderItems, extra = {}) {
        return {
            items: orderItems,
            orderTypeName: deliveryMethod.value === 'takeaway' ? 'TAKEAWAY' : 'DINE IN',
            paymentMethodName: 'CASH',
            tabletId: 2,
            ...extra
        }
    }

    async function chargeCard(orderItems) {
        if (!cardForm.value?.pay || !cardForm.value.isReady) {
            submitError.value = CARD_NOT_READY_ERROR
            return false
        }

        let intent
        try {
            intent = await createPaymentIntent(orderItems)
        } catch (err) {
            submitError.value = err.status === 503 ? CARD_UNAVAILABLE_ERROR : GENERIC_ERROR
            return false
        }

        const result = await cardForm.value.pay(intent.clientSecret)
        if (result.error) {
            return false
        }
        if (result.paymentIntent?.status !== 'succeeded') {
            submitError.value = PAYMENT_INCOMPLETE_ERROR
            return false
        }

        paidIntentId.value = intent.paymentIntentId
        return true
    }

    async function payWithCard(orderItems) {
        const isRetry = paidIntentId.value !== null
        if (!isRetry && !(await chargeCard(orderItems))) {
            return null
        }

        try {
            const order = await createOrder(buildOrder(orderItems, {
                paymentMethodName: 'CARD',
                paymentIntentId: paidIntentId.value
            }))
            paidIntentId.value = null
            return order
        } catch (err) {
            if (err.status === 409) {
                submitError.value = isRetry ? ALREADY_REGISTERED_ERROR : REFUND_ERROR
                paidIntentId.value = null
            } else {
                submitError.value = PAID_NOT_CONFIRMED_ERROR
            }
            return null
        }
    }

    async function payWithCash(orderItems) {
        try {
            return await createOrder(buildOrder(orderItems))
        } catch {
            submitError.value = GENERIC_ERROR
            return null
        }
    }

    async function handleCheckout() {
        if (isSubmitting.value) return
        isSubmitting.value = true
        submitError.value = null
        const orderItems = items.value.map((item) => ({ ...item }))
        try {
            const order = paymentMethod.value === 'card'
                ? await payWithCard(orderItems)
                : await payWithCash(orderItems)
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
                :disabled="isCartLocked"
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
                :disabled="isCheckoutDisabled"
                :controls-disabled="isSubmitting"
                :lock-payment-method="paidIntentId !== null"
                @update:delivery-method="deliveryMethod = $event"
                @update:payment-method="paymentMethod = $event"
                @checkout="handleCheckout"
            >
                <template #payment-details>
                    <CardPaymentForm v-if="paymentMethod === 'card'" ref="cardForm" />
                </template>
            </CartSummary>
        </div>

        <p class="cart-page_status" role="alert" aria-atomic="true">
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