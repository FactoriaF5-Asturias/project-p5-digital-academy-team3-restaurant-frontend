import { flushPromises, shallowMount } from '@vue/test-utils'
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

    it('muestra error si las contraseñas no coinciden y no llama al servicio', async () => {
        const wrapper = mountView()
        await wrapper.find('input#username').setValue('Admin')
        await wrapper.find('input#currentPassword').setValue('actual123')
        await wrapper.find('input#newPassword').setValue('nueva12345')
        await wrapper.find('input#confirmPassword').setValue('otra12345')
        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('Las contraseñas no coinciden')
        expect(changePasswordMock).not.toHaveBeenCalled()
    })

    it('muestra error si la nueva contraseña es muy corta y no llama al servicio', async () => {
        const wrapper = mountView()
        await wrapper.find('input#username').setValue('Admin')
        await wrapper.find('input#currentPassword').setValue('actual123')
        await wrapper.find('input#newPassword').setValue('corta')
        await wrapper.find('input#confirmPassword').setValue('corta')
        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('al menos 8 caracteres')
        expect(changePasswordMock).not.toHaveBeenCalled()
    })

    it('llama al servicio con los datos y redirige en caso de éxito', async () => {
        changePasswordMock.mockResolvedValue({ token: 'abc' })
        const wrapper = mountView()
        await wrapper.find('input#username').setValue('Admin')
        await wrapper.find('input#currentPassword').setValue('actual123')
        await wrapper.find('input#newPassword').setValue('nueva12345')
        await wrapper.find('input#confirmPassword').setValue('nueva12345')
        await wrapper.find('form').trigger('submit.prevent')

        expect(changePasswordMock).toHaveBeenCalledWith('Admin', 'actual123', 'nueva12345')
        expect(pushMock).toHaveBeenCalledWith('/admin/products')
    })

    it('muestra error 401 si las credenciales son incorrectas', async () => {
        changePasswordMock.mockRejectedValue({ status: 401 })
        const wrapper = mountView()
        await wrapper.find('input#username').setValue('Admin')
        await wrapper.find('input#currentPassword').setValue('mala')
        await wrapper.find('input#newPassword').setValue('nueva12345')
        await wrapper.find('input#confirmPassword').setValue('nueva12345')
        await wrapper.find('form').trigger('submit.prevent')
        await flushPromises()

        expect(wrapper.text()).toContain('Usuario o contraseña incorrectos')
    })

    it('muestra error 400 si la nueva contraseña es igual a la actual', async () => {
        changePasswordMock.mockRejectedValue({ status: 400 })
        const wrapper = mountView()
        await wrapper.find('input#username').setValue('Admin')
        await wrapper.find('input#currentPassword').setValue('actual123')
        await wrapper.find('input#newPassword').setValue('nueva12345')
        await wrapper.find('input#confirmPassword').setValue('nueva12345')
        await wrapper.find('form').trigger('submit.prevent')
        await flushPromises()

        expect(wrapper.text()).toContain('diferente a la actual')
    })

    it('muestra error 409 si la contraseña no requiere cambio', async () => {
        changePasswordMock.mockRejectedValue({ status: 409 })
        const wrapper = mountView()
        await wrapper.find('input#username').setValue('Admin')
        await wrapper.find('input#currentPassword').setValue('actual123')
        await wrapper.find('input#newPassword').setValue('nueva12345')
        await wrapper.find('input#confirmPassword').setValue('nueva12345')
        await wrapper.find('form').trigger('submit.prevent')
        await flushPromises()

        expect(wrapper.text()).toContain('no requiere cambio')
    })

})