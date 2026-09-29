<script setup>

    import { ref } from 'vue'
    import MenuSearch from '../home/MenuSearch.vue'
    
    const searchQuery = ref('')

</script>

<template>
    <section class="admin-products">
        <h1>Productos</h1>
        <MenuSearch
            v-model="searchQueary"
            placeholder="Buscar producto..."
            aria-label="Buscar productos"
        />
    </section>
</template>