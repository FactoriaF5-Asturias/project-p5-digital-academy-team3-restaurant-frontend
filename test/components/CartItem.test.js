import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CartItem from '../../src/components/CartItem.vue'

function makeItem(overrides = {}) {
    return {
        id: 1,
        name: 'Pizza Margharita',
        description: 'Tomate, mozzarella y albahaca fresca',
        price: 9.95,
        quantity: 2,
        image: '/img/pizza.jpg',
        ...overrides
    }
}

describe('CartItem', () => {
    it('renders name, description and product image', () => {
        const item = makeItem()
        const wrapper = mount(CartItem, { props: { item } })

        expect(wrapper.get('h2').text()).toBe(item.name)
        expect(wrapper.get('.cart-item_desc').text()).toBe(item.description)

        const img = wrapper.get('.cart-item_img')
        expect(img.attributes('src')).toBe(item.image)
        expect(img.attributes('alt')).toBe(item.name)
    })

    it('formats price as euro currency (es-ES)', () => {
        const item = makeItem({ price: 9.95 })
        const wrapper = mount(CartItem, { props: { item } })

        const expected = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(item.price)

        expect(wrapper.get('.cart-item_price').text()).toBe(expected)
    })
    
    it('shows actual quantity', () => {
        const item = makeItem({ quantity: 3 })
        const wrapper = mount(CartItem, { props: { item } })

        expect(wrapper.get('.qty-control_value').text()).toBe('3')
    })

    it('disables "-" button when quantity is 1', () => {
        const item = makeItem({ quantity: 2 })
        const wrapper = mount(CartItem, { props: { item } })

        const buttons = wrapper.findAll('.qty-control_btn')
        expect(buttons[0].attributes('disabled')).toBeUndefined()
    })

    it('disables "-" button when quantity is higher than 1', () => {
        const item = makeItem({ quantity: 2 })
        const wrapper = mount(CartItem, { props: { item } })

        const buttons = wrapper.findAll('.qty-control_btn')
        expect(buttons[0].attributes('disabled')).toBeUndefined()
    })

    it('emits "increment" with product id', async () => {
        const item = makeItem({ id: 42 })
        const wrapper = mount(CartItem, { props: { item } })

        const buttons = wrapper.findAll('.qty-control_btn')
        await buttons[1].trigger('click')

        expect(wrapper.emitted('increment')).toEqual([[42]])
    })

    it('emits "decrement" with product id', async () => {
        const item = makeItem({ id: 42, quantity: 2 })
        const wrapper = mount(CartItem, { props: { item } })

        const buttons = wrapper.findAll('.qty-control_btn')
        await buttons[0].trigger('click')

        expect(wrapper.emitted('decrement')).toEqual([[42]])
    })
})