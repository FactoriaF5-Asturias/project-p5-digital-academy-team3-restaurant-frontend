import { shallowMount } from '@vue/test-utils'
import { describe, vi } from 'vitest'
import OrderSuccessView from '../../src/views/OrderSuccessView.vue'

vi.mock('vue-router', () => ({
    useRoute: () => ({ params: { id: '5' } })
}))

describe('OrderSuccessView', () => {
    function mountView() {
        return shallowMount(OrderSuccessView)
    }

})