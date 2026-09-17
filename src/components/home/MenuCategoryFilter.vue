<script setup>
const model = defineModel()

const categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Especialidades', value: 'Especialidades' },
    { label: 'Postres', value: 'Postres' },
    { label: 'Bebidas', value: 'Bebidas' },
    // { label: 'Ofertas', value: 'ofertas' },
]
</script>
<template>
    <div class="menu-category-filter">
        <button
            v-for="category in categories"
            :key="category.value"
            type="button"
            class="menu-category-filter__button"
            :class="{ 'menu-category-filter__button--active': model === category.value }"
            @click="model = category.value"
        >
            {{ category.label }}
        </button>
    </div>
</template>
<style scoped>
@reference "../../main.css";

.menu-category-filter {
    @apply
        flex
        gap-3;
}

.menu-category-filter__button {
    @apply
        rounded-full
        bg-bg-surface
        shadow-sm
        px-6
        py-2
        text-sm
        font-semibold
        text-text-muted
        transition-colors
        hover:bg-bg-brand
        hover:text-text-on-brand;
}

.menu-category-filter__button--active {
    @apply
        bg-bg-brand-darker
        text-text-on-brand;
}
</style>