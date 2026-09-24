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

})