<script setup>

    import { reactive, watch } from 'vue'

    const props = defineProps({
        product: {
            type: Object,
            default: null,
        },
        categories: {
            type: Array,
            default: () => [],
        },
        isSaving: {
            type: Boolean,
            default: false,
        }
    })

    const emit = defineEmits(['submit', 'cancel'])

    function emptyForm() {
        return {
            name: '',
            description: '',
            categoryId: '',
            price: '',
            imageUrl: '',
            status: true,
        }
    }

    const form = reactive(emptyForm())

    watch(
        () => [props.product, props.categories],
        () => {
            const product = props.product
            const categoryId = props.categories.find(
                (category) => category.id === product?.categoryId || category.name === product?.category
            )?.id

            Object.assign(
                form,
                product
                    ? {
                        name: product.name,
                        description: product.description,
                        categoryId: categoryId ?? '',
                        price: product.price,
                        imageUrl: product.imageUrl,
                        status: product.status,
                    }
                : emptyForm()
            )
        },
        { immediate: true }
    )

    function submitForm() {
        emit('submit', {
            name: form.name.trim(),
            description: form.description.trim(),
            categoryId: Number(form.categoryId),
            price: Number(form.price),
            imageUrl: form.imageUrl.trim(),
            status: form.status,
        })
    }

</script>

<template>
    <section class="admin-product-form">
        <header class="admin-product-form__header">
            <h2>{{ product ? 'Editar producto' : 'Añadir producto' }}</h2>
            <button type="button" aria-label="Cerrar" @click="emit('cancel')">
                x
            </button>
        </header>

        <form action="" class="admin-product-form__fields" @submit.prevent="submitForm">
            <label>
                Nombre
                <input v-model="form.name" required />
            </label>

            <label>
                Descripción
                <textarea v-model="form.description" required rows="3"></textarea>
            </label>

            <label>
                Categoría
                <select v-model="form.categoryId" required>
                    <option disabled value="">Selecciona una categoría</option>
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>
            </label>

            <label>
                URL de imagen
                <input v-model="form.imageUrl" type="text" required>
            </label>

            <label>
                Precio (€)
                <input
                    v-model="form.price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                />
            </label>

            <label class="admin-product-form__status">
                <input v-model="form.status" type="checkbox" />
                En servicio
            </label>

            <footer class="admin-product-form__actions">
                <button type="button" @click="emit('cancel')">Cancelar</button>
                <button type="submit" :disabled="isSaving">
                    {{ isSaving ? 'Guardando...' : 'Guardar' }}
                </button>
            </footer>
        </form>
    </section>
</template>

<style scoped>
@reference '../../main.css';


.admin-product-form {
    @apply
    w-full rounded-xl
    bg-bg-container p-6
    shadow-lg
}

.admin-product-form__header {
    @apply
    mb-6 flex items-center
    justify-between border-b
    border-border-default pb-4;
}

.admin-product-form__header h2 {
    @apply
    font-display text-2xl font-bold
    text-text-brand;
}

.admin-product-form__header button {
    @apply
    cursor-pointer border-0 bg-transparent
    text-2xl text-text-muted
    hover:text-text-brand;
}

.admin-product-form__fields {
    @apply
    grid gap-4
    md:grid-cols-2;
}

.admin-product-form__fields label {
    @apply
    flex flex-col gap-1
    font-body text-sm font-semibold
    text-text-default;
}

.admin-product-form__fields label:nth-child(2) {
    @apply md:col-span-2;
}

.admin-product-form__fields input:not([type='checkbox']),
.admin-product-form__fields textarea,
.admin-product-form__fields select {
    @apply
    w-full rounded-lg
    border border-border-default bg-bg-input p-3
    font-body text-sm text-text-default outline-none
    focus:border-border-brand;
}

.admin-product-form__status {
    @apply
    flex-row items-center gap-2;
}

.admin-product-form__status input {
    @apply
    h-4 w-4 accent-bg-special;
}

.admin-product-form__actions {
    @apply
    flex justify-end gap-3
    md:col-span-2;
}

.admin-product-form__actions button {
    @apply
    cursor-pointer rounded-lg px-5 py-2.5
    font-body text-sm font-semibold
    transition-colors;
}

.admin-product-form__actions button:first-child {
    @apply
    border border-border-brand bg-transparent
    text-text-brand
    hover:bg-bg-container-high;
}

.admin-product-form__actions button:last-child {
    @apply
    border-0 bg-bg-brand text-text-on-brand
    hover:bg-bg-brand-darker;
}
</style>
