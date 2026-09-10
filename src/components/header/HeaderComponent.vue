<script setup>
    import restaurantLogo from '../assets/bella_vita_logo.png'
    import cartIcon from '../assets/cart.svg'
    import profileIcon from '../assets/profile.svg'
</script>

<template>
    <header>
        <div>
            <RouterLink to="/home" aria-label="Logo del restaurante, ir a página principal">
                <img :src="restaurantLogo" alt="">
                <span>Bella Vita</span>
            </RouterLink>
        </div>
        <nav>
            <ul>
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
            <ul>
                <li>
                    <RouterLink to="/cart" aria-label="Ir al carrito">
                        <img :src="cartIcon" alt="">
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/profile" aria-label="Ir al perfil">
                        <img :src="profileIcon" alt="">
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
</style>