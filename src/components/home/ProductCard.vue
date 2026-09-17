<script setup>
import { ref } from 'vue';
import addToCartIcon from '../../assets/addtocart.svg'
import { useCart } from '../../composables/useCart.js'

const { addToCart } = useCart()

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
})

function getFullImageUrl(relativePath) {
  return import.meta.env.VITE_API_URL + relativePath
}

const quantity = ref(1)

// function addToCart() {
//     emit('add-to-cart', { id: props.id, quantity: quantity.value })
//     quantity.value = 1
// }

function handleAddToCart() {
    addToCart({ id: props.id, name: props.name, price: props.price,imageUrl: props.imageUrl}, quantity.value)
    quantity.value = 1
}

function increase() {
    quantity.value++;
}

function decrease() {
    if (quantity.value > 1) quantity.value--;
}

</script>

<template>
    <article class="bg-bg-container rounded-xl shadow-sm overflow-hidden">
        <img :src="getFullImageUrl(imageUrl)" :alt="name" class="w-full object-cover aspect-video">
        <div class="p-4 space-y-3">
            <h3 class="font-['Playfair-Display'] text-xl text-text-default font-bold">
                {{ name }}
            </h3>
            <p class="text-sm line-clamp-2 text-text-muted">
                {{ description }}
            </p>
            <div class="flex justify-between items-center">
                <div class="flex items-center h-8 justify-center bg-bg-container-high rounded-2xl overflow-hidden">
                    <button class="flex items-center justify-center flex-1 px-4 py-2 transition-colors hover:bg-bg-brand-darker hover:text-text-on-brand active:bg-bg-brand" type="button" @click="decrease">
                        -
                    </button>
                    <span class="min-w-7 text-center flex-1">
                        {{ quantity }}
                    </span>
                    <button class="flex items-center justify-center flex-1 px-4 py-2 transition-colors hover:bg-bg-brand-darker hover:text-text-on-brand active:bg-bg-brand" type="button" @click="increase">
                        +
                    </button>
                </div>
                <p class="font-['Playfair-Display'] text-xl text-text-special font-bold">
                    {{ price }} €
                </p>
            </div>
            <button class="w-full bg-bg-brand-darker text-text-on-brand inline-flex items-center justify-center gap-2 rounded-xl p-2 transition-colors hover:bg-bg-brand active:bg-bg-brand-hover" type="button" @click="handleAddToCart">
                <img :src="addToCartIcon" alt="">
                Añadir a la cesta
            </button>
        </div>
    </article>
</template>