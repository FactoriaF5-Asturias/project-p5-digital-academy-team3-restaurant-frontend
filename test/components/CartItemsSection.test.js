import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CartItemsSection from '../../src/components/CartItemsSection.vue'
import CartItem from '../../src/components/CartItem.vue'

function makeItems() {
    return [
        {
            id: 1,
            name: 'Pizza',
            description: 'Con queso',
            price: 9,
            quantity: 1,
            image: '/a.jpg'
        },
        {
            id: 2,
            name: 'Pasta',
            description: 'Con tomate',
            price: 8,
            quantity: 2,
            image: 'b.jpj'
        }
    ]
}

describe('CartItemsSection', () => {
    it('renders a CartItem per item received', () => {
        const wrapper = mount(CartItemsSection, { props: { items: makeItems() } })
        expect(wrapper.findAllComponents(CartItem)).toHaveLength(2)
    })

    it('does not render CartItem if cart is empty', () => {
        const wrapper = mount(CartItemsSection, { props: { items: [] } })
        expect(wrapper.findAllComponents(CartItem)).toHaveLength(0)
    })
})