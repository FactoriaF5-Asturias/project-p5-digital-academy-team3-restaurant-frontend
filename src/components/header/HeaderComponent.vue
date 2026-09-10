<script setup>
</script>

<template>
    <header>
        <div>
            <RouterLink to="/home">
                <!-- <img src=""> /** -->
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

                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/profile">
                        
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
</style>