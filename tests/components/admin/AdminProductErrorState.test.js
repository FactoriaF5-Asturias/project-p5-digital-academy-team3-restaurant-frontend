import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminProductErrorState from '../../../src/components/admin/AdminProductErrorState.vue'

describe('AdminProductErrorState', () => {
    it('shows the provided message and emits retry', async () => {
        const wrapper = mount(AdminProductErrorState, { props: { message: 'Network issue' } })
        expect(wrapper.get('[role="alert"]').text()).toContain('Network issue')
        await wrapper.get('button').trigger('click')
        expect(wrapper.emitted('retry')).toHaveLength(1)
    })
})
