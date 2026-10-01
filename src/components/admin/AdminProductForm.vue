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
                (category) => category.name === product?.category
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
        { inmediate: true }
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

            <label class="admin-product-form__status">
                <input v-model="form.status" type="checkbox" />
                En servicio
            </label>

            <footer class="admin-product-form__actions">
                <button type="button" @click="emit('cancel')">Cancelar</button>
                <button type="submit">Guardar</button>
            </footer>
        </form>
    </section>
</template>