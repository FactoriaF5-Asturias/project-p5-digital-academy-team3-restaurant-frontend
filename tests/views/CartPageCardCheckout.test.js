import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import CartPageView from '../../src/views/CartPageView.vue'
import { createOrder, createPaymentIntent } from '../../src/services/CartService.js'

const cartState = { items: ref([]), incrementQty: vi.fn(), decrementQty: vi.fn(), removeItem: vi.fn(), clearCart: vi.fn() }
const push = vi.fn()
const pay = vi.fn()
const isReady = ref(true)

vi.mock('@stripe/stripe-js', () => ({ loadStripe: vi.fn() }))
vi.mock('../../src/composables/useCart.js', () => ({ useCart: () => cartState }))
vi.mock('../../src/services/CartService.js', () => ({ createOrder: vi.fn(), createPaymentIntent: vi.fn() }))
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))

const CardPaymentFormStub = defineComponent({
    name: 'CardPaymentForm',
    setup(_, { expose }) {
        expose({ pay, isReady })
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
    isReady.value = true
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

    it('disables the pay button until the card form is ready', async () => {
        isReady.value = false
        const wrapper = mountView()
        await chooseCard(wrapper)
        expect(wrapper.get('.cart-summary_checkout').attributes('disabled')).toBeDefined()
        isReady.value = true
        await flushPromises()
        expect(wrapper.get('.cart-summary_checkout').attributes('disabled')).toBeUndefined()
    })

    it('creates no order when the payment status is not succeeded', async () => {
        pay.mockResolvedValue({ paymentIntent: { status: 'requires_action' } })
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(createOrder).not.toHaveBeenCalled()
        expect(wrapper.get('[role="alert"]').text()).toContain('El pago no se ha completado')
        expect(cartState.clearCart).not.toHaveBeenCalled()
    })

    it('retries the order with the paid intent without paying again', async () => {
        createOrder.mockRejectedValueOnce(Object.assign(new Error('boom'), { status: 500 }))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(wrapper.get('[role="alert"]').text()).toContain('El pago se ha realizado pero el pedido no se ha confirmado')
        expect(cartState.clearCart).not.toHaveBeenCalled()

        await checkout(wrapper)
        expect(createPaymentIntent).toHaveBeenCalledTimes(1)
        expect(pay).toHaveBeenCalledTimes(1)
        expect(createOrder).toHaveBeenCalledTimes(2)
        expect(createOrder).toHaveBeenLastCalledWith(expect.objectContaining({
            paymentMethodName: 'CARD',
            paymentIntentId: 'pi_1',
        }))
        expect(cartState.clearCart).toHaveBeenCalled()
        expect(push).toHaveBeenCalledWith('/order-success/25')
    })

    it('locks payment method and cart while a paid order is pending retry', async () => {
        createOrder.mockRejectedValueOnce(new Error('timeout'))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        const radios = wrapper.findAll('input[name="payment"]')
        expect(radios[0].attributes('disabled')).toBeDefined()
        expect(wrapper.get('[aria-label="Aumentar cantidad de Pizza"]').attributes('disabled')).toBeDefined()
    })

    it('shows the already registered message when the retry gets 409', async () => {
        createOrder
            .mockRejectedValueOnce(new Error('timeout'))
            .mockRejectedValueOnce(Object.assign(new Error('conflict'), { status: 409 }))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        await checkout(wrapper)
        expect(wrapper.get('[role="alert"]').text())
            .toBe('El pedido ya se registró con este pago; avisa al personal si no aparece.')
        expect(cartState.clearCart).not.toHaveBeenCalled()
        expect(wrapper.findAll('input[name="payment"]')[0].attributes('disabled')).toBeUndefined()
    })

    it('uses a snapshot of the items for the intent and the order', async () => {
        const wrapper = mountView()
        await chooseCard(wrapper)
        createPaymentIntent.mockImplementation(async (sent) => {
            cartState.items.value[0].quantity = 9
            expect(sent).toEqual([{ id: 4, name: 'Pizza', price: 10, quantity: 2 }])
            return INTENT
        })
        await checkout(wrapper)
        expect(createOrder.mock.calls[0][0].items).toEqual([{ id: 4, name: 'Pizza', price: 10, quantity: 2 }])
    })

    it('disables inputs while submitting', async () => {
        pay.mockReturnValue(new Promise(() => {}))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await wrapper.get('.cart-summary_checkout').trigger('click')
        await flushPromises()
        wrapper.findAll('input[type="radio"]').forEach((radio) => expect(radio.attributes('disabled')).toBeDefined())
        expect(wrapper.get('[aria-label="Quitar Pizza de la cesta"]').attributes('disabled')).toBeDefined()
    })

    it('clears the error when the payment method changes', async () => {
        createPaymentIntent.mockRejectedValue(new Error('boom'))
        const wrapper = mountView()
        await chooseCard(wrapper)
        await checkout(wrapper)
        expect(wrapper.get('[role="alert"]').text()).not.toBe('')
        await wrapper.findAll('input[name="payment"]')[0].setValue(true)
        expect(wrapper.get('[role="alert"]').text()).toBe('')
    })

    it('keeps a permanent alert region for checkout errors', () => {
        const wrapper = mountView()
        expect(wrapper.get('[role="alert"]').text()).toBe('')
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
