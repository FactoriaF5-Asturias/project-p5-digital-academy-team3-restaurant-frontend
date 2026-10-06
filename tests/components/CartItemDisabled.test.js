import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CartItem from '../../src/components/CartItem.vue'
import CartItemsSection from '../../src/components/CartItemsSection.vue'

const item = { id: 1, name: 'Pizza', description: 'Margarita', price: 10, quantity: 2, image: 'p.png' }

describe('CartItem disabled state', () => {
    it('keeps quantity and remove controls enabled by default', () => {
        const wrapper = mount(CartItem, { props: { item } })
        wrapper.findAll('button').forEach((button) => expect(button.attributes('disabled')).toBeUndefined())
    })

    it('disables quantity and remove controls when disabled', () => {
        const wrapper = mount(CartItem, { props: { item, disabled: true } })
        expect(wrapper.findAll('button')).toHaveLength(3)
        wrapper.findAll('button').forEach((button) => expect(button.attributes('disabled')).toBeDefined())
    })

    it('passes disabled down from the items section', () => {
        const wrapper = mount(CartItemsSection, { props: { items: [item], disabled: true } })
        expect(wrapper.get('[aria-label="Aumentar cantidad de Pizza"]').attributes('disabled')).toBeDefined()
    })
})
