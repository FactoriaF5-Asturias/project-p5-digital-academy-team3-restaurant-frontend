<script setup>
    import { ref } from 'vue';

    import restaurantLogo from '../../assets/bella_vita_logo.png'
    import cartIcon from '../../assets/cart.svg'
    import profileIcon from '../../assets/profile.svg'

    const counter = ref(0)
</script>

<template>
    <header class="flex justify-between items-center p-10 bg-bg-container text-text-brand">
        <div>
            <RouterLink class="flex items-center gap-2" to="/home" aria-label="Ir a página principal">
                <img class="h-10" :src="restaurantLogo" alt="">
                <span class="font-['Playfair-Display'] text-3xl font-bold">Bella Vita</span>
            </RouterLink>
        </div>
        <nav class="flex items-center gap-6">
            <ul class="flex items-center divide-x divide-border-brand">
                <li class="px-3">
                    <RouterLink to="/login">
                        Login
                    </RouterLink>
                </li>
                <li class="px-3">
                    <RouterLink to="/register">
                        Register
                    </RouterLink>
                </li>
            </ul>
            <ul class="flex items-center gap-6">
                <li>
                    <RouterLink class="relative rounded-full h-9 w-9 flex items-center justify-center bg-bg-container-high" to="/cart" aria-label="Ir al carrito">
                        <img class="h-5" :src="cartIcon" alt="">
                        <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-semibold bg-bg-brand text-text-on-brand flex items-center justify-center">
                            {{ counter }}
                        </span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="relative rounded-full h-9 w-9 flex items-center justify-center bg-bg-brand" to="/profile" aria-label="Ir al perfil">
                        <img class="h-4" :src="profileIcon" alt="">
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>