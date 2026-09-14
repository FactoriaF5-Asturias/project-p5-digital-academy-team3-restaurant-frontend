<script setup>
    import restaurantLogo from '../../assets/bella_vita_logo.png'

</script>

<template>
    <footer class="flex justify-between items-center px-10 py-5 bg-bg-container text-text-brand shadow-sm">
        <div>
            <RouterLink class="flex items-center gap-2" to="/home" aria-label="Ir a página principal">
                <img class="h-10" :src="restaurantLogo" alt="">
                <span class="font-['Playfair-Display'] text-3xl font-bold">Bella Vita</span>
            </RouterLink>
        </div>
        <span>
            © 2026 Bella Vita Gastronomía Italiana
        </span>
    </footer>
</template>