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

    it('el enlace apunta a la ruta correcta', () => {
        const wrapper = mountFooter()
        expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    })

    it('renderiza los enlaces de los desarrolladores', () => {
        const wrapper = mountFooter()
        const developerLinks = wrapper.findAll('a[href^="https://github.com/"]')

        expect(developerLinks).toHaveLength(6)
    })

    it('los enlaces de desarrolladores se abren en una nueva pestaña', () => {
        const wrapper = mountFooter()
        const developerLinks = wrapper.findAll('a[href^="https://github.com/"]')

        developerLinks.forEach((link) => {
            expect(link.attributes('target')).toBe('_blank')
            expect(link.attributes('rel')).toBe('noopener noreferrer')
        })
    })

    it('renderiza las imagenes de los desarrolladores', () => {
        const wrapper = mountFooter()
        const developerImages = wrapper.findAll('a[href^="https://github.com/"] img')

        expect(developerImages).toHaveLength(6)
    })

})