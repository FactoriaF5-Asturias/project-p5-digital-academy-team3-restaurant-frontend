// El archivo podrá ser borrado una vez el endpoint esté activo.
// Este archivo sirve únicamente como servicio temporal de mockeo para poder
// desarrollar el frontend sin tener que depender del trabajo de backend y
// bloquear el trabajo.
//
// Este archivo NO podrá utilizarse de base en un futuro cartService o productService.
// Una vez el endpoint esté activo deberemos:
//      1. Sustituir el cuerpo de fetchItems() por la llamada real
// o bien:
//      2. Eliminar este archivo y sustituirlo por el servicio real
//         que consuma la API de productos o carrito.

const USE_MOCK = true // TODO: Eliminar este archivo una vez exista el endpoint real
const MOCK_DELAY_MS = 600

const mockItems = [
    {
        id: 1,
        name: 'Lasagna al Modelo-Vista-Controladorú',
        description: 'Capas de pasta fresca con ragú de carne, bechamel, tomate y parmesano. Todo perfectamente atomizado paras que el tomate no conozca nuestro modelo de negocio',
        price: 14.50,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop'
    },
    {
        id: 2,
        name: 'Parmigiana di Dockerananze',
        description: 'Capas de berenjena, salsa de tomate, mozzarella, albahaca y parmesano, horneadas en un contenedor para no chamuscar la cocina',
        price: 13,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop'
    },
    {
        id: 3, 
        name: 'Limonata Siciliana',
        description: 'Refresencante limonada artesanal pero con un nombre más molón',
        price: 4.50,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop'
    }
]

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchCartItem() {
    if (USE_MOCK) {
        await delay(MOCK_DELAY_MS)
        return mockItems.map((item) => ({ ...item }))
    }

    const response = await fetch ('/api/cart')

    if (!response.ok) {
        throw new Error(`Error al obtener el carrito: ${response.status}`)
    }
    return response.json()
}
