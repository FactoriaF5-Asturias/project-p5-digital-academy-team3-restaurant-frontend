import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AdminOrders from '../../../src/components/admin/AdminOrders.vue'
import { fetchOrders } from '../../../src/services/OrderService.js'

vi.mock('../../../src/services/OrderService.js', () => ({ fetchOrders: vi.fn(), updateOrderStatus: vi.fn() }))
vi.mock('../../../src/composables/useAuth.js', () => ({ useAuth: () => ({ token: { value: 'admin-token' } }) }))

describe('AdminOrders', () => {
    it('loads and displays completed and cancelled orders', async () => {
        fetchOrders.mockResolvedValue([
            { id: 1, statusName: 'COMPLETED', orderTypeName: 'DINE IN', createdAt: '2026-09-25T10:00:00', items: [] },
            { id: 2, statusName: 'PENDING', orderTypeName: 'TAKEAWAY', createdAt: '2026-09-25T11:00:00', items: [] },
        ])
        const wrapper = mount(AdminOrders)
        await flushPromises()
        expect(fetchOrders).toHaveBeenCalledWith('admin-token')
        expect(wrapper.text()).toContain('Pedido #1')
        expect(wrapper.text()).not.toContain('Pedido #2')
    })

    it('shows empty and error states', async () => {
        fetchOrders.mockResolvedValueOnce([])
        const empty = mount(AdminOrders)
        await flushPromises()
        expect(empty.text()).toContain('No hay pedidos.')

        fetchOrders.mockRejectedValueOnce(new Error('Offline'))
        const failed = mount(AdminOrders)
        await flushPromises()
        expect(failed.text()).toContain('Offline')
    })
})
