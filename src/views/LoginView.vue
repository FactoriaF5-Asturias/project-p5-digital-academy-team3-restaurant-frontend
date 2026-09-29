<script setup>
import MainHeader from '../components/common/MainHeader.vue';
import loginPhoto from '../assets/login-photo.jpg';
import eyeIcon from '../assets/eye.svg'
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

function togglePassword() { showPassword.value = !showPassword.value }
</script>

<template>
    <MainHeader />
    <main class="min-h-screen">
        <div class="grid grid-cols-1 md:grid-cols-2 ">
            <div>
                <img :src="loginPhoto" alt="Foto de comida italiana" class="w-full h-full object-cover hidden md:block">
            </div>
            <div class="flex items-center justify-center px-20 max-w-md">
                <form>
                    <h1>Iniciar sesión</h1>
                    <p>Accede a tu cuenta para gestionar tus pedidos y disfrutar de ofertas exclusivas.</p>
                    <div>
                        <label for="email">EMAIL</label>
                        <input id="email" v-model="email" type="email" placeholder="tu@email.com">
                    </div>
                    <div>
                        <div>
                            <label for="password">CONTRASEÑA</label>
                        </div>
                        <div>
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'">
                            <button type="button" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"  @click="togglePassword">
                                <img :src="eyeIcon" alt="">
                            </button>
                        </div>
                    </div>
                    <div>
                        <input id="remember" v-model="rememberMe" type="checkbox">
                        <label for="remember">Recordarme</label>
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </div>
    </main>
</template>