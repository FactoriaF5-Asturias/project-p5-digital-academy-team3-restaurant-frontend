<template>
    <div class="admin__product-error" role="alert">
        <p class="admin__product-error__icon" aria-hidden="true">⚠️</p>
        <p class="admin__product-error__message">{{ message }}</p>

        <button class="admin__product-error__retry" @click="$emit('retry')">
            Reintentar
        </button>
    </div>
</template>