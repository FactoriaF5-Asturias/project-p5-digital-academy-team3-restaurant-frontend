import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminProductRow from '../../../src/components/admin/AdminProductRow.vue'

const product = { id: 1, name: 'Pizza', description: 'Cheese', category: 'Main', price: 12, imageUrl: 'pizza.jpg', status: true }

describe('AdminProductRow', () => {
    it('renders product details and a formatted price', () => {
        const wrapper = mount(AdminProductRow, { props: { product } })
        expect(wrapper.text()).toContain('Pizza')
        expect(wrapper.text()).toContain('12,00')
        expect(wrapper.get('img').attributes('alt')).toBe('Pizza')
    })

    it('emits toggled product status and edit/delete actions', async () => {
        const wrapper = mount(AdminProductRow, { props: { product } })
        await wrapper.get('[role="switch"]').trigger('click')
        await wrapper.get('[aria-label="Editar Pizza"]').trigger('click')
        await wrapper.get('[aria-label="Eliminar Pizza"]').trigger('click')
        expect(wrapper.emitted('toggle-status')[0][0]).toMatchObject({ id: 1, status: false })
        expect(wrapper.emitted('edit')[0][0]).toEqual(product)
        expect(wrapper.emitted('delete')[0][0]).toEqual(product)
    })
})
