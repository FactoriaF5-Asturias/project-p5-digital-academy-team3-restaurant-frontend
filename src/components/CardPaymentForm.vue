<script setup>

    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { getStripe } from '../services/StripeService.js'

    const mountPoint = ref(null)
    const cardError = ref(null)
    const isReady = ref(false)

    const LOAD_ERROR = 'No se pudo cargar el pago con tarjeta'
    const NOT_READY_ERROR = 'El formulario de tarjeta no está listo.'
    const NETWORK_ERROR = 'No se pudo completar el pago. Comprueba tu conexión e inténtalo de nuevo.'

    let stripe = null
    let cardElement = null
    let unmounted = false

    onMounted(async () => {
        try {
            stripe = await getStripe()
        } catch {
            stripe = null
        }
        if (unmounted) return
        if (!stripe || !mountPoint.value) {
            cardError.value = LOAD_ERROR
            return
        }
        cardElement = stripe.elements().create('card', { hidePostalCode: true })
        cardElement.mount(mountPoint.value)
        cardElement.on('change', (event) => {
            cardError.value = event.error ? event.error.message : null
        })
        isReady.value = true
    })

    onBeforeUnmount(() => {
        unmounted = true
        isReady.value = false
        if (cardElement) {
            cardElement.destroy()
            cardElement = null
        }
    })

    async function pay(clientSecret) {
        cardError.value = null
        if (!stripe || !cardElement) {
            return { error: { message: NOT_READY_ERROR } }
        }
        try {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement }
            })
            if (result.error) {
                cardError.value = result.error.message
            }
            return result
        } catch {
            cardError.value = NETWORK_ERROR
            return { error: { message: NETWORK_ERROR } }
        }
    }

    defineExpose({ pay, isReady })

</script>

<template>
    <div class="card-payment-form">
        <span id="card-element-label" class="card-payment-form_label">
            Datos de la tarjeta
        </span>
        <div
            ref="mountPoint"
            class="card-payment-form_element"
            role="group"
            aria-labelledby="card-element-label"
        ></div>
        <p v-if="cardError" class="card-payment-form_error" role="alert">
            {{ cardError }}
        </p>
    </div>
</template>

<style scoped>
@reference '../main.css';

.card-payment-form {
    @apply
    mt-4 flex flex-col gap-2 px-6;
}

.card-payment-form_label {
    @apply
    font-display font-bold text-text-default;
}

.card-payment-form_element {
    @apply
    rounded-lg border border-border-default bg-bg-body p-3
    focus-within:border-bg-brand;
}

.card-payment-form_error {
    @apply
    font-body text-sm text-text-muted;
}
</style>
