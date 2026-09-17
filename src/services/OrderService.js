export async function fetchOrders() {
    const response = await fetch('/api/v1/orders')

    if (!response.ok) {
        throw new Error(`Error al obtener pedidos: ${response.status}`)
    }

    return response.json()
}