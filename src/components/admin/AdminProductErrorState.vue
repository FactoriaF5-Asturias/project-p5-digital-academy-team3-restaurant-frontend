<script setup>

    defineProps({
        message: {
            type: String,
            default: 'No se pueden cargar los productos. Inténtelo de nuevo más tarde'
        }
    })

    defineEmits(['retry'])

</script>

<template>
    <div class="admin__product-error" role="alert">
        <p class="admin__product-error__icon" aria-hidden="true">⚠️</p>
        <h2>Algo ha ido mal</h2>
        <p class="admin__product-error__message">{{ message }}</p>

        <button class="admin__product-error__retry" @click="$emit('retry')">
            Reintentar
        </button>
    </div>
</template>

<style scoped>
@reference '../../main.css';

.admin__product-error {
    @apply
    flex flex-col
    items-center gap-3
    rounded-lg bg-bg-container
    px-8 py-12 text-center;
}

.admin__product-error__icon {
    @apply
    mb-2 text-4xl;
}

.admin__product-error h2 {
    @apply
    font-display text-xl text-text-default;
}

.admin__product-error__message {
    @apply
    max-w-sm font-body
    text-sm text-text-muted
}

.admin__product-error__retry {
    @apply
    cursor-pointer rounded
    border border-border-brand
    bg-transparent
    px-6 py-2.5
    font-body text-sm text-text-brand
    transition-colors
    hover:bg-bg-container-high;
}
</style>