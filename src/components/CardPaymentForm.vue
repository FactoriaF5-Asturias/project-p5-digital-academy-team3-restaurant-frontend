<script setup>

    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { getStripe } from '../services/StripeService.js'

    const mountPoint = ref(null)
    const cardError = ref(null)
    const isReady = ref(false)

    let stripe = null
    let cardElement = null

    onMounted(async () => {
        stripe = await getStripe()
        if (!stripe || !mountPoint.value) {
            cardError.value = 'No se pudo cargar el formulario de tarjeta.'
            return
        }
        cardElement = stripe.elements().create('card', { hidePostalCode: true })
        cardElement.mount(mountPoint.value)
        cardElement.on('ready', () => {
            isReady.value = true
        })
        cardElement.on('change', (event) => {
            cardError.value = event.error ? event.error.message : null
        })
    })

    onBeforeUnmount(() => {
        if (cardElement) {
            cardElement.destroy()
            cardElement = null
        }
    })

    async function pay(clientSecret) {
        if (!stripe || !cardElement) {
            return { error: { message: 'El formulario de tarjeta no está listo.' } }
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement }
        })
        if (result.error) {
            cardError.value = result.error.message
        }
        return result
    }

    defineExpose({ pay })

</script>

<template>
    <div class="card-payment-form">
        <label id="card-element-label" class="card-payment-form_label">
            Datos de la tarjeta
        </label>
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
