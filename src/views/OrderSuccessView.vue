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
    <main class="min-h-screen">
        <section class="flex flex-col items-center text-center max-w-2xl">
            <img :src="orderCheck" alt="" class="w-16 h-16 mb-5">
            <h1 class="font-display text-4xl text-text-brand font-bold mb-4">
                ¡Pedido {{formattedOrderNumber}} realizado con éxito!
            </h1>
            <p class="text-text-muted text-lg max-w-1/4">
                Gracias, hemos recibido tu pedido y el equipo ya está preparándolo en cocina. Ya puedes realizar el pago en caja.
            </p>
            <RouterLink to="/" class="bg-bg-brand-darker text-text-on-brand px-5 py-5 rounded-lg font-semibold inline-flex items-center transition-colors hover:bg-bg-brand">
                Seguir comprando →
            </RouterLink>
        </section>
    </main>
</template>