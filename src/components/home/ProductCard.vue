<script setup>
import { ref } from 'vue';

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
    <article>
        <img :src="imageUrl" :alt="name">
        <h3>
            {{ name }}
        </h3>
        <p>
            {{ description }}
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
                {{ price }} €
            </p>
        </div>
        <button type="button" @click="addToCart">
            Añadir a la cesta
        </button>
    </article>
</template>