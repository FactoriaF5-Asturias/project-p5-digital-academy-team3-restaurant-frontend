const API_URL = import.meta.env.VITE_API_URL

export async function getProducts() {
    const response = await fetch(API_URL + '/api/v1/products')
    if (!response.ok) {
        throw new Error('Error al cargar productos: ' + response.status)
    }
    return response.json()
}