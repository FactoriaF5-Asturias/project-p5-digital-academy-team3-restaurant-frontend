import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MainHeader from "../../src/components/common/MainHeader.vue";

describe('MainHeader', () => {

    it('renderiza el boton Home', () => {
        const wrapper = shallowMount(MainHeader,{
            global: {
                stubs: { RouterLink: true }
            }
        })
        expect(wrapper.text()).toContain()
    })

})