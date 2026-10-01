<script setup>
    import MainHeader from "../components/common/MainHeader.vue";
    import { useRoute } from "vue-router";
    import orderCheck from "../assets/ordercheck.svg"
    import { computed } from "vue";

    const route = useRoute()

    const formattedOrderNumber = computed(() => `#P5-${route.params.id}`)
</script>

<template>
    <MainHeader />
    <main>
        <section>
            <img :src="orderCheck" alt="">
            <h1>
                ¡Pedido {{formattedOrderNumber}} realizado con éxito!
            </h1>
            <p>
                Gracias, hemos recibido tu pedido y el equipo ya está preparándolo en cocina. Ya puedes realizar el pago en caja.
            </p>
            <RouterLink to="/">
                Seguir comprando →
            </RouterLink>
        </section>
    </main>
</template>