import { shallowMount } from "@vue/test-utils";
import ContactSection from "../../src/components/home/ContactSection.vue";
import { describe } from "vitest";

describe('ContactSection', () => {

    function mountContact() {
                    return shallowMount(ContactSection, {
                        global: {

                    }})
    }

})