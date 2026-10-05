import { ref, watch, computed } from 'vue'

const STORAGE_KEY = 'giacobello-cart'

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch (err) {
        console.error('No se pudo leer el carrito de localStorage:', err)
        return []
    }
}

const items = ref(loadFromStorage())

watch (
    items,
    (newItems) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
        } catch (err) {
            console.error('No se pudo guardar el carrito en localStorage:', err)
        }
    },
    { deep: true }
)

export function useCart() {
    function addToCart(product, quantity = 1) {
        const existing = items.value.find((item) => item.id === product.id)
        if (existing) {
            existing.quantity += quantity
        } else {
            items.value.push({ ...product, quantity })
        }
    }

    function incrementQty(id) {
        const item = items.value.find((i) => i.id === id)
        if (item) item.quantity++
    }

    function decrementQty(id) {
        const item = items.value.find((i) => i.id === id)
        if (item && item.quantity > 1) item.quantity--
    }

    function removeItem(id) {
        items.value = items.value.filter((item) => item.id !== id)
    }

    function clearCart() {
        items.value = []
    }

    const subtotal = computed(() => 
        items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    return {
        items,
        subtotal,
        addToCart,
        incrementQty,
        decrementQty,
        removeItem,
        clearCart
    }
}