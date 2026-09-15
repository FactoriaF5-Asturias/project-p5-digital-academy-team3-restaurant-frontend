<script setup>

    const props = defineProps({
        subtotal: {
            type: Number,
            required: true
        },
        shipping: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        deliveryMethod: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    })

    defineEmits(['update:deliveryMethod', 'checkout'])

    const deliveryOptions = [
        { value: 'dine-in', label: 'Comer en el restaurante' },
        { value: 'takeaway', label: 'Para llevar' },
        { value: 'delivery', label: 'Envío a domicilio' }
    ]

    function formatPrice(value) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(value)
    }

</script>

<template>
    <aside class="cart-summary">
        <div class="cart-summary_card">
            <h2>Resumen</h2>
            <dl class="cart-summary_lines">
                <div class="cart-summary_line">
                    <dt>Subtotal</dt>
                    <dd>{{ formatPrice(subtotal) }}</dd>
                </div>
                <div class="cart-summary_line">
                    <dt>
                        Envío
                        <span class="cart-summary_info" title="Coste calculado según el método de entrega">ⓘ</span>
                    </dt>
                    <dd>{{ formatPrice(shipping) }}</dd>
                </div>
            </dl>

            <div class="cart-summary_total">
                <span class="cart-summary_total-label">Total </span>
                <span class="cart-summary_total-amount">
                    {{ formatPrice(total) }}
                    <small>IVA incluido</small>
                </span>
            </div>

            <fieldset class="cart-summary_delivery">
                <legend>¿Cómo quieres recibir tu pedido?</legend>

                <label
                    v-for="option in deliveryOptions"
                    :key="option.value"
                    class="cart-summary_delivery-option"
                    :class="{ 'cart-summary_delivery-option--active': deliveryMethod === option.value }"
                >
                    <input
                        type="radio"
                        name="delivery"
                        :value="option.value"
                        :checked="deliveryMethod === option.value"
                        @change="$emit('update:deliveryMethod', option.value)"
                    >
                    <span>{{ option.label }}</span>
                </label>
            </fieldset>
        </div>

        <button
            type="button"
            class="cart-summary_checkout"
            :disabled="disabled"
            @click="$emit('checkout')"
        >
            Realizar pedido <span aria-hidden="true">→</span>
        </button>
    </aside>
</template>

<style scoped>
@reference '../main.css';

.cart-summary {
    @apply
    sticky top-8;
}

.cart-summary_card {
    @apply
    rounded-lg bg-bg-container p-8;
    box-shadow: 0 10px 30px rgba(26, 26, 26, 0.05);
}

.cart-summary_card h2 {
    @apply
    mb-5 font-display text-2xl text-text-default;
}

.cart-summary_line {
    @apply
    flex justify-between p-2
    font-body text-sm text-text-muted;
}

.cart-summary_line dt {
    @apply
    flex items-center gap-1.5;
}

.cart-summary_info {
    @apply
    cursor-help text-xs;
}

.cart-summary_total {
    @apply
    mt-3 flex items-baseline justify-between
    border-t border-border-default p-4;
}

.cart-summary_total-label {
    @apply
    font-display text-xl text-text-default;
}

.cart-summary_total-amount {
    @apply
    text-right font-display text-2xl
    font-bold text-text-brand;
}

.cart-summary_total-amount small {
    @apply
    block font-body text-xs
    font-normal text-text-muted;
}

.cart-summary_delivery {
    @apply
    mt-6 border-none p-6;
}

.cart-summary_delivery legend {
    @apply
    pb-3 font-display font-bold text-text-default;
}

.cart-summary_delivery-option {
    @apply
    flex cursor-pointer items-center gap-2.5 py-2
    font-body text-sm text-text-default;
}

.cart-summary_delivery-option input {
    @apply
    h-4 w-4 accent-bg-brand;
}

.cart-summary_delivery-option--active span {
    @apply
    font-semibold;
}

.cart-summary_checkout {
    @apply
    mt-5 flex w-full cursor-pointer items-center justify-center
    gap-2 rounded-lg border-none bg-bg-brand px-5 py-4
    font-body text-base text-text-on-brand transition-colors
    hover:bg-bg-brand-darker disabled:cursor-not-allowd disabled:opacity-50;
}
</style>