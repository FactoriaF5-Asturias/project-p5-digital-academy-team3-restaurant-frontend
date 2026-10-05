import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { ref } from 'vue'
import CartPageView from '../../src/views/CartPageView.vue'
import { createOrder } from '../../src/services/CartService.js'

const cartState = { items: ref([]), incrementQty: vi.fn(), decrementQty: vi.fn(), removeItem: vi.fn(), clearCart: vi.fn() }
const push = vi.fn()
vi.mock('../../src/composables/useCart.js', () => ({ useCart: () => cartState }))
vi.mock('../../src/services/CartService.js', () => ({ createOrder: vi.fn() }))
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))

describe('CartPageView', () => {
    beforeEach(() => {
        cartState.items.value = []
        vi.clearAllMocks()
    })

    it('shows the empty cart state', () => {
        const wrapper = mount(CartPageView, { global: { stubs: ['MainHeader', 'MainFooter'] } })
        expect(wrapper.find('.empty-cart').exists()).toBe(true)
    })

    it('shows cart contents and submits checkout', async () => {
        cartState.items.value = [{ id: 4, name: 'Pizza', price: 10, quantity: 2 }]
        createOrder.mockResolvedValue({ id: 25 })
        const wrapper = mount(CartPageView, { global: { stubs: ['MainHeader', 'MainFooter'] } })
        expect(wrapper.text()).toContain('Pizza')
        expect(wrapper.text()).toContain('23,50')
        await wrapper.get('.cart-summary_checkout').trigger('click')
        await flushPromises()
        expect(createOrder).toHaveBeenCalledWith({
            items: cartState.items.value,
            orderTypeName: 'DINE IN', paymentMethodName: 'CASH', tabletId: 2,
        })
        expect(cartState.clearCart).toHaveBeenCalled()
        expect(push).toHaveBeenCalledWith('/order-success/25')
    })

    it('shows checkout failure without clearing cart', async () => {
        cartState.items.value = [{ id: 4, name: 'Pizza', price: 10, quantity: 1 }]
        createOrder.mockRejectedValue(new Error('Offline'))
        const wrapper = mount(CartPageView, { global: { stubs: ['MainHeader', 'MainFooter'] } })
        await wrapper.get('.cart-summary_checkout').trigger('click')
        await flushPromises()
        expect(wrapper.text()).toContain('No se pudo enviar el pedido')
        expect(cartState.clearCart).not.toHaveBeenCalled()
    })
})
