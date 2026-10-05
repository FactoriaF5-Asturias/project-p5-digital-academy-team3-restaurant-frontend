<script setup>
    
    defineProps({
        item: {
            type: Object,
            required: true,
            // se espera: { id, name, description, price, quantity, image }
        }
    })

    defineEmits(['increment', 'decrement', 'remove'])

    function formatPrice(value) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(value)
    }

</script>

<template>
    <article class="cart-item">
        <img
            :src="item.image"
            :alt="item.name"
            class="cart-item_img"/>

        <div class="cart-item_body">
            <div class="cart-item_top">
                <h2>{{ item.name }}</h2>
                <button
                    class="cart-item_remove"
                    type="button"
                    :aria-label="`Quitar ${item.name} de la cesta`"
                    @click="$emit('remove', item.id)"
                >
                    x
                </button>
            </div>

            <p class="cart-item_desc">{{ item.description }}</p>

            <div class="cart-item_bottom">
                <span class="cart-item_price">{{ formatPrice(item.price) }}</span>

                <div class="qty-control">
                    <button
                        type="button"
                        class="qty-control_btn"
                        :disabled="item.quantity <= 1"
                        :aria-label="`Reducir cantidad de ${item.name}`"
                        @click="$emit('decrement', item.id)"
                    >
                        -
                    </button>
                    <span class="qty-control_value">{{ item.quantity }}</span>
                    <button
                        type="button"
                        class="qty-control_btn"
                        :aria-label="`Aumentar cantidad de ${item.name}`"
                        @click="$emit('increment', item.id)"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
@reference '../main.css';

.cart-item {
    @apply
    flex flex-col gap-4
    rounded-lg border border-border-default
    bg-bg-container p-4 sm:flex-row;
}

.cart-item_img {
    @apply
    h-36 w-full shrink-0
    rounded object-cover
    sm:h-20 sm:w-20;
}

.cart-item_body {
    @apply
    min-w-0 flex-1;
}

.cart-item_top {
    @apply
    flex items-start justify-between gap-2;
}

.cart-item_top h2 {
    @apply
    font-display text-lg text-text-default;
}

.cart-item_remove {
    @apply
    cursor-pointer border-none bg-transparent px-1
    text-xl leading-none text-text-muted
    transition-colors hover:text-text-brand;
}

.cart-item_desc {
    @apply
    mb-3 mt-1 truncate font-body text-sm text-text-muted;
}

.cart-item_bottom {
    @apply
    flex items-center justify-between;
}

.cart-item_price {
    @apply
    font-display font-bold text-text-brand;
}

.qty-control {
    @apply
    flex items-center gap-2.5
    rounded-full bg-bg-container-high px-2.5 py-1;
}

.qty-control_btn {
    @apply
    flex h-5.5 w-5.5 cursor-pointer items-center justify-center
    rounded-full border-none bg-transparent text-base leading-none
    text-text-default disabled:cursor-not-allowed disabled:opacity-35;
}

.qty-control_value {
    @apply
    min-w-3.5 text-center font-body text-sm text-text-default;
}
</style>