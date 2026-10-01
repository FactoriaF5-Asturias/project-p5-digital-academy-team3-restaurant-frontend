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