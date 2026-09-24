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
})