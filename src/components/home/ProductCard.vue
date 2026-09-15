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
    <article class="bg-bg-container rounded-xl shadow-sm overflow-hidden">
        <img src="../../assets/lasagna.jpg" :alt="name" class="w-full object-cover aspect-video">
        <div class="p-4 space-y-2">
            <h3>
                {{ name }}Lasagna Tradizionale
            </h3>
            <p>
                {{ description }} Capas de pasta fresca al huevo, ragú de ternera de cocción lenta, bechamel de
            </p>
            <div>
                <div>
                    <button type="button" @click="decrease">
                        -
                    </button>
                    <span>
                        {{ quantity }}
                    </span>
                    <button type="button" @click="increase">
                        +
                    </button>
                </div>
                <p>
                    {{ price }} 15,50 €
                </p>
            </div>
            <button type="button" @click="addToCart">
                <img :src="addToCartIcon" alt="">
                Añadir a la cesta
            </button>
        </div>
    </article>
</template>