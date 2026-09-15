<script setup>
import { ref } from 'vue';


const counter = ref(0)

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
                <button type="button">
                    -
                </button>
                <span>
                    {{ counter }}
                </span>
                <button type="button">
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