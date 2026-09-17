<script setup>

    import CartItem from './CartItem.vue'

    defineProps ({
        items: {
            type: Array,
            required: true
        }
    })

    defineEmits(['increment', 'decrement', 'remove', 'continue-shopping'])

</script>

<template>
    <section class="cart-items-section">
        <header class="cart-items-section_header">
            <h1>Tu cesta</h1>
            <p>Revisa los productos antes de finalizar tu pedido.</p>
        </header>

        <div class="cart-items-section_list">
            <CartItem
                v-for="item in items"
                :key="item.id"
                :item="item"
                @increment="$emit('increment', $event)"
                @decrement="$emit('decrement', $event)"
                @remove="$emit('remove', $event)"
            />
        </div>

        <button
            type="button"
            class="cart-items-section_continue"
            @click="$emit('continue-shopping')"
        >
            <span aria-hidden="true">←</span> Seguir comprando
        </button>
    </section>
</template>

<style scoped>
@reference '../main.css';

.cart-items-section {
    @apply
    min-w-0;
}

.cart-items-section_header h1 {
    @apply
    mb-1.5 font-display text-4xl text-text-brand;
}

.cart-items-section_header p {
    @apply
    mb-7 font-body text-text-muted;
}

.cart-items-section_list {
    @apply
    flex flex-col gap-4;
}

.cart-items-section_continue {
    @apply
    mt-6 inline-flex cursor-pointer items-center gap-2
    rounded border border-border-brand bg-transparent
    px-4.5 py-2.5 font-body text-sm text-text-brand
    transition-colors hover:bg-bg-container-high;
}
</style>