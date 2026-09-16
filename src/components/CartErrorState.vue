<script setup>

    defineProps({
        message: {
            type: String,
            default: 'No se pudo cargar tu cesta. Inténtalo de nuevo.'
        }
    })

    defineEmits(['retry'])

</script>

<template>
    <div class="cart-error" role="alert">
        <p class="cart-error_icon" aria-hidden="true">⚠️</p> <!-- Placeholder for a future icon -->
        <h2>Algo ha ido mal</h2>
        <p class="cart-error_message">{{ message }}</p>

        <button class="cart-error_retry" @click="$emit('retry')">
            Reintentar
        </button>
    </div>
</template>

<style scoped>
@reference '../main.css';

.cart-error {
    @apply
    flex flex-col items-center gap-2
    rounded-lg bg-bg-container px-8 py-16
    text-center;
}

.cart-error_icon {
    @apply
    mb-2 text-4xl; /* Placeholder style for the new img icon */
}

.cart-error h2 {
    @apply
    font-display text-2xl text-text-default;
}

.cart-error_message {
    @apply
    mb-4 max-w-sm
    font-body text-sm text-text-muted;
}

.cart-error_retry {
    @apply
    cursor-pointer
    rounded border border-border-brand
    bg-transparent px-6 py-2.5
    font-body text-sm text-text-brand
    transition-colors hover:bg-bg-container-high;
}
</style>