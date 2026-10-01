<script setup>

    import { onMounted, ref } from 'vue'
    import MenuSearch from '../home/MenuSearch.vue'
    import AdminProductRow from './AdminProductRow.vue'
    import AdminProductErrorState from './AdminProductErrorState.vue'
    import AdminProductForm from './AdminProductForm.vue'
    import { getProducts, getCategories, updateProducts, deleteProduct } from '../../services/ProductService.js'
    
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

    const isProductFormOpen = ref(false)
    const selectedProduct = ref(null)
    const isSaving = ref(false)

    function openEditForm(product) {
        error.value = ''
        selectedProduct.value = product
        isProductFormOpen.value = true
    }

    function closeProductForm() {
        isProductFormOpen.value = false
        selectedProduct.value = null
    }

    async function handleUpdateProduct(formData) {
        if (!selectedProduct.value) return

        const category = categories.value.find(
            (item) => item.id === formData.categoryId
        )

        if (!category) {
            error.value = 'No se pudo encontrar la categoría seleccionada.'
            return
        }

        error.value = ''
        isSaving.value = true

        try {
            await updateProducts(selectedProduct.value.id, formData)

            products.value = products.value.map((product) =>
                product.id === selectedProduct.value.id
                    ? { ...product, ...formData, category: category.name }
                    : product
            )
            closeProductForm()
        } catch (err) {
            error.value = err.message || 'No se pudo actualizar el producto.'
        } finally {
            isSaving.value = false
        }
    }

    const productToDelete = ref(null)
    const isDeleting = ref(false)

    function openDeleteConfimation(product) {
        error.value = ''
        closeProductForm()
        productToDelete.value = product
    }

    function closeDeleteConfirmation() {
        productToDelete.value = null
    }

    async function handleDeleteProduct() {
        if (!productToDelete.value) return

        isDeleting.value = true
        error.value = ''

        try {
            await deleteProduct(productToDelete.value.id)
            products.value = products.value.filter(
                (product) => product.id !== productToDelete.value.id
            )
        } catch (err) {
            error.value = err.message || 'No se pudo eliminar el producto'
        } finally {
             isDeleting.value = false
        }
    }

</script>

<template>
    <section class="admin-products">
        <h1>Productos</h1>
        <p v-if="error" class="admin-products__error" role="alert">{{ error }}</p>
        <div class="admin-products__toolbar">
            <MenuSearch
                v-model="searchQuery"
                placeholder="Buscar producto..."
                aria-label="Buscar productos"
            />
        </div>

        <div class="admin-products__list">
            <div
                v-for="product in products"
                :key="product.id"
                class="admin-products__item"
            >
                <AdminProductRow
                    :product="product"
                    @toggle-status="handleToggleStatus"
                    @edit="openEditForm"
                    @delete="openDeleteConfirmation"
                />

                <AdminProductForm
                    v-if="isProductFormOpen && selectedProduct?.id === product.id"
                    :product="selectedProduct"
                    :categories="categories"
                    :is-saving="isSaving"
                    @submit="isSaving"
                    @cancel="closeProductForm"
                />

                <section
                    v-if="productToDelete?.id === product.id"
                    class="admin-product-delete"
                    aria-label="Confirmar eliminación"
                >
                    <p>¿Eliminar <strong>{{ product.name }}</strong>? Esta acción no se puede deshacer</p>

                    <div class="admin-product-delete__actions">
                        <button type="button" @click="closeDeleteConfirmation">
                            Cancelar
                        </button>
                        <button
                            type="button"
                            :disabled="isDeleting"
                            @click="handleDeleteProduct"
                        >
                            {{ isDeleting ? 'Eliminando...' : 'Eliminar producto' }}
                        </button>
                    </div>
                </section>
            </div>
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

.admin-products__error {
    @apply
    mb-4 rounded-lg
    bg-bg-container-high p-3
    text-sm text-text-default;
}

.admin-product-delete {
    @apply
    flex flex-col gap-4 rounded-lg
    border border-red-300 bg-bg-container p-5
    shadow-sm
    md:flex-row md:items-center md:justify-between;
}

.admin-product-delete__message {
    @apply
    text-sm text-text-default;
}

.admin-product-delete__actions {
    @apply
    flex justify-end gap-3;
}

.admin-product-delete__actions button {
    @apply
    cursor-pointer rounded-lg px-4 py-2
    text-sm font-semibold transition-colors
    disabled:cursor-wait disabled:opacity-60;
}

.admin-product-delete__actions button:first-child {
    @apply
    border border-border-default bg-transparent
    text-text-default hover:bg-bg-container-high;
}

.admin-product-delete__actions button:last-child {
    @apply
    border-0 bg-red-600
    text-white hover:bg-red-700;
}
</style>
