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
                        template: '<a :href="to"><slot /></a>'
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

    it('renderiza el enlace de login', () => {
        const wrapper = mountHeader()
        expect(wrapper.text()).toContain('Login')
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

    it('los enlaces apuntan a las rutas correctas sin sesion', () => {
        const wrapper = mountHeader()
        expect(wrapper.find('a[href="/"]').exists()).toBe(true)
        expect(wrapper.find('a[href="/cart"]').exists()).toBe(true)
        expect(wrapper.find('a[href="/login"]').exists()).toBe(true)
    })

})