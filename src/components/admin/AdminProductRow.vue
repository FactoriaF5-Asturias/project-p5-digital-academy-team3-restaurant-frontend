<script setup>

    defineProps({
        product: {
            type: Object,
            required: true,
        }
    })

    const apiUrl = import.meta.env.VITE_API_URL

    function getImageUrl(path) {
        if (!path) return ''
        if (/^(https?:|data:|blob:)/i.test(path)) return path

        return `${apiUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
    }

    function formatPrice(value) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(value)
    }

</script>

<template>
    <article class="admin-product-row">
        <img
            v-if="product.imageUrl"
            class="admin-product-row__image"
            :src="getImageUrl(product.imageUrl)"
            :alt="product.name"
        />

        <div class="admin-product-row__details">
            <h2>{{ product.name }}</h2>
            <p class="admin-product-row__description">{{ product.description }}</p>
            <span class="admin-product-row__category">{{ product.category }}</span>
        </div>

        <div class="admin-product-row__meta">
            <span class="admin-product-row__price">
                {{ formatPrice(product.price) }}
            </span>
            <span
                class="admin-product-row__status"
                :class="product.status
                    ? 'admin-product-row__status--active'
                    : 'admin-product-row__status--inactive'"
            >
                {{ product.status ? 'En servicio' : 'Fuera de servicio' }}
            </span>
        </div>
    </article>
</template>

<style scoped>
@reference '../../main.css';

.admin-product-row {
    @apply
    flex flex-col gap-4
    rounded-xl bg-bg-container
    p-4 shadow-sm
    sm:flex-row sm:items-center;
}
</style>