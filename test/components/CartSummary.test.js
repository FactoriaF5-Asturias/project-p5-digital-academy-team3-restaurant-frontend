import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CartSummary from '../../src/components/CartSummary.vue'

function makeProps(overrides = {}) {
    return {
        subtotal: 20,
        shipping: 2.5,
        total: 22.5,
        deliveryMethod: 'takeaway',
        ...overrides
    }
}

describe('CartSummary', () => {
    it('shows subtotal, shipping and total formatted in euros', () => {
        const wrapper = mount(CartSummary, { props: makeProps() })
        const lines = wrapper.findAll('.cart-summary_line')

        expect(lines[0].get('dd').text()).toBe('20,00\u00A0€')
        expect(lines[1].get('dd').text()).toBe('2,50\u00A0€')
        expect(wrapper.get('.cart-summary_total-amount').text()).toContain('22,50\u00A0€')
    })

    it('renders the three delivery options', () => {
        const wrapper = mount(CartSummary, { props: makeProps() })
        const options = wrapper.findAll('.cart-summary_delivery-option')

        expect(options).toHaveLength(3)
        expect(options.map(o => o.text())).toEqual([
            'Comer en el restaurante',
            'Para llevar',
            'Envío a domicilio'
        ])
    })

    it('marks as selected the radius that corresponds to deliveryMethod', () => {
        const wrapper = mount(CartSummary, { props: makeProps({ deliveryMethod: 'delivery' }) })
        const radios = wrapper.findAll('input[type="radio"]')

        expect(radios[0].element.checked).toBe(false)
        expect(radios[1].element.checked).toBe(false)
        expect(radios[2].element.checked).toBe(true)
    })

    it('adds active class to selected option', () => {
        const wrapper = mount(CartSummary, { props: makeProps({ deliveryMethod: 'dine-in' }) })
        const options = wrapper.findAll('.cart-summary_delivery-option')

        expect(options[0].classes()).toContain('cart-summary_delivery-option--active')
        expect(options[1].classes()).not.toContain('cart-summary_delivery-option--active')
    })

    it('emits "update:deliveryMethod" when you swap options', async () => {
        const wrapper = mount(CartSummary, { props: makeProps({ deliveryMethod: 'takeaway'}) })
        const radios = wrapper.findAll('input[type="radio"')

        await radios[2].setValue(true)

        expect(wrapper.emitted('update:deliveryMethod')).toEqual([['delivery']])
    })

    it('emits "checkout" once you press "Realizar pedid" button', async () => {
        const wrapper = mount(CartSummary, { props: makeProps() })

        await wrapper.get('.cart-summary_checkout').trigger('click')

        expect(wrapper.emitted('checkout')).toHaveLength(1)
    })

    it('checkout button is not disabled by default', () => {
        const wrapper = mount(CartSummary, { props: makeProps() })
        expect(wrapper.get('.cart-summary_checkout').attributes('disabled')).toBeUndefined()
    })

    it('disables checkout button when disabled=true', () => {
        const wrapper = mount(CartSummary, { props: makeProps({ disabled: true }) })
        expect(wrapper.get('.cart-summary_checkout').attributes('disabled')).toBeDefined()
    })

    it('it does not emit "checkout" if button is disabled', async () => {
        const wrapper = mount(CartSummary, { props: makeProps({ disabled: true }) })

        await wrapper.get('.cart-summary_checkout').trigger('click')

        expect(wrapper.emitted('checkout')).toBeUndefined()
    })
})