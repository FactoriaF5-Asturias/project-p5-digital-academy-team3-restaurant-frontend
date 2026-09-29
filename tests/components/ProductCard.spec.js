import { mount } from "@vue/test-utils";
import { describe } from "vitest";
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

})