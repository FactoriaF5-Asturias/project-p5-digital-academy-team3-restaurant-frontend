<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { useRouter } from 'vue-router'

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