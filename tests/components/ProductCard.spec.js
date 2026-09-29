import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProductCard from "../../src/components/home/ProductCard.vue"

describe('ProductCard', () => {

    function mountProductCard(propsOverride = {}) {
        const defaultProps = {
            id: 1,
            name: 'Pizza Margherita',
            description: 'Salsa de tomate',
            category: 'Especialidades',
            price: 12.5,
            imageUrl: '/images/products/Pizza_Margherita.jpg'
        }
        return mount(ProductCard, {
            props: {
                ...defaultProps,
                ...propsOverride
            }
        })
    }

    it('renderiza el nombre del producto', () => {
        const wrapper = mountProductCard()
        expect(wrapper.text()).toContain('Pizza Margherita')
    })

    it('renderiza la descripción del producto', () => {
        const wrapper = mountProductCard()
        expect(wrapper.text()).toContain('Salsa de tomate')
    })

    it('renderiza el precio del producto', () => {
        const wrapper = mountProductCard()
        expect(wrapper.text()).toContain('12.5')
    })

    it('renderiza la cantidad inicial a 1', () => {
        const wrapper = mountProductCard()
        expect(wrapper.find('[data-testid="quantity"]').text()).toBe('1')
    })

    it('incrementa la cantidad al pulsar +', async () => {
        const wrapper = mountProductCard()
        await wrapper.find('[data-testid="increase"]').trigger('click')
        expect(wrapper.find('[data-testid="quantity"]').text()).toBe('2')
    })

    it('decrementa la cantidad al pulsar -', async () => {
        const wrapper = mountProductCard()
        await wrapper.find('[data-testid="increase"]').trigger('click')
        await wrapper.find('[data-testid="decrease"]').trigger('click')
        expect(wrapper.find('[data-testid="quantity"]').text()).toBe('1')
    })

    it('no decrementa por debajo de 1', async () => {
        const wrapper = mountProductCard()
        await wrapper.find('[data-testid="decrease"]').trigger('click')
        expect(wrapper.find('[data-testid="quantity"]').text()).toBe('1')
    })

})