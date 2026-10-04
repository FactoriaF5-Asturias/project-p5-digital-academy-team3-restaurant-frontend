import { shallowMount } from '@vue/test-utils'
import { describe, vi, beforeEach, it, expect } from 'vitest'
import ChangePasswordView from '../../src/views/ChangePasswordView.vue'

const { changePasswordMock, pushMock } = vi.hoisted(() => ({
    changePasswordMock: vi.fn(),
    pushMock: vi.fn()
}))

vi.mock('../../src/composables/useAuth.js', () => ({
    useAuth: () => ({ changePassword: changePasswordMock })
}))

vi.mock('vue-router', () => ({
    useRouter: () => ({ push: pushMock })
}))

describe('ChangePasswordView', () => {

    function mountView() {
        return shallowMount(ChangePasswordView)
    }

    beforeEach(() => {
        changePasswordMock.mockReset()
        pushMock.mockReset()
    })

    it('renderiza el titulo', () => {
        const wrapper = mountView()
        expect(wrapper.text()).toContain('Cambio de contraseña')
    })

    it('renderiza los inputs', () => {
        const wrapper = mountView()
        expect(wrapper.find('input#username').exists()).toBe(true)
        expect(wrapper.find('input#currentPassword').exists()).toBe(true)
        expect(wrapper.find('input#newPassword').exists()).toBe(true)
        expect(wrapper.find('input#confirmPassword').exists()).toBe(true)
    })

})