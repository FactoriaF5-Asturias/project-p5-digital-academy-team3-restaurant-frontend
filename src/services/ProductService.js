const API_URL = import.meta.env.VITE_API_URL

export async function getProducts() {
    const response = await fetch(API_URL + '/api/v1/products')
    if (!response.ok) {
        throw new Error('Error al cargar productos: ' + response.status)
    }
    return response.json()
}

export async function getCategories() {
    const response = await fetch(`${API_URL}/api/v1/categories`)

    if (!response.ok) {
        throw new Error(`Error al cargar categorías: ${response.status}`)
    }

    return response.json()
}

export async function updateProducts(productId, productData) {
    const response = await fetch(`${API_URL}/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })

    if (!response.ok) {
        throw new Error(`Error al actualizar producto: ${response.status}`)
    }

    return response.status === 204 ? null : response.json()
}