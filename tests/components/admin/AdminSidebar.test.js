import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminSidebar from '../../../src/components/admin/AdminSidebar.vue'

describe('AdminSidebar', () => {
    it('renders the brand and admin navigation links', () => {
        const wrapper = mount(AdminSidebar, { global: { stubs: ['RouterLink'] } })
        expect(wrapper.findAll('router-link-stub').map(link => link.attributes('to')))
            .toEqual(['/admin', '/admin/products', '/admin/orders', '/admin/reports'])
    })
})
