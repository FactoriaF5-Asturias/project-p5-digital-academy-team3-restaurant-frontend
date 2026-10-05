import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminView from '../../src/views/AdminView.vue'

describe('AdminView', () => {
    it('renders the admin sidebar and nested route outlet', () => {
        const wrapper = mount(AdminView, { global: { stubs: ['RouterLink', 'RouterView'] } })
        expect(wrapper.findComponent({ name: 'AdminSidebar' }).exists()).toBe(true)
        expect(wrapper.find('router-view-stub').exists()).toBe(true)
        expect(wrapper.find('main').exists()).toBe(true)
    })
})
