const API_URL = import.meta.env.VITE_API_URL

function buildUrl(path) {
    return `${API_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export async function getProducts() {
    const response = await fetch(buildUrl('api/v1/products'))
    if (!response.ok) {
        throw new Error('Error al cargar productos: ' + response.status)
    }
    return response.json()
}