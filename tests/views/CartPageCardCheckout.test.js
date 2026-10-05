import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import CartPageView from '../../src/views/CartPageView.vue'
import { createOrder, createPaymentIntent } from '../../src/services/CartService.js'

const cartState = { items: ref([]), incrementQty: vi.fn(), decrementQty: vi.fn(), removeItem: vi.fn(), clearCart: vi.fn() }
const push = vi.fn()
const pay = vi.fn()

vi.mock('@stripe/stripe-js', () => ({ loadStripe: vi.fn() }))
vi.mock('../../src/composables/useCart.js', () => ({ useCart: () => cartState }))
vi.mock('../../src/services/CartService.js', () => ({ createOrder: vi.fn(), createPaymentIntent: vi.fn() }))
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))

const CardPaymentFormStub = defineComponent({
    name: 'CardPaymentForm',
    setup(_, { expose }) {
        expose({ pay })
        return () => null
    },
})

const INTENT = { paymentIntentId: 'pi_1', clientSecret: 'secret_1', amount: 20 }

function mountView() {
    return mount(CartPageView, {
        global: { stubs: { MainHeader: true, MainFooter: true, CardPaymentForm: CardPaymentFormStub } },
    })
}

async function chooseCard(wrapper) {
    await wrapper.findAll('input[name="payment"]')[1].setValue(true)
}

async function checkout(wrapper) {
    await wrapper.get('.cart-summary_checkout').trigger('click')
    await flushPromises()
}

beforeEach(() => {
    vi.stubEnv('VITE_STRIPE_PUBLISHABLE_KEY', 'pk_test_123')
    vi.clearAllMocks()
    cartState.items.value = [{ id: 4, name: 'Pizza', price: 10, quantity: 2 }]
    createPaymentIntent.mockResolvedValue(INTENT)
    pay.mockResolvedValue({ paymentIntent: { status: 'succeeded' } })
    createOrder.mockResolvedValue({ id: 25 })
})

afterEach(() => {
    vi.unstubAllEnvs()
})

describe('CartPageView card checkout', () => {
    it('keeps cash checkout unchanged', async () => {
        const wrapper = mountView()
        await checkout(wrapper)
        expect(createPaymentIntent).not.toHaveBeenCalled()
        expect(pay).not.toHaveBeenCalled()
        expect(createOrder).toHaveBeenCalledWith({
            items: cartState.items.value,
            orderTypeName: 'DINE IN',
            paymentMethodName: 'CASH',
            tabletId: 2,
        })
        expect(cartState.clearCart).toHaveBeenCalled()
        expect(push).toHaveBeenCalledWith('/order-success/25')
    })

    it('pays by card, creates the order with the payment intent and clears the cart', async () => {
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(createPaymentIntent).toHaveBeenCalledWith(cartState.items.value)
        expect(pay).toHaveBeenCalledWith('secret_1')
        expect(createOrder).toHaveBeenCalledWith({
            items: cartState.items.value,
            orderTypeName: 'DINE IN',
            paymentMethodName: 'CARD',
            tabletId: 2,
            paymentIntentId: 'pi_1',
        })
        expect(cartState.clearCart).toHaveBeenCalled()
        expect(push).toHaveBeenCalledWith('/order-success/25')
    })

    it('keeps the cart and creates no order when Stripe rejects the card', async () => {
        pay.mockResolvedValue({ error: { message: 'Tarjeta rechazada' } })
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(createOrder).not.toHaveBeenCalled()
        expect(cartState.clearCart).not.toHaveBeenCalled()
        expect(push).not.toHaveBeenCalled()
    })

    it('shows the refund message and keeps the cart on 409 after payment', async () => {
        createOrder.mockRejectedValue(Object.assign(new Error('conflict'), { status: 409 }))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(wrapper.get('[role="alert"]').text())
            .toBe('No se pudo crear el pedido; el pago se ha devuelto. Revisa la cesta.')
        expect(cartState.clearCart).not.toHaveBeenCalled()
    })

    it('shows the unavailable message on 503 when creating the intent', async () => {
        createPaymentIntent.mockRejectedValue(Object.assign(new Error('down'), { status: 503 }))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(wrapper.get('[role="alert"]').text())
            .toBe('El pago con tarjeta no está disponible ahora mismo; puedes pagar en efectivo.')
        expect(pay).not.toHaveBeenCalled()
        expect(createOrder).not.toHaveBeenCalled()
    })

    it('shows a generic error for other failures', async () => {
        createPaymentIntent.mockRejectedValue(new Error('boom'))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(wrapper.get('[role="alert"]').text()).toContain('No se pudo enviar el pedido')
    })

    it('prevents double submit while processing', async () => {
        let release
        pay.mockReturnValue(new Promise((resolve) => { release = resolve }))
        const wrapper = mountView()
        await chooseCard(wrapper)
        const button = wrapper.get('.cart-summary_checkout')
        await button.trigger('click')
        await flushPromises()
        expect(button.attributes('disabled')).toBeDefined()
        await button.trigger('click')
        expect(createPaymentIntent).toHaveBeenCalledTimes(1)
        release({ paymentIntent: { status: 'succeeded' } })
        await flushPromises()
        expect(createOrder).toHaveBeenCalledTimes(1)
    })

    it('disables the card option when no publishable key is configured', () => {
        vi.stubEnv('VITE_STRIPE_PUBLISHABLE_KEY', '')
        const wrapper = mountView()
        const radios = wrapper.findAll('input[name="payment"]')
        expect(radios).toHaveLength(2)
        expect(radios[1].attributes('disabled')).toBeDefined()
        expect(radios[0].element.checked).toBe(true)
    })
})
