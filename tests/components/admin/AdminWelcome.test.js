import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminWelcome from '../../../src/components/admin/AdminWelcome.vue'

describe('AdminWelcome', () => {
    it('welcomes the admin and links to each admin section', () => {
        const wrapper = mount(AdminWelcome, { global: { stubs: ['RouterLink'] } })
        expect(wrapper.get('h1').text()).toContain('¡Bienvenido a Giacobello!')
        expect(wrapper.findAll('router-link-stub').map(link => link.attributes('to')))
            .toEqual(['/admin/products', '/admin/orders', '/admin/reports'])
    })
})
