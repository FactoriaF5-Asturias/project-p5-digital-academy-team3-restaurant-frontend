import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EmptyCart from '../../src/components/EmptyCart.vue'

describe('EmptyCart', () => {
    it('shows the empty cart message', () => {
        const wrapper = mount(EmptyCart)
        expect(wrapper.get('h2').text()).toBe('Tu cesta está vacía')
        expect(wrapper.get('.empty-cart_message').text()).toContain('no has añadido ningún producto')
    })

    it('renders the icon with a descriptive alt', () => {
        const wrapper = mount(EmptyCart)
        const icon = wrapper.get('.empty-cart_icon')
        expect(icon.attributes('alt')).toBe('cart')
    })
})