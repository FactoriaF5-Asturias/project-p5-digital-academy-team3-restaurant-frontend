<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { useRouter } from 'vue-router'
import MainHeader from '../components/common/MainHeader.vue'
import MainFooter from '../components/common/MainFooter.vue'
import eyeIcon from '../assets/eye.svg'

const { changePassword } = useAuth()
const router = useRouter()

const username = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isSubmitting = ref(false)
const submitError = ref(null)

function togglePassword() { showPassword.value = !showPassword.value }

async function handleSubmit() {
    submitError.value = null

    if (newPassword.value !== confirmPassword.value) {
        submitError.value = 'Las contraseñas no coinciden'
        return
    }

    if (newPassword.value.length < 8) {
        submitError.value = 'La contraseña debe tener al menos 8 caracteres'
        return
    }

    isSubmitting.value = true
    try {
        await changePassword(username.value, currentPassword.value, newPassword.value)
        router.push('/admin/products')
    } catch (err) {
        if (err.status === 401) {
            submitError.value = 'Usuario o contraseña incorrectos'
        } else if (err.status === 400) {
            submitError.value = 'La nueva contraseña debe ser diferente a la actual'
        } else if (err.status === 409) {
            submitError.value = 'La contraseña no requiere cambio'
        } else {
            submitError.value = 'No se pudo cambiar la contraseña'
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <MainHeader />
        <main class="flex-1">
                <div class="flex items-center justify-center px-8 md:px-20">
                    <form class="w-full max-w-md space-y-5" @submit.prevent="handleSubmit">
                        <h1 class="font-display text-3xl text-text-brand font-bold">Cambio de contraseña</h1>
                        <p class="text-text-muted text-base">Es necesario cambiar tu contraseña la primera vez que inicias sesión como administrador.</p>
                        <div class="flex flex-col gap-2">
                            <div class="flex flex-col gap-2">
                                <label for="user" class="text-sm font-semibold text-text-default uppercase tracking-wide">USUARIO</label>
                                <input id="user" v-model="user" type="text" class="w-full p-3 rounded-md border border-border-default bg-bg-input text-text-default focus:outline-none focus:border-border-brand" placeholder="Tu usuario">
                            </div>
                            <div>
                                <label for="currentPassword" class="text-sm font-semibold text-text-default uppercase tracking-wide">CONTRASEÑA ACTUAL</label>
                            </div>
                            <div class="relative">
                                <input id="currentPassword" v-model="currentPassword" :type="showPassword ? 'text' : 'password'" class="w-full p-3 rounded-md border border-border-default bg-bg-input text-text-default focus:outline-none focus:border-border-brand">
                                <button type="button" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"  @click="togglePassword">
                                    <img :src="eyeIcon" alt="">
                                </button>
                            </div>
                            <div>
                                <label for="newPassword" class="text-sm font-semibold text-text-default uppercase tracking-wide">NUEVA CONTRASEÑA</label>
                            </div>
                            <div class="relative">
                                <input id="newPassword" v-model="newPassword" :type="showPassword ? 'text' : 'password'" class="w-full p-3 rounded-md border border-border-default bg-bg-input text-text-default focus:outline-none focus:border-border-brand">
                                <button type="button" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"  @click="togglePassword">
                                    <img :src="eyeIcon" alt="">
                                </button>
                            </div>
                            <div>
                                <label for="confirmPassword" class="text-sm font-semibold text-text-default uppercase tracking-wide">REPETIR CONTRASEÑA</label>
                            </div>
                            <div class="relative">
                                <input id="confirmPassword" v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" class="w-full p-3 rounded-md border border-border-default bg-bg-input text-text-default focus:outline-none focus:border-border-brand">
                                <button type="button" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"  @click="togglePassword">
                                    <img :src="eyeIcon" alt="">
                                </button>
                            </div>
                        </div>
                        <p v-if="submitError">{{ submitError }}</p>
                        <button type="submit" class="w-full bg-bg-brand-darker text-text-on-brand py-3 rounded-md font-semibold transition-colors hover:bg-bg-brand" :disabled="isSubmitting">Cambiar contraseña</button>
                    </form>
                </div>
        </main>
        <MainFooter />
    </div>
</template>