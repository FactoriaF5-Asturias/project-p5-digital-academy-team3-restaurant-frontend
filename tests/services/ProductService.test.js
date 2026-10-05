import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
    createProduct,
    deleteProduct,
    getAdminProducts,
    getCategories,
    getProducts,
    updateProducts,
} from '../../src/services/ProductService.js'

beforeEach(() => { global.fetch = vi.fn() })

describe('ProductService', () => {
    it('loads public products', async () => {
        const products = [{ id: 1, name: 'Pizza' }]
        fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(products) })
        await expect(getProducts()).resolves.toEqual(products)
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/v1/products`)
    })

    it('loads admin products with bearer token', async () => {
        fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) })
        await getAdminProducts('token-123')
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/v1/admin/products`, {
            headers: { Authorization: 'Bearer token-123' },
        })
    })

    it('loads categories', async () => {
        const categories = [{ id: 2, name: 'Pasta' }]
        fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(categories) })
        await expect(getCategories()).resolves.toEqual(categories)
    })

    it('updates a product with JSON and supports an empty 204 response', async () => {
        fetch.mockResolvedValue({ ok: true, status: 204 })
        await expect(updateProducts(4, { name: 'New' }, 'token-123')).resolves.toBeNull()
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/v1/products/4`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer token-123' },
            body: JSON.stringify({ name: 'New' }),
        })
    })

    it('creates a product and parses the response', async () => {
        const product = { id: 3, name: 'Pizza' }
        fetch.mockResolvedValue({ ok: true, status: 201, json: () => Promise.resolve(product) })
        await expect(createProduct(product, 'token-123')).resolves.toEqual(product)
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer token-123' },
            body: JSON.stringify(product),
        })
    })

    it('deletes a product', async () => {
        fetch.mockResolvedValue({ ok: true })
        await expect(deleteProduct(8, 'token-123')).resolves.toBeUndefined()
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/v1/products/8`, {
            method: 'DELETE',
            headers: { Authorization: 'Bearer token-123' },
        })
    })

    it.each([
        ['getProducts', () => getProducts(), 'Error al cargar productos: 500'],
        ['getAdminProducts', () => getAdminProducts('t'), /500/],
        ['getCategories', () => getCategories(), /500/],
        ['updateProducts', () => updateProducts(1, {}, 't'), 'Error al actualizar producto: 500'],
        ['deleteProduct', () => deleteProduct(1, 't'), /500/],
        ['createProduct', () => createProduct({}, 't'), 'Error al crear producto: 500'],
    ])('%s rejects on an unsuccessful response', async (_name, call, error) => {
        fetch.mockResolvedValue({ ok: false, status: 500 })
        await expect(call()).rejects.toThrow(error)
    })
})
