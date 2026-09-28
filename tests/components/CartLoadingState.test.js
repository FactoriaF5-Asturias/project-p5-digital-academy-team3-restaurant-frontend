import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CartLoadingState from '../../src/components/CartLoadingState.vue'

describe('CartLoadingState', () => {
    it('it has role=status and aria-live="polite" for accesibility', () => {
        const wrapper = mount(CartLoadingState)
        const root = wrapper.get('.cart-loading')
        expect(root.attributes('role')).toBe('status')
        expect(root.attributes('aria-live')).toBe('polite')
    })

    it('includes an accesible for screen readers message', () => {
        const wrapper = mount(CartLoadingState)
        expect(wrapper.get('.sr-only').text()).toBe('Cargando tu cesta...')
    })

    it('renders 3 itmes placeholders while it loads', () => {
        const wrapper = mount(CartLoadingState)
        expect(wrapper.findAll('.cart-loading_item')).toHaveLength(3)
    })
    
    it('each placeholder contains an image, itle, description and simulated prices', () => {
        const wrapper = mount(CartLoadingState)
        const first = wrapper.findAll('.cart-loading_item')[0]

        expect(first.find('.cart-loading_img').exists()).toBe(true)
        expect(first.find('.cart-loading_line--title').exists()).toBe(true)
        expect(first.find('.cart-loading_line--desc').exists()).toBe(true)
        expect(first.find('.cart-loading_line--price').exists()).toBe(true)
    })
})