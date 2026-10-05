import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createOrder } from '../../src/services/CartService.js'

beforeEach(() => { global.fetch = vi.fn() })

describe('CartService', () => {
    it('creates an order with mapped product items', async () => {
        const order = { id: 12 }
        fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(order) })
        const result = await createOrder({
            items: [{ id: 3, quantity: 2, name: 'Pizza' }],
            orderTypeName: 'DINE IN',
            paymentMethodName: 'CASH',
            tabletId: 2,
        })
        expect(result).toEqual(order)
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/v1/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tabletId: 2,
                orderTypeName: 'DINE IN',
                paymentMethodName: 'CASH',
                items: [{ productId: 3, quantity: 2 }],
            }),
        })
    })

    it('throws when order creation fails', async () => {
        fetch.mockResolvedValue({ ok: false, status: 503 })
        await expect(createOrder({ items: [], orderTypeName: 'TAKEAWAY', paymentMethodName: 'CASH', tabletId: 1 }))
            .rejects.toThrow('Error al enviar a api/v1/orders: 503')
    })
})
