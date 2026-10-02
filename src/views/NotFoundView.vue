<script setup>
import MainHeader from '../components/common/MainHeader.vue';
import notFoundIcon from '../assets/notfound.svg'
</script>

<template>
    <MainHeader />
    <main class="min-h-[calc(100vh-88px)] flex items-center justify-center px-8">
        <section class="flex flex-col items-center text-center max-w-3xl gap-5">
            <img :src="notFoundIcon" alt="" class="w-20 h-20">
            <h1 class="font-display text-5xl text-text-brand font-bold">
                ¡Página no encontrada!
            </h1>
            <p class="text-text-muted text-xl max-w-2xl">
                Lo sentimos, la página que buscas no existe o ha sido trasladada. Es posible que el enlace esté roto o haya caducado.
            </p>
            <RouterLink to="/" class="bg-bg-brand text-text-on-brand px-14 py-3 rounded-md font-semibold inline-flex items-center gap-2 transition-colors hover:bg-bg-brand-darker">
                Volver a la página principal <span aria-hidden="true" class="text-2xl">→</span>
            </RouterLink>
        </section>
    </main>
</template>