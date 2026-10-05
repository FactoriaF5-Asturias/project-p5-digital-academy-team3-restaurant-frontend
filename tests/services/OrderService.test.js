import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchOrders, updateOrderStatus, payOrder } from '../../src/services/OrderService'

beforeEach(() => {
    global.fetch = vi.fn()
    localStorage.clear()
})

describe('OrderService', () => {
    it('fetches orders from API', async () => {
        const orders = [{ id: 1, statusName: 'PENDING' }]

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(orders),
        })

        localStorage.setItem('giacobello-token', 'test-token')

        const result = await fetchOrders()

        expect(fetch).toHaveBeenCalledWith(
            `${import.meta.env.VITE_API_URL}/api/v1/orders`,
            {
                headers: {
                    Authorization: 'Bearer test-token',
                },
            },
        )

        expect(result).toEqual(orders)
     })

    it('marks order as paid', async () => {
        const invoice = {
            id: 10,
            orderId: 5,
            totalAmount: 25,
        }

        fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(invoice),
        })

        localStorage.setItem('giacobello-token', 'test-token')

        const result = await payOrder(5)

        expect(fetch).toHaveBeenCalledWith(
            `${import.meta.env.VITE_API_URL}/api/v1/orders/5/pay`,
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer test-token',
                },
            },
        )

        expect(result).toEqual(invoice)
     })

    it('throws an error when paying order fails', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 409,
        })

        await expect(payOrder(5)).rejects.toThrow(
            'Error al marcar pedido como pagado: 409',
        )
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

        localStorage.setItem('giacobello-token', 'test-token')

        const result = await updateOrderStatus(5, 'ACCEPTED')

        expect(fetch).toHaveBeenCalledWith(
            `${import.meta.env.VITE_API_URL}/api/v1/orders/5/status`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer test-token',
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