<script setup>
    import { computed, ref } from 'vue';

    import restaurantLogo from '../../assets/bella_vita_logo.png'
    import cartIcon from '../../assets/cart.svg'
    import profileIcon from '../../assets/profile.svg'
    import { useCart } from '../../composables/useCart.js'
    import burgerIcon from '../../assets/burgermenu.svg'

    const { items } = useCart()

    const counter = computed(() =>
        items.value.reduce((total, items) => total + items.quantity, 0)
    )

    const isMenuOpen = ref(false)

    function toggleMenu() {
        isMenuOpen.value = !isMenuOpen.value;
    }
</script>

<template>
    <div class="sticky top-0 z-50">
        <header class="flex justify-between items-center px-7 sm:px-20 py-5 bg-bg-container text-text-brand shadow-sm">
            <div>
                <RouterLink class="flex items-center gap-2 hover:underline underline-offset-2 active:text-text-brand-darker" to="/" aria-label="Ir a página principal">
                    <img class="h-10" :src="restaurantLogo" alt="">
                    <span class="font-['Playfair-Display'] text-xl md:text-3xl font-bold">Giacobello</span>
                </RouterLink>
            </div>
            <nav class="flex items-center gap-6">
                <ul class="hidden md:flex items-center divide-x divide-border-brand">
                    <li class="px-3">
                        <RouterLink to="/login" class="hover:underline underline-offset-2 active:text-text-brand-darker">
                            Login
                        </RouterLink>
                    </li>
                    <li class="px-3">
                        <RouterLink to="/register" class="hover:underline underline-offset-2 active:text-text-brand-darker">
                            Register
                        </RouterLink>
                    </li>
                </ul>
                <ul class="flex items-center gap-4 md:gap-6">
                    <li>
                        <RouterLink class="relative rounded-full h-9 w-9 flex items-center justify-center bg-bg-container-high transition-opacity hover:opacity-70" to="/cart" aria-label="Ir al carrito">
                            <img class="h-5" :src="cartIcon" alt="">
                            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-semibold bg-bg-brand text-text-on-brand flex items-center justify-center">
                                {{ counter }}
                            </span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink class="relative rounded-full h-9 w-9 flex items-center justify-center bg-bg-brand transition-opacity hover:opacity-70" to="/profile" aria-label="Ir al perfil">
                            <img class="h-4" :src="profileIcon" alt="">
                        </RouterLink>
                    </li>
                </ul>
                <button type="button" class="md:hidden" aria-label="Abrir menú" @click="toggleMenu">
                    <img class="h-5" :src="burgerIcon">
                </button>
            </nav>
        </header>
        <div v-if="isMenuOpen" class="md:hidden absolute top-full right-0 w-64 bg-bg-brand text-text-on-brand flex flex-col items-end gap-4 px-7 py-5 shadow-md" data-testid="mobile-menu">
            <RouterLink class="w-1/2 text-right active:text-text-brand-darker" to="/login" @click="isMenuOpen = false">Login</RouterLink>
            <div class="w-full h-px bg-white"></div>
            <RouterLink class="w-1/2 text-right active:text-text-brand-darker" to="/register" @click="isMenuOpen = false">Register</RouterLink>
        </div>
    </div>
</template>