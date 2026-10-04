const API_URL = import.meta.env.VITE_API_URL

function getAuthHeaders() {
    const token = localStorage.getItem('giacobello-token')

    return token
        ? { Authorization: `Bearer ${token}` }
        : {}
}

export async function fetchOrders() {
    const response = await fetch(API_URL + '/api/v1/orders', {
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Error al obtener pedidos: ${response.status}`)
    }

    return response.json()
}

export async function updateOrderStatus(orderId, statusName) {
  const response = await fetch(API_URL + `/api/v1/orders/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ statusName }),
  })

  if (!response.ok) {
    throw new Error(`Error al actualizar estado: ${response.status}`)
  }

  return response.json()
}
