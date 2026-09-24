import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MainHeader from "../../src/components/common/MainHeader.vue";

describe('MainHeader', () => {

    it('renderiza el texto del boton Home', () => {
        const wrapper = shallowMount(MainHeader,{
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>'
                    }
                }
            }
        })
        expect(wrapper.text()).toContain('Giacobello')
    })

    it('renderiza la imagen del boton Home', () => {
        const wrapper = shallowMount(MainHeader,{
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>'
                    }
                }
            }
        })
        expect(wrapper.find('img').exists()).toBe(true)
    })

})