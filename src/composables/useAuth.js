import { ref, computed } from 'vue'
import { login as loginService } from '../services/AuthService.js'

const STORAGE_KEY = 'giacobello-token'

const token = ref(localStorage.getItem(STORAGE_KEY) || null)
const user = ref(null)

function decodeToken(t) {
    const payload = t.split('.')[1]
    return JSON.parse(atob(payload))
}

function setToken(t) {
    token.value = t
    localStorage.setItem(STORAGE_KEY, t)
    user.value = decodeToken(t)
}

function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
}

if (token.value) {
    user.value = decodeToken(token.value)
}

export function useAuth() {
    const isAuthenticated = computed(() => !!token.value)

    async function login(username, password) {
        const response = await loginService(username, password)
        setToken(response.token)
    }

    function logout() {
        clearAuth()
    }

    function hasRole(role) {
        return user.value?.roles?.includes(role) ?? false
    }

    return { token, user, isAuthenticated, login, logout, hasRole }
}