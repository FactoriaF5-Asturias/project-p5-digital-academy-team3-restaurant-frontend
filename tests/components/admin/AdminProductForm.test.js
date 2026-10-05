import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminProductForm from '../../../src/components/admin/AdminProductForm.vue'

const categories = [{ id: 1, name: 'Pasta' }]

describe('AdminProductForm', () => {
    it('emits trimmed and converted form values on submit', async () => {
        const wrapper = mount(AdminProductForm, { props: { categories } })
        const inputs = wrapper.findAll('input')
        await inputs[0].setValue('  Carbonara  ')
        await wrapper.get('textarea').setValue('  Creamy pasta  ')
        await wrapper.get('select').setValue('1')
        await inputs[1].setValue(' image.jpg ')
        await inputs[2].setValue('12.5')
        await wrapper.get('form').trigger('submit')
        expect(wrapper.emitted('submit')[0][0]).toEqual({
            name: 'Carbonara', description: 'Creamy pasta', categoryId: 1,
            price: 12.5, imageUrl: 'image.jpg', status: true,
        })
    })

    it('prefills edits and emits cancel', async () => {
        const wrapper = mount(AdminProductForm, {
            props: { categories, product: { name: 'Ravioli', description: 'Filled', category: 'Pasta', price: 10, imageUrl: 'r.jpg', status: false } },
        })
        expect(wrapper.get('input').element.value).toBe('Ravioli')
        expect(wrapper.get('select').element.value).toBe('1')
        await wrapper.get('button[aria-label="Cerrar"]').trigger('click')
        expect(wrapper.emitted('cancel')).toHaveLength(1)
    })

    it('disables saving while a submission is in progress', () => {
        const wrapper = mount(AdminProductForm, { props: { isSaving: true } })
        expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
        expect(wrapper.get('button[type="submit"]').text()).toContain('Guardando')
    })
})
