import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import KitchenSidebar from '../../../src/components/KitchenSidebar.vue'

describe('KitchenSidebar', () => {
    it('renders sidebar content', () => {
        const wrapper = mount(KitchenSidebar)

        expect(wrapper.text()).toContain('Giacobello')
        expect(wrapper.text()).toContain('Dashboard')
        expect(wrapper.text()).toContain('Executive Chef')
        expect(wrapper.text()).toContain('Staff ID #204')
    })
})