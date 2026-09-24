import { shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import MainHeader from "../../src/components/common/MainHeader.vue";
import { useCart } from "../../src/composables/useCart.js";

describe('MainHeader', () => {

    function mountHeader() {
        return shallowMount(MainHeader, {
            global: {
                stubs: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a><slot /></a>'
                    }
                }
            }
        })
    }

    beforeEach(() => {
        localStorage.clear()
        const { clearCart } = useCart()
        clearCart()
    })

    it('renderiza el texto del boton Home', () => {
        const wrapper = mountHeader()
        expect(wrapper.text()).toContain('Giacobello')
    })

    it('renderiza la imagen del boton Home', () => {
        const wrapper = mountHeader()
        expect(wrapper.find('img').exists()).toBe(true)
    })

    it('renderiza links a login y register aunque esten ocultos', () => {
        const wrapper = mountHeader()
        expect(wrapper.text()).toContain('Login')
        expect(wrapper.text()).toContain('Register')
    })

    it('el numero de productos en el contador del carrito funciona', () => {
        const { addToCart } = useCart()
        addToCart({ id: 1, name: 'X', price: 10 }, 2)
        addToCart({ id: 2, name: 'Y', price: 5 }, 1)
        const wrapper = mountHeader()
        expect(wrapper.text()).toContain('3')
    })

    it('el numero de productos en el contador del carrito se inicia en 0', () => {
        const wrapper = mountHeader()
        expect(wrapper.text()).toContain('0')
    })

    it('renderiza el boton hamburguesa', () => {
        const wrapper = mountHeader()
        expect(wrapper.find('button[aria-label="Abrir menú"]').exists()).toBe(true)
    })

    it('renderiza el menu del boton hamburguesa al pulsar', async () => {
        const wrapper = mountHeader()
        expect(wrapper.find('[data-testid="mobile-menu"]').exists()).toBe(false)
        await wrapper.find('button[aria-label="Abrir menú"]').trigger('click')
        expect(wrapper.find('[data-testid="mobile-menu"]').exists()).toBe(true)
    })

    it('cierra el menu del boton hamburguesa al pulsar de nuevo', async () => {
        const wrapper = mountHeader()
        await wrapper.find('button[aria-label="Abrir menú"]').trigger('click')
        await wrapper.find('button[aria-label="Abrir menú"]').trigger('click')
        expect(wrapper.find('[data-testid="mobile-menu"]').exists()).toBe(false)
    })

    it('se cierra el menu al pulsar uno de los links', async () => {
        const wrapper = mountHeader()
        await wrapper.find('button[aria-label="Abrir menú"]').trigger('click')
        await wrapper.find('[data-testid="mobile-menu"] a').trigger('click')
        expect(wrapper.find('[data-testid="mobile-menu"]').exists()).toBe(false)
    })

})