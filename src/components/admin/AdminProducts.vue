<script setup>

    import { onMounted, ref } from 'vue'
    import MenuSearch from '../home/MenuSearch.vue'
    import AdminProductRow from './AdminProductRow.vue'
    import AdminProductErrorState from './AdminProductErrorState.vue'
    import { getProducts } from '../../services/ProductService.js'
    
    const searchQuery = ref('')
    const products = ref([])
    const isLoading = ref(true)
    const error = ref('')

    async function loadProducts() {
        try {
            products.value = await getProducts()
        } catch (err) {
            error.value = err.message || 'No se pudieron cargar los productos'
        } finally {
            isLoading.value = false
        }
    }

    function handleToggleStatus(updatedProduct) {
        products.value = products.value.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
  )
}

    onMounted(loadProducts)

</script>

<template>
    <section class="admin-products">
        <h1>Productos</h1>
        <div class="admin-products__toolbar">
            <MenuSearch
                v-model="searchQuery"
                placeholder="Buscar producto..."
                aria-label="Buscar productos"
            />
        </div>
        <div class="admin-products__list">
            <AdminProductRow
                v-for="product in products"
                :key="product.id"
                :product="product"
                @toggle-status="handleToggleStatus"
            />
        </div>
    </section>
</template>

<style scoped>
@reference '../../main.css';

.admin-products {
    @apply
    mx-auto w-full max-w-5xl;
}

.admin-products h1 {
    @apply
    mb-6 font-display
    text-3xl
    font-bold text-text-default
    md:text-4xl;
}

.admin-products__toolbar {
    @apply
    mb-8;
}

.admin-products__list {
    @apply
    flex flex-col gap-4;
}
</style>