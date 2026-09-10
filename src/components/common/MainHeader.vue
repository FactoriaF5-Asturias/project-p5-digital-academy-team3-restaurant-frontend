<script setup>
    import { ref } from 'vue';

    import restaurantLogo from '../../assets/bella_vita_logo.png'
    import cartIcon from '../../assets/cart.svg'
    import profileIcon from '../../assets/profile.svg'

    const counter = ref(0)
</script>

<template>
    <header class="flex justify-between items-center p-4">
        <div>
            <RouterLink class="flex items-center gap-2" to="/home" aria-label="Ir a página principal">
                <img class="h-7" :src="restaurantLogo" alt="">
                <span>Bella Vita</span>
            </RouterLink>
        </div>
        <nav class="flex items-center gap-4">
            <ul class="flex items-center gap-2">
                <li>
                    <RouterLink to="/login">
                        Login
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/register">
                        Register
                    </RouterLink>
                </li>
            </ul>
            <ul class="flex items-center gap-2">
                <li>
                    <RouterLink class="relative rounded-full h-7 w-7 flex items-center justify-center" to="/cart" aria-label="Ir al carrito">
                        <img class="h-5" :src="cartIcon" alt="">
                        <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-semibold flex items-center justify-center">
                            {{ counter }}
                        </span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="rounded-full h-7 w-7 flex items-center justify-center" to="/profile" aria-label="Ir al perfil">
                        <img class="h-5" :src="profileIcon" alt="">
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
</style>