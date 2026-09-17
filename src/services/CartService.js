const BASE_URL = import.meta.env.VITE_API_URL

function buildUrl(path) {
    return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

async function apiGet(path) {
    const response = await fetch(buildUrl(path))
    if (!response.ok) {
        throw new Error(`Error al obtener ${path}: ${response.status}`)
    }
    return response.json()
}

async function apiPost(path, body) {
    const response = await fetch(buildUrl(path), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error(`Error al enviar a ${path}: ${response.status}`)
    }
    return response.json()
}

export async function fetchProducts() {
    return apiGet('api/v1/products')
}

export async function createOrder({ items, orderTypeName, paymentMethodName, tabletId }) {
    const body = {
        tabletId,
        orderTypeName,
        paymentMethodName,
        items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity
        }))
    }

    return apiPost('api/v1/orders', body)
}
