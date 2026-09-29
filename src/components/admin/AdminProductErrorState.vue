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