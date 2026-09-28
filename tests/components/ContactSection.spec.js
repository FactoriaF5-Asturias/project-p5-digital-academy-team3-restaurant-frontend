import { shallowMount } from "@vue/test-utils";
import ContactSection from "../../src/components/home/ContactSection.vue";
import { describe, expect, it } from "vitest";

describe('ContactSection', () => {

    function mountContact() {
                    return shallowMount(ContactSection, {
                        global: {

                    }})
    }

    it('renderiza el titulo', () => {
        const wrapper = mountContact()
        expect(wrapper.text()).toContain('Encuéntranos')
    })

    it('renderiza los subtitulos', () => {
        const wrapper = mountContact()
        expect(wrapper.text()).toContain('Dirección')
    })

    it('renderiza la direccion', () => {
        const wrapper = mountContact()
        expect(wrapper.text()).toContain('Calle Roma 123')
    })

    it('renderiza el telefono', () => {
        const wrapper = mountContact()
        expect(wrapper.text()).toContain('93 123 45 67')
    })

    it('renderiza el email', () => {
        const wrapper = mountContact()
        expect(wrapper.text()).toContain('hola@giacobello.es')
    })

})