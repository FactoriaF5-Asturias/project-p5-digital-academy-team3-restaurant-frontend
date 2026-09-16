<script setup>
import { ref } from 'vue';
import addToCartIcon from '../../assets/addtocart.svg'

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

const emit = defineEmits(['add-to-cart'])

const quantity = ref(1)

function addToCart() {
    emit('add-to-cart', { id: props.id, quantity: quantity.value })
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
    <article class="bg-bg-container rounded-xl shadow-sm overflow-hidden max-w-72">
        <img src="../../assets/lasagna.jpg" :alt="name" class="w-full object-cover aspect-video">
        <div class="p-4 space-y-3">
            <h3 class="font-['Playfair-Display'] text-xl text-text-default font-bold">
                {{ name }}Lasagna Tradizionale
            </h3>
            <p class="text-sm line-clamp-2 text-text-brand">
                {{ description }} Capas de pasta fresca al huevo, ragú de ternera de cocción lenta, bechamel de
            </p>
            <div class="flex justify-between items-center">
                <div class="flex items-center justify-center gap-4 bg-bg-container-high rounded-2xl px-5 py-1">
                    <button class="" type="button" @click="decrease">
                        -
                    </button>
                    <span class="min-w-5 text-center">
                        {{ quantity }}
                    </span>
                    <button type="button" @click="increase">
                        +
                    </button>
                </div>
                <p class="font-['Playfair-Display'] text-xl text-text-special font-bold">
                    {{ price }} 15,50 €
                </p>
            </div>
            <button class="w-full bg-bg-brand text-text-on-brand inline-flex items-center justify-center gap-2 rounded-xl p-2" type="button" @click="addToCart">
                <img :src="addToCartIcon" alt="">
                Añadir a la cesta
            </button>
        </div>
    </article>
</template>