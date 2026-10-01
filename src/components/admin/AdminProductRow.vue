<script setup>

    const props = defineProps({
        product: {
            type: Object,
            required: true,
        }
    })

    const emit = defineEmits(['toggle-status', 'edit', 'delete'])

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

    function toggleStatus() {
        emit('toggle-status', {
            ...props.product,
            status: !props.product.status,
        })
    }

</script>

<template>
    <article
        class="admin-product-row"
        :class="{ 'admin-product-row--inactive' : !product.status }"
    >
        <img
            v-if="product.imageUrl"
            class="admin-product-row__image"
            :src="getImageUrl(product.imageUrl)"
            :alt="product.name"
        />

        <div class="admin-product-row__name">
            <h2>{{ product.name }}</h2>
        </div>
        
        <p class="admin-product-row__description">{{ product.description }}</p>
        
        <span class="admin-product-row__category">{{ product.category }}</span>

        <span class="admin-product-row__price">{{ formatPrice(product.price) }}</span>
           
        <div class="admin-product-row__status-control">
            <button
                type="button"
                role="switch"
                class="admin-product-row__switch"
                :class="{ 'admin-product-row__switch--active' : product.status}"
                :aria-checked="product.status"
                :aria-label="`${product.status ? 'Desactivar' : 'Activar'} ${product.name}`"
                @click="toggleStatus"
            >
                <span class="admin-product-row__switch-thumb"></span>
            </button>

                <span>{{ product.status ? 'Activado' : 'Desactivado' }}</span>
        </div>

        <div class="admin-product-row__actions">
            <button
                type="button"
                :aria-label="`Editar ${product.name}`"
                @click="emit('edit', product)"
            >
                <img src="../../assets/edit.svg" alt="">
            </button>
            <button
                type="button"
                :aria-label="`Eliminar ${product.name}`"
                @click="emit('delete', product)"
            >
                <img src="../../assets/delete.svg" alt="">
            </button>
        </div>
    </article>
</template>

<style scoped>
@reference '../../main.css';

.admin-product-row {
    @apply
    grid min-w-[58rem]
    grid-cols-[3rem_minmax(8rem,1.2fr)_minmax(12rem,2fr)_7rem_5rem_8rem_8rem]
    items-center gap-3 border-b border-border-default
    bg-bg-container px-4 py-4;
}

.admin-product-row__image {
    @apply
    h-10 w-10 rounded object-cover;
}

.admin-product-row__name h2 {
    @apply
    font-display text-sm font-bold text-text-default;
}

.admin-product-row__description {
    @apply
    line-clamp-3 text-xs text-text-muted;
}

.admin-product-row__category {
    @apply
    rounded-full bg-bg-container-high
    px-2 py-1
    text-center text-xs text-text-muted;
}

.admin-product-row__price {
    @apply
    text-sm font-semibold text-text-brand;
}

.admin-product-row__status-control {
    @apply
    flex items-center gap-2
    text-xs text-text-muted;
}

.admin-product-row__actions {
    @apply
    flex items-center gap-2;
}

.admin-product-row__actions button {
    @apply
    cursor-pointer rounded px-2 py-1
    text-xs text-text-brand
    hover:bg-bg-container-high;
}

.admin-product-row__actions img {
    @apply
    h-4 w-4;
}

.admin-product-row__switch {
    @apply
    relative inline-flex h-6 w-11
    cursor-pointer items-center rounded-full
    bg-border-strong p-0.5 transition-colors;
}

.admin-product-row__switch--active {
    @apply
    bg-bg-special;
}

.admin-product-row__switch-thumb {
    @apply
    h-5 w-5 rounded-full
    bg-white shadow transition-transform;
}

.admin-product-row__switch--active .admin-product-row__switch-thumb {
    @apply
    translate-x-5;
}

.admin-product-row__status {
    @apply
    rounded-full px-3 py-1 text-xs font-semibold;
}

.admin-product-row__status--active {
    @apply
    bg-bg-container-high text-text-special;
}

.admin-product-row__status--inactive {
    @apply
    bg-bg-surface text-text-muted;
}
</style>