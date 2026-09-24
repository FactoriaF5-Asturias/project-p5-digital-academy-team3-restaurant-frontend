import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MainFooter from "../../src/components/common/MainFooter.vue"

describe('MainFooter', () => {

    function mountFooter() {
            return shallowMount(MainFooter, {
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
    
    it('renderiza el texto del boton Home', () => {
        const wrapper = mountFooter()
        expect(wrapper.text()).toContain('Giacobello')
    })

    it('renderiza la imagen del boton Home', () => {
        const wrapper = mountFooter()
        expect(wrapper.find('img').exists()).toBe(true)
    })

    it('renderiza el texto de copyright', () => {
        const wrapper = mountFooter()
        expect(wrapper.text()).toContain('© 2026 Giacobello Gastronomía Italiana')
    })

})