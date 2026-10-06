const BASE_URL = import.meta.env.VITE_API_URL

function buildUrl(path) {
    return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

async function apiPost(path, body) {
    const response = await fetch(buildUrl(path), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        const error = new Error(`Error al enviar a ${path}: ${response.status}`)
        error.status = response.status
        throw error
    }
    return response.json()
}

function mapItems(items) {
    return items.map((item) => ({
        productId: item.id,
        quantity: item.quantity
    }))
}

export async function createPaymentIntent(items) {
    return apiPost('api/v1/payments/create-intent', { items: mapItems(items) })
}

export async function createOrder({ items, orderTypeName, paymentMethodName, tabletId, paymentIntentId }) {
    const body = {
        tabletId,
        orderTypeName,
        paymentMethodName,
        items: mapItems(items)
    }

    if (paymentIntentId !== undefined) {
        body.paymentIntentId = paymentIntentId
    }

    return apiPost('api/v1/orders', body)
}
