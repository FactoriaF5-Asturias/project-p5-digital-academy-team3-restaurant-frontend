import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
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

    it('muestra cargando al iniciar', () => {
        const wrapper = mountSection()
        expect(wrapper.text()).toContain('Cargando...')
    })

    it('renderiza los productos cuando el fetch tiene exito', async () => {
        const wrapper = mountSection()
        await flushPromises()
        expect(wrapper.text()).toContain('Pizza Margherita')
        expect(wrapper.text()).toContain('Tiramisú')
    })

    it('muestra un mensaje de error si el fetch falla', async () => {
        getProducts.mockRejectedValue(new Error('Fallo de red'))
        const wrapper = mountSection()
        await flushPromises()
        expect(wrapper.text()).toContain('Fallo de red')
    })

})