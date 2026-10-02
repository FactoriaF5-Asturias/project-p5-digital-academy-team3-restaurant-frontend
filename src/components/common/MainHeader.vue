<script setup>
    import { computed } from 'vue';

    import restaurantLogo from '../../assets/bella_vita_logo.png'
    import cartIcon from '../../assets/cart.svg'
    import profileIcon from '../../assets/profile.svg'
    import { useCart } from '../../composables/useCart.js'
    import { useAuth } from '../../composables/useAuth.js';
    import { useRouter } from 'vue-router';

    const { items } = useCart()

    const counter = computed(() =>
        items.value.reduce((total, items) => total + items.quantity, 0)
    )

    const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()

    const profileRoute = computed(() => {
        if (user.value?.roles?.includes('ADMIN')) return '/admin'
        if (user.value?.roles?.includes('KITCHEN')) return '/kitchen'
        return '/'
    })

    function handleLogout() {
        logout()
        router.push('/')
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
            <nav class="flex items-center gap-4">
                <ul class="flex items-center">
                    <li v-if="isAuthenticated" class="px-3">
                        <button type="button" class="hover:underline underline-offset-2 active:text-text-brand-darker" @click="handleLogout">
                            Logout
                        </button>
                    </li>
                    <li v-else class="px-3">
                        <RouterLink to="/login" class="hover:underline underline-offset-2 active:text-text-brand-darker">
                            Login
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
                    <li v-if="isAuthenticated">
                        <RouterLink class="relative rounded-full h-9 w-9 flex items-center justify-center bg-bg-brand transition-opacity hover:opacity-70" :to="profileRoute" aria-label="Ir al perfil">
                            <img class="h-4" :src="profileIcon" alt="">
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
</template>