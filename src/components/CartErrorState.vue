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
        <p class="cart-error_icon" aria-hidden="true">⚠️</p> <!-- Placeholder para un futuro icono. -->
        <h2>Algo ha ido mal</h2>
        <p class="cart-error_message">{{ message }}</p>

        <button class="cart-error_retry" @click="$emit('retry')">
            Reintentar
        </button>
    </div>
</template>