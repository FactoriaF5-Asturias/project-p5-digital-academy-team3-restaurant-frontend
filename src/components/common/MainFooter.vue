<script setup>
    import restaurantLogo from '../../assets/bella_vita_logo.png'

</script>

<template>
    <footer class="flex justify-between items-center px-20 py-5 bg-bg-container text-text-muted shadow-sm">
        <div>
            <RouterLink class="flex items-center gap-2 hover:underline underline-offset-2 active:text-text-brand" to="/" aria-label="Ir a página principal">
                <img class="h-7" :src="restaurantLogo" alt="">
                <span class="font-['Playfair-Display'] text-xl font-bold">Giacobello</span>
            </RouterLink>
        </div>
        <span>
            © 2026 Bella Vita Gastronomía Italiana
        </span>
    </footer>
</template>