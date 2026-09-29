import { mount } from "@vue/test-utils";
import { beforeEach, describe, vi } from "vitest";
import MenuSection from "../../src/components/home/MenuSection.vue";
import { getProducts } from "../../src/services/ProductService.js";
import { useCart } from "../../src/composables/useCart.js";

vi.mock("../../src/services/ProductService.js", () => ({
    getProducts: vi.fn()
}))

describe('MenuSection', () => {

    const mockProducts = [
        { id: 1, name: 'Pizza Margherita', description: 'Salsa de tomate', category: 'Especialidades', price: 12.5, imageUrl: '/x.jpg' },
        { id: 2, name: 'Tiramisú', description: 'Postre italiano', category: 'Postres', price: 7.5, imageUrl: '/y.jpg' },
    ]

    function mountSection() {
        return mount(MenuSection)
    }

    beforeEach(() => {
        localStorage.clear()
        const { clearCart } = useCart()
        clearCart()
        getProducts.mockReset()
        getProducts.mockResolvedValue(mockProducts)
    })

})