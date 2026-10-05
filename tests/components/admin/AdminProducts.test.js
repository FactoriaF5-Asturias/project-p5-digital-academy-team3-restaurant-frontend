import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AdminProducts from '../../../src/components/admin/AdminProducts.vue'
import { createProduct, deleteProduct, getAdminProducts, getCategories, updateProducts } from '../../../src/services/ProductService.js'

vi.mock('../../../src/services/ProductService.js', () => ({
    getAdminProducts: vi.fn(), getCategories: vi.fn(), updateProducts: vi.fn(), deleteProduct: vi.fn(), createProduct: vi.fn(),
}))
vi.mock('../../../src/composables/useAuth.js', () => ({ useAuth: () => ({ token: { value: 'admin-token' } }) }))

const products = [{ id: 1, name: 'Pizza', description: 'Cheese pizza', category: 'Main', categoryId: 1, price: 12, imageUrl: '', status: true }]
const categories = [{ id: 1, name: 'Main' }]

describe('AdminProducts', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        getAdminProducts.mockResolvedValue(products.map(item => ({ ...item })))
        getCategories.mockResolvedValue(categories)
        updateProducts.mockResolvedValue({})
        deleteProduct.mockResolvedValue()
        createProduct.mockResolvedValue({ id: 2, name: 'Soup' })
    })

    it('loads products and categories and supports searching', async () => {
        const wrapper = mount(AdminProducts)
        await flushPromises()
        expect(getAdminProducts).toHaveBeenCalledWith('admin-token')
        expect(getCategories).toHaveBeenCalled()
        expect(wrapper.text()).toContain('Pizza')
        await wrapper.get('input[aria-label="Buscar productos"]').setValue('missing')
        expect(wrapper.text()).not.toContain('Cheese pizza')
    })

    it('opens the add form and calls create when submitted', async () => {
        const wrapper = mount(AdminProducts)
        await flushPromises()
        await wrapper.get('.admin-products__add-button').trigger('click')
        await wrapper.findComponent({ name: 'AdminProductForm' }).vm.$emit('submit', { name: 'Soup', description: 'Hot', categoryId: 1, price: 5, imageUrl: '', status: true })
        await flushPromises()
        expect(createProduct).toHaveBeenCalledWith(expect.objectContaining({ name: 'Soup' }))
        expect(wrapper.text()).toContain('Soup')
    })

    it('confirms and deletes a product', async () => {
        const wrapper = mount(AdminProducts)
        await flushPromises()
        await wrapper.get('[aria-label="Eliminar Pizza"]').trigger('click')
        await wrapper.get('.admin-product-delete__actions button:last-child').trigger('click')
        await flushPromises()
        expect(deleteProduct).toHaveBeenCalledWith(1)
        expect(wrapper.text()).not.toContain('Cheese pizza')
    })

    it('shows an error when the initial load fails', async () => {
        getAdminProducts.mockRejectedValueOnce(new Error('Unavailable'))
        const wrapper = mount(AdminProducts)
        await flushPromises()
        expect(wrapper.get('[role="alert"]').text()).toContain('Unavailable')
    })
})
