const API_URL = import.meta.env.VITE_API_URL

export async function fetchOrders() {
    const response = await fetch(API_URL + '/api/v1/orders')

    if (!response.ok) {
        throw new Error(`Error al obtener pedidos: ${response.status}`)
    }

    return response.json()
}