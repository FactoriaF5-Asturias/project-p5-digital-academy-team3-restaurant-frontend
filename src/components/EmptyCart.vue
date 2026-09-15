<template>
    <div class="empty-cart">
        <img src="../assets/cart.svg" alt="cart">
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