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
})
