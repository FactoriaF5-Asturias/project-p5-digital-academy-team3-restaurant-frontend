import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import CardPaymentForm from '../../src/components/CardPaymentForm.vue'
import { getStripe } from '../../src/services/StripeService.js'

vi.mock('../../src/services/StripeService.js', () => ({ getStripe: vi.fn() }))

let cardElement
let handlers
let stripe

beforeEach(() => {
    handlers = {}
    cardElement = {
        mount: vi.fn(),
        destroy: vi.fn(),
        on: vi.fn((event, handler) => { handlers[event] = handler }),
    }
    stripe = {
        elements: vi.fn(() => ({ create: vi.fn(() => cardElement) })),
        confirmCardPayment: vi.fn(),
    }
    getStripe.mockResolvedValue(stripe)
})

describe('CardPaymentForm', () => {
    it('mounts the card element with an accessible label', async () => {
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        expect(cardElement.mount).toHaveBeenCalled()
        expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe('card-element-label')
        expect(wrapper.get('#card-element-label').text()).toBe('Datos de la tarjeta')
    })

    it('shows Stripe validation errors as alerts', async () => {
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        handlers.change({ error: { message: 'Número de tarjeta incompleto' } })
        await flushPromises()
        expect(wrapper.get('[role="alert"]').text()).toBe('Número de tarjeta incompleto')
        handlers.change({})
        await flushPromises()
        expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    })

    it('destroys the card element on unmount', async () => {
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        wrapper.unmount()
        expect(cardElement.destroy).toHaveBeenCalled()
    })

    it('confirms the card payment with the client secret', async () => {
        stripe.confirmCardPayment.mockResolvedValue({ paymentIntent: { status: 'succeeded' } })
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        const result = await wrapper.vm.pay('secret_1')
        expect(stripe.confirmCardPayment).toHaveBeenCalledWith('secret_1', {
            payment_method: { card: cardElement },
        })
        expect(result.paymentIntent.status).toBe('succeeded')
    })

    it('shows the Stripe error when confirmation fails', async () => {
        stripe.confirmCardPayment.mockResolvedValue({ error: { message: 'Tarjeta rechazada' } })
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        const result = await wrapper.vm.pay('secret_1')
        await flushPromises()
        expect(result.error.message).toBe('Tarjeta rechazada')
        expect(wrapper.get('[role="alert"]').text()).toBe('Tarjeta rechazada')
    })

    it('shows an error when Stripe is unavailable', async () => {
        getStripe.mockResolvedValue(null)
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        expect(wrapper.get('[role="alert"]').exists()).toBe(true)
        const result = await wrapper.vm.pay('secret_1')
        expect(result.error).toBeDefined()
    })

    it('exposes isReady once the element is mounted', async () => {
        const wrapper = mount(CardPaymentForm)
        expect(wrapper.vm.isReady).toBe(false)
        await flushPromises()
        expect(wrapper.vm.isReady).toBe(true)
    })

    it('does not mount an element when unmounted while Stripe loads', async () => {
        let resolveStripe
        getStripe.mockReturnValue(new Promise((resolve) => { resolveStripe = resolve }))
        const wrapper = mount(CardPaymentForm)
        wrapper.unmount()
        resolveStripe(stripe)
        await flushPromises()
        expect(stripe.elements).not.toHaveBeenCalled()
        expect(cardElement.mount).not.toHaveBeenCalled()
    })

    it('shows a load error and stays not ready when Stripe fails to load', async () => {
        getStripe.mockRejectedValue(new Error('blocked'))
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        expect(wrapper.get('[role="alert"]').text()).toBe('No se pudo cargar el pago con tarjeta')
        expect(wrapper.vm.isReady).toBe(false)
    })

    it('shows an error when confirmCardPayment rejects', async () => {
        stripe.confirmCardPayment.mockRejectedValue(new Error('network'))
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        const result = await wrapper.vm.pay('secret_1')
        await flushPromises()
        expect(result.error).toBeDefined()
        expect(wrapper.get('[role="alert"]').exists()).toBe(true)
    })

    it('clears the previous error when paying again', async () => {
        stripe.confirmCardPayment
            .mockResolvedValueOnce({ error: { message: 'Tarjeta rechazada' } })
            .mockResolvedValueOnce({ paymentIntent: { status: 'succeeded' } })
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        await wrapper.vm.pay('s')
        await flushPromises()
        await wrapper.vm.pay('s')
        await flushPromises()
        expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    })

    it('does not use a label element for the card field heading', async () => {
        const wrapper = mount(CardPaymentForm)
        await flushPromises()
        expect(wrapper.find('label').exists()).toBe(false)
    })
})
