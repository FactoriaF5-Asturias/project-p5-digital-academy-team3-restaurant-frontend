<script setup>

    defineEmits(['continue-shopping'])

</script>

<template>
    <div class="empty-cart">
        <img class="empty-cart_icon" src="../assets/cart.svg" alt="cart">
        <h2>Tu cesta está vacía</h2>
        <p class="empty-cart_message">Parece que aún no has añadido ningún producto. Explora el catálogo y encuentra algo que te apetezca.</p>

        <button
            type="button"
            class="empty-cart_action"
            @click="$emit('continue-shopping')"
        >
            Volver al catálogo
        </button>
    </div>
</template>

<style>
@reference '../main.css';

.empty-cart {
    @apply
    flex flex-col items-center gap-2
    rounded-lg bg-bg-container px-8 py-16
    text-center;
}

.empty-cart_icon {
    @apply
    mb-2 text-4xl;
}

.empy-cart h2 {
    @apply
    font-display text-2xl text-text-default;
}

.empty-cart_message {
    @apply
    mb-4 max-w-sm
    font-body text-sm text-text-muted;
}

.empty-cart_action {
    @apply
    cursor-pointer rounded border border-border-brand
    bg-transparent px-6 py-2.5
    font-body text-sm text-text-brand
    transition-colors hover:bg-bg-container-high;
}
</style>