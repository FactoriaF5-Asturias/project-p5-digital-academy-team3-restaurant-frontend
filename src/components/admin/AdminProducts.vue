<script setup>

    import { onMounted, ref } from 'vue'
    import MenuSearch from '../home/MenuSearch.vue'
    import AdminProductRow from './AdminProductRow.vue'
    import AdminProductErrorState from './AdminProductErrorState.vue'
    import { getProducts, getCategories, updateProducts } from '../../services/ProductService.js'
    
    const searchQuery = ref('')
    const products = ref([])
    const isLoading = ref(true)
    const error = ref('')
    const categories = ref([])

    async function loadProducts() {
        isLoading.value = true
        error.value = ''

        try {
            const [productList, categoryList] = await Promise.all([
                getProducts(),
                getCategories(),
            ])

            products.value = productList
            categories.value = categoryList
        } catch (err) {
            error.value = err.message || 'No se pudieron cargar los productos'
        } finally {
            isLoading.value = false
        }
    }

    onMounted(loadProducts)

    async function handleToggleStatus(updateProduct) {
        const category = categories.value.find(
            (item) => item.name === updateProduct.category
        )

        if (!category) {
            error.value = `No se pudo encontrar la categoría ${updateProduct.category}.`
            return
        }

        const payload = {
            name: updateProduct.name,
            description: updateProduct.description,
            categoryId: category.id,
            price: updateProduct.price,
            imageUrl: updateProduct.imageUrl,
            status: updateProduct.status,
        }


        try {
            await updateProducts(updateProduct.id, payload)

            products.value = products.value.map((product) => 
                product.id === updateProduct.id ? updateProduct : product
            )
        } catch (err) {
            error.value = err.message || `No se pudo actualizar el producto`
        }
    }

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