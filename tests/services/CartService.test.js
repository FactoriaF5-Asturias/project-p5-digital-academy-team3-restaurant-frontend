import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createOrder, createPaymentIntent } from '../../src/services/CartService.js'

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

    it('omits paymentIntentId from the order body when it is undefined', async () => {
        fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ id: 1 }) })
        await createOrder({ items: [], orderTypeName: 'DINE IN', paymentMethodName: 'CASH', tabletId: 2 })
        expect(JSON.parse(fetch.mock.calls[0][1].body)).not.toHaveProperty('paymentIntentId')
    })

    it('sends paymentIntentId in the order body when provided', async () => {
        fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ id: 1 }) })
        await createOrder({
            items: [{ id: 3, quantity: 2 }],
            orderTypeName: 'DINE IN',
            paymentMethodName: 'CARD',
            tabletId: 2,
            paymentIntentId: 'pi_123',
        })
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
            tabletId: 2,
            orderTypeName: 'DINE IN',
            paymentMethodName: 'CARD',
            items: [{ productId: 3, quantity: 2 }],
            paymentIntentId: 'pi_123',
        })
    })

    it('exposes the HTTP status on request errors', async () => {
        fetch.mockResolvedValue({ ok: false, status: 409 })
        await expect(createOrder({ items: [], orderTypeName: 'DINE IN', paymentMethodName: 'CARD', tabletId: 2 }))
            .rejects.toMatchObject({ status: 409 })
    })

    it('creates a payment intent with mapped items', async () => {
        const intent = { paymentIntentId: 'pi_1', clientSecret: 'secret', amount: 25 }
        fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(intent) })
        const result = await createPaymentIntent([{ id: 3, quantity: 2, name: 'Pizza' }])
        expect(result).toEqual(intent)
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/v1/payments/create-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: [{ productId: 3, quantity: 2 }] }),
        })
    })

    it('throws with status when the payment intent request fails', async () => {
        fetch.mockResolvedValue({ ok: false, status: 503 })
        await expect(createPaymentIntent([])).rejects.toMatchObject({ status: 503 })
    })
})
