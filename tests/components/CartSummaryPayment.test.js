import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CartSummary from '../../src/components/CartSummary.vue'

function mountSummary(props = {}) {
    return mount(CartSummary, {
        props: { subtotal: 20, total: 20, deliveryMethod: 'dine-in', ...props },
        slots: { 'payment-details': '<div class="slot-content">card</div>' },
    })
}

describe('CartSummary payment method selector', () => {
    it('renders cash and card options with cash selected by default', () => {
        const wrapper = mountSummary()
        const options = wrapper.findAll('.cart-summary_payment-option')
        const radios = wrapper.findAll('input[name="payment"]')
        expect(options.map((o) => o.text())).toEqual(['Efectivo', 'Tarjeta'])
        expect(radios[0].element.checked).toBe(true)
        expect(radios[1].element.checked).toBe(false)
    })

    it('emits update:paymentMethod when card is chosen', async () => {
        const wrapper = mountSummary()
        await wrapper.findAll('input[name="payment"]')[1].setValue(true)
        expect(wrapper.emitted('update:paymentMethod')).toEqual([['card']])
    })

    it('disables the card option and explains why when card is unavailable', () => {
        const wrapper = mountSummary({ cardAvailable: false })
        const radios = wrapper.findAll('input[name="payment"]')
        expect(radios[0].attributes('disabled')).toBeUndefined()
        expect(radios[1].attributes('disabled')).toBeDefined()
        expect(wrapper.get('.cart-summary_payment-note').text()).toContain('no está disponible')
    })

    it('renders the payment-details slot', () => {
        expect(mountSummary().find('.slot-content').exists()).toBe(true)
    })

    it('links the disabled card option to its explanation', () => {
        const wrapper = mountSummary({ cardAvailable: false })
        const describedBy = wrapper.findAll('input[name="payment"]')[1].attributes('aria-describedby')
        expect(wrapper.get(`#${describedBy}`).text()).toContain('no está disponible')
    })

    it('disables every radio while controlsDisabled is set', () => {
        const wrapper = mountSummary({ controlsDisabled: true })
        const radios = wrapper.findAll('input[type="radio"]')
        expect(radios).toHaveLength(4)
        radios.forEach((radio) => expect(radio.attributes('disabled')).toBeDefined())
    })

    it('locks the payment method to card when lockPaymentMethod is set', () => {
        const wrapper = mountSummary({ lockPaymentMethod: true, paymentMethod: 'card' })
        const radios = wrapper.findAll('input[name="payment"]')
        expect(radios[0].attributes('disabled')).toBeDefined()
        expect(radios[1].attributes('disabled')).toBeUndefined()
    })
})
