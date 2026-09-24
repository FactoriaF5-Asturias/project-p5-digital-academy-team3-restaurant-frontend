import { describe, expect, it } from "vitest";
import HeroSection from "../../src/components/home/HeroSection.vue";
import { shallowMount } from "@vue/test-utils";

describe('HeroSection', () => {

    function mountHero() {
                return shallowMount(HeroSection, {
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

    it('renderiza el título', () => {
        const wrapper = mountHero()
        expect(wrapper.text()).toContain('Descubre nuestra auténtica carta italiana.')
    })

    it('renderiza el subtítulo', () => {
        const wrapper = mountHero()
        expect(wrapper.text()).toContain('Recetas de herencia preparadas con ingredientes frescos y la pasión de siempre.')
    })

    it('renderiza el boton de revisar pedido', () => {
        const wrapper = mountHero()
        expect(wrapper.text()).toContain('Revisar pedido')
    })

    it('el botón apunta a la ruta /cart', () => {
        const wrapper = mountHero()
        expect(wrapper.find('a[href="/cart"]').exists()).toBe(true)
    })

})