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
                <span class="cart-summary_total-label">Total</span>
                <span class="cart-summary_total-ammount">
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
                    <span>{{ optionlabel }}</span>
                </label>
            </fieldset>
        </div>

        <button
            typde="button"
            class="cart-summary_checkout"
            :disabled="disabled"
            @click="$emit('checkout')"
        >
            Realizar pedido <span aria-hidden="true">→</span>
        </button>
    </aside>
</template>