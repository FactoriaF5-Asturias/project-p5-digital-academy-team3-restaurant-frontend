import { describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import KitchenDashboardView from '../../src/views/KitchenDashboardView.vue'
import { fetchOrders, updateOrderStatus } from '../../src/services/OrderService.js'

vi.mock('../../src/services/OrderService.js', () => ({
    fetchOrders: vi.fn(),
    updateOrderStatus: vi.fn(),
}))

describe('KitchenDashboardView', () => {
    const orders = [
        {
            id: 1,
            tabletId: 2,
            orderTypeName: 'DINE IN',
            statusName: 'PENDING',
            createdAt: '2026-09-25T10:00:00',
            items: [
                {
                    id: 1,
                    productName: 'Pizza',
                    quantity: 2,
                },
            ],
        },
    ]

    it('loads and renders kitchen orders', async () => {
        fetchOrders.mockResolvedValue(orders)

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        expect(fetchOrders).toHaveBeenCalled()
        expect(wrapper.text()).toContain('Pedido #1')
        expect(wrapper.text()).toContain('Pizza')
    })

    it('shows error message when orders cannot be loaded', async () => {
        fetchOrders.mockRejectedValue(new Error('Request failed'))

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        expect(wrapper.text()).toContain('No se pudieron cargar los pedidos.')
    })

    it('updates order status when accept button is clicked', async () => {
        fetchOrders.mockResolvedValue(orders)
        updateOrderStatus.mockResolvedValue({})

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        await wrapper.find('.order-card__button--accept').trigger('click')

        expect(updateOrderStatus).toHaveBeenCalledWith(1, 'ACCEPTED')
    })

    it('updates order status when reject button is clicked', async () => {
        fetchOrders.mockResolvedValue(orders)
        updateOrderStatus.mockResolvedValue({})

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        await wrapper.find('.order-card__button--reject').trigger('click')

        expect(updateOrderStatus).toHaveBeenCalledWith(1, 'CANCELLED')
    })

    it('shows pending orders before accepted orders', async () => {
        fetchOrders.mockResolvedValue([
            {
                id: 1,
                tabletId: 2,
                orderTypeName: 'DINE IN',
                statusName: 'ACCEPTED',
                createdAt: '2026-09-25T10:00:00',
                items: [
                    {
                        id: 1,
                        productName: 'Accepted Pizza',
                        quantity: 1,
                    },
                ],
            },
            {
                id: 2,
                tabletId: 3,
                orderTypeName: 'DINE IN',
                statusName: 'PENDING',
                createdAt: '2026-09-25T09:00:00',
                items: [
                    {
                        id: 2,
                        productName: 'Pending Pasta',
                        quantity: 1,
                    },
                ],
            },
        ])

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        const text = wrapper.text()

        expect(text.indexOf('Pedido #2')).toBeLessThan(text.indexOf('Pedido #1'))
    })

    it('filters orders by pending status', async () => {
        fetchOrders.mockResolvedValue([
            {
                id: 1,
                tabletId: 2,
                orderTypeName: 'DINE IN',
                statusName: 'ACCEPTED',
                createdAt: '2026-09-25T10:00:00',
                items: [
                    {
                        id: 1,
                        productName: 'Accepted Pizza',
                        quantity: 1,
                    },
                ],
            },
            {
                id: 2,
                tabletId: 3,
                orderTypeName: 'DINE IN',
                statusName: 'PENDING',
                createdAt: '2026-09-25T09:00:00',
                items: [
                    {
                        id: 2,
                        productName: 'Pending Pasta',
                        quantity: 1,
                    },
                ],
            },
        ])

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        const statusFilters = wrapper.findAllComponents({ name: 'OrderFilter' })
        await statusFilters[1].vm.$emit('update:modelValue', 'PENDING')

        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Pedido #2')
        expect(wrapper.text()).not.toContain('Pedido #1')
    })

    it('filters orders by order type', async () => {
        fetchOrders.mockResolvedValue([
            {
                id: 1,
                tabletId: 2,
                orderTypeName: 'DINE IN',
                statusName: 'PENDING',
                createdAt: '2026-09-25T10:00:00',
                items: [
                    {
                        id: 1,
                        productName: 'Dine In Pizza',
                        quantity: 1,
                    },
                ],
            },
            {
                id: 2,
                tabletId: 3,
                orderTypeName: 'TAKEAWAY',
                statusName: 'PENDING',
                createdAt: '2026-09-25T09:00:00',
                items: [
                    {
                        id: 2,
                        productName: 'Takeaway Pasta',
                        quantity: 1,
                    },
                ],
            },
        ])

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        const orderTypeFilters = wrapper.findAllComponents({ name: 'OrderFilter' })
        await orderTypeFilters[0].vm.$emit('update:modelValue', 'TAKEAWAY')

        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Pedido #2')
        expect(wrapper.text()).not.toContain('Pedido #1')
    })

    it('shows empty message when there are no orders', async () => {
        fetchOrders.mockResolvedValue([])

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        expect(wrapper.text()).toContain('No hay pedidos.')
    })

    it('shows error message when order status cannot be updated', async () => {
        fetchOrders.mockResolvedValue(orders)
        updateOrderStatus.mockRejectedValue(new Error('Update failed'))

        const wrapper = mount(KitchenDashboardView)

        await flushPromises()

        await wrapper.find('.order-card__button--accept').trigger('click')
        await flushPromises()

        expect(wrapper.text()).toContain('No se pudo actualizar el estado del pedido.')
    })
})