import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CartErrorState from '../../src/components/CartErrorState.vue'

describe('CartErrorState', () => {
    it('has role="alert" so the screen readers can announce them', () => {
        const wrapper = mount(CartErrorState)
        expect(wrapper.get('.cart-error').attributes('role')).toBe('alert')
    })

    it('uses default message while "prop" message is not being thrown', () => {
        const wrapper = mount(CartErrorState)
        expect(wrapper.get('.cart-error_message').text()).toBe('No se pudo cargar tu cesta. Inténtalo de nuevo.')
    })

    it('shows personalized message received via props', () => {
        const wrapper = mount(CartErrorState, {
            props: { message: 'Error de red, comprueba tu conexión.' }
        })
        expect(wrapper.get('.cart-error_message').text()).toBe('Error de red, comprueba tu conexión.')
    })

    it('emits "retry" once the button is pressed', async () => {
        const wrapper = mount(CartErrorState)

        await wrapper.get(".cart-error_retry").trigger('click')

        expect(wrapper.emitted("retry")).toHaveLength(1)
    })
})