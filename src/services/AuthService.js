const BASE_URL = import.meta.env.VITE_API_URL

export async function login(username, password) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    if (!response.ok) {
        const error = new Error('Login failed')
        error.status = response.status
        throw error
    }
    return response.json()
}