<script setup>
    
</script>

<template>
    <header>
        <div>
            <RouterLink to="/home">
                <img src="/src/assets/bella_vita_logo.png" alt="Logotipo de Bella Vita">
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
                    <RouterLink to="/cart">
                        <img src="/src/assets/cart.svg" alt="Icono de carrito">
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/profile">
                        <img src="/src/assets/profile.svg" alt="">
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
</style>