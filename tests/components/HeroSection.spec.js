import { describe } from "vitest";
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

})