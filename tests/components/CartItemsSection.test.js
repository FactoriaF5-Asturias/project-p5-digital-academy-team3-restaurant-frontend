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

    it('it passes the correct item as a pro to each CartItem', () => {
        const items = makeItems()
        const wrapper = mount(CartItemsSection, { props: { items } })

        const cartItems = wrapper.findAllComponents(CartItem)
        expect(cartItems[0].props('item')).toEqual(items[0])
        expect(cartItems[1].props('item')).toEqual(items[1])
    })

    it('reemits "increment" of a CartItem son', async () => {
        const wrapper = mount(CartItemsSection, { props: { items: makeItems() } })

        await wrapper.findAllComponents(CartItem)[1].vm.$emit('increment', 1)

        expect(wrapper.emitted('increment')).toEqual([[1]])
    })

    it('reemits "decrement" of a CartItem son', async () => {
        const wrapper = mount(CartItemsSection, { props: { items: makeItems() } })

        await wrapper.findAllComponents(CartItem)[1].vm.$emit('decrement', 2)

        expect(wrapper.emitted('decrement')).toEqual([[2]])
    })

    it('reemits "remove" from a CartItem son', async () => {
        const wrapper = mount(CartItemsSection, { props: { items: makeItems() } })
        
        await wrapper.findAllComponents(CartItem)[0].vm.$emit('remove', 1)

        expect(wrapper.emitted('remove')).toEqual([[1]])
    })

    it('emits "continue-shopping" once the button "Seguir comprando" is pressed', async () => {
        const wrapper = mount(CartItemsSection, { props: { items: makeItems() } })

        await wrapper.findAllComponents(CartItem)[1].vm.$emit('decrement', 2)

        expect(wrapper.emitted('decrement')).toEqual([[2]])
    })
})