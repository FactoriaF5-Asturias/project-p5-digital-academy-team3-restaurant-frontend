import { shallowMount } from '@vue/test-utils'
import { describe, vi, beforeEach } from 'vitest'
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

})