<script setup>
import searchIcon from '../../assets/search.svg'

const model = defineModel()
</script>
<template>
    <label class="menu-search">
        <img
            :src="searchIcon"
            alt=""
            class="menu-search__icon"
        />
    
        <input
            v-model="model"
            class="menu-search__input"
            type="search"
            placeholder="Buscar plato, ingrediente..."
            aria-label="Buscar plato o ingrediente"
        />
    </label>
</template>
<style scoped>
@reference "../../main.css";

.menu-search {
    @apply
        flex
        h-12
        w-96
        items-center
        gap-4
        rounded-xl
        bg-bg-surface
        px-6
        shadow-sm;
}

.menu-search__icon {
    @apply
        h-5
        w-5
        shrink-0;
}

.menu-search__input {
    @apply
        w-full
        bg-transparent
        text-sm
        text-text-default
        outline-none
        placeholder:text-text-muted;
}
</style>