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
    
    it('renderiza el titulo', () => {
        const wrapper = mountLogin()
        expect(wrapper.text()).toContain('Iniciar sesión')
    })

    it('renderiza el input de usuario', () => {
        const wrapper = mountLogin()
        const emailInput = wrapper.find('input[type="text"]')
        expect(emailInput.exists()).toBe(true)
        expect(emailInput.attributes('placeholder')).toBe('Tu usuario')
    })

    it('renderiza el input de contraseña con type password', () => {
        const wrapper = mountLogin()
        const passwordInput = wrapper.find('input[id="password"]')
        expect(passwordInput.attributes('type')).toBe('password')
    })

    it('renderiza el boton de envio', () => {
        const wrapper = mountLogin()
        const submitButton = wrapper.find('button[type="submit"]')
        expect(submitButton.exists()).toBe(true)
        expect(submitButton.text()).toBe('Iniciar sesión')
    })

    it('visibilidad de la contraseña al pulsar el boton', async () => {
        const wrapper = mountLogin()
        const passwordInput = wrapper.find('input[id="password"]')
        const toggleButton = wrapper.find('button[type="button"]')

        expect(passwordInput.attributes('type')).toBe('password')

        await toggleButton.trigger('click')
        expect(passwordInput.attributes('type')).toBe('text')

        await toggleButton.trigger('click')
        expect(passwordInput.attributes('type')).toBe('password')
    })

})