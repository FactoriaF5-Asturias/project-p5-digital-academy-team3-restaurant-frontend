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
    <main class="min-h-screen flex items-center justify-center px-8">
        <section class="flex flex-col items-center text-center max-w-3xl gap-5">
            <img :src="orderCheck" alt="" class="w-20 h-20">
            <h1 class="font-display text-5xl text-text-brand font-bold">
                ¡Pedido {{formattedOrderNumber}} realizado con éxito!
            </h1>
            <p class="text-text-muted text-xl max-w-2xl">
                Gracias, hemos recibido tu pedido y el equipo ya está preparándolo en cocina. Ya puedes realizar el pago en caja.
            </p>
            <RouterLink to="/" class="bg-bg-brand text-text-on-brand px-14 py-3 rounded-md font-semibold inline-flex items-center transition-colors hover:bg-bg-brand-darker">
                Seguir comprando →
            </RouterLink>
        </section>
    </main>
</template>