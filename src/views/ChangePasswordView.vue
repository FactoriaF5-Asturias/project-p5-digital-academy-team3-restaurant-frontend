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
</script>