import { describe, expect, it } from "vitest";
import LoginView from "../../src/views/LoginView.vue";
import { shallowMount } from "@vue/test-utils";

describe('LoginView', () => {

    function mountLogin() {
            return shallowMount(LoginView, {
                global: {
                }
            })
        }
    
    it('renderiza el título', () => {
        const wrapper = mountLogin()
        expect(wrapper.text()).toContain('Iniciar sesión')
    })

})