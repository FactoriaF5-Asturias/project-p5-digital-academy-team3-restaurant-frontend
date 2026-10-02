<script setup>
import MainHeader from '../components/common/MainHeader.vue';
import MainFooter from '../components/common/MainFooter.vue';
import loginPhoto from '../assets/login-photo.jpg';
import eyeIcon from '../assets/eye.svg'
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth.js';
import { useRouter } from 'vue-router';

const user = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isSubmitting = ref(false)
const submitError = ref(null)

function togglePassword() { showPassword.value = !showPassword.value }
</script>

<template>
    <MainHeader />
    <main>
        <div class="grid grid-cols-1 py-16 md:py-0 md:grid-cols-2 md:min-h-full">
            <div class="overflow-hidden md:min-h-[calc(100vh-88px)]">
                <img :src="loginPhoto" alt="Foto de comida italiana" class="w-full h-full object-cover hidden md:block">
            </div>
            <div class="flex items-center justify-center px-8 md:px-20">
                <form class="w-full max-w-md space-y-5">
                    <h1 class="font-display text-3xl text-text-brand font-bold">Iniciar sesión</h1>
                    <p class="text-text-muted text-base">Accede a tu cuenta para gestionar tus pedidos y disfrutar de ofertas exclusivas.</p>
                    <div class="flex flex-col gap-2">
                        <label for="user" class="text-sm font-semibold text-text-default uppercase tracking-wide">USUARIO</label>
                        <input id="user" v-model="user" type="text" class="w-full p-3 rounded-md border border-border-default bg-bg-input text-text-default focus:outline-none focus:border-border-brand" placeholder="Tu usuario">
                    </div>
                    <div class="flex flex-col gap-2">
                        <div>
                            <label for="password" class="text-sm font-semibold text-text-default uppercase tracking-wide">CONTRASEÑA</label>
                        </div>
                        <div class="relative">
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" class="w-full p-3 rounded-md border border-border-default bg-bg-input text-text-default focus:outline-none focus:border-border-brand">
                            <button type="button" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"  @click="togglePassword">
                                <img :src="eyeIcon" alt="">
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <input id="remember" v-model="rememberMe" type="checkbox" class="accent-bg-brand w-4 h-4">
                        <label for="remember" class="text-sm font-semibold text-text-default">Recordarme</label>
                    </div>
                    <button type="submit" class="w-full bg-bg-brand-darker text-text-on-brand py-3 rounded-md font-semibold transition-colors hover:bg-bg-brand">Iniciar sesión</button>
                </form>
            </div>
        </div>
    </main>
    <MainFooter />
</template>