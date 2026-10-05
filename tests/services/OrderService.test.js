import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchOrders, updateOrderStatus } from '../../src/services/OrderService'

beforeEach(() => {
    global.fetch = vi.fn()
})

describe('OrderService', () => {
    it('fetches orders from API', async () => {
        const orders = [{ id: 1, statusName: 'PENDING' }]

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(orders),
        })

        const result = await fetchOrders()

        expect(fetch).toHaveBeenCalledWith(
            `${import.meta.env.VITE_API_URL}/api/v1/orders`,
            { headers: expect.any(Object) }
        )
        expect(result).toEqual(orders)
    })

    it('throws an error when fetching orders fails', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 500,
        })

        await expect(fetchOrders()).rejects.toThrow('Error al obtener pedidos: 500')
    })

    it('updates order status', async () => {
        const updatedOrder = {
            id: 5,
            statusName: 'ACCEPTED',
        }

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(updatedOrder),
        })

        const result = await updateOrderStatus(5, 'ACCEPTED')

        expect(fetch).toHaveBeenCalledWith(
            `${import.meta.env.VITE_API_URL}/api/v1/orders/5/status`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ statusName: 'ACCEPTED' }),
            },
        )

        expect(result).toEqual(updatedOrder)
    })

    it('throws an error when updating order status fails', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 403,
        })

        await expect(updateOrderStatus(5, 'ACCEPTED')).rejects.toThrow(
            'Error al actualizar estado: 403',
        )
    })
})