<script setup>
import MenuSearch from './MenuSearch.vue';
import MenuCategoryFilter from './MenuCategoryFilter.vue';
import ProductCard from './ProductCard.vue';
import { computed, onMounted, ref } from 'vue';
import { getProducts } from '../../services/ProductService.js';

const activeCategory = ref('all')
const searchText = ref('')

const products = ref([])

const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
    try {
        products.value = await getProducts()
    } catch (e) {
        error.value = e.message
    } finally {
        isLoading.value = false
    }
})

const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        return (activeCategory.value === 'all' || product.category === activeCategory.value) &&
        (searchText.value === '' || product.name.toLowerCase().includes(searchText.value.toLowerCase()) || product.description.toLowerCase().includes(searchText.value.toLowerCase()))
    }
    )
})

const emit = defineEmits(['add-to-cart'])
</script>

<template>
    <section class="px-20 py-14">
        <div class="flex justify-between items-center pb-10">
            <MenuCategoryFilter v-model="activeCategory"/>
            <MenuSearch v-model="searchText"/>
        </div>
        <div v-if="isLoading">Cargando...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
                v-for="product in filteredProducts"
                :id="product.id"
                :key="product.id"
                :name="product.name"
                :description="product.description"
                :category="product.category"
                :price="product.price"
                :image-url="product.imageUrl"
                @add-to-cart="emit('add-to-cart', $event)"
            />
        </div>
    </section>
</template>