import { shallowMount } from "@vue/test-utils";
import { describe } from "vitest";
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
        
})