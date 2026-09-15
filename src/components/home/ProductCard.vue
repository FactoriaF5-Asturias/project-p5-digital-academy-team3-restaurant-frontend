<script setup>
import { ref } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
})

const quantity = ref(1)

function increase() {
    quantity.value++;
}

function decrease() {
    if (quantity.value > 1) quantity.value--;
}

</script>

<template>
    <article>
        <img src="" alt="">
        <h3>

        </h3>
        <p>

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

            </p>
        </div>
        <button type="button">
            Añadir a la cesta
        </button>
    </article>
</template>