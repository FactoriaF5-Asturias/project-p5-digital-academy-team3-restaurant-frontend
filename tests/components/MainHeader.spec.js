import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MainHeader from "../../src/components/common/MainHeader.vue";

describe('MainHeader', () => {

    function mountHeader() {
        return shallowMount(MainHeader, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>'
                    }
                }
            }
        })
    }

    it('renderiza el texto del boton Home', () => {
        const wrapper = mountHeader()
        expect(wrapper.text()).toContain('Giacobello')
    })

    it('renderiza la imagen del boton Home', () => {
        const wrapper = mountHeader()
        expect(wrapper.find('img').exists()).toBe(true)
    })

})