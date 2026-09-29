import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import KitchenHeader from '../../../src/components/KitchenHeader.vue'

const summary = {
    newOrders: 3,
    inProgressOrders: 2,
    readyOrders: 5,
}

describe('KitchenHeader', () => {
    it('renders order summary values', () => {
        const wrapper = mount(KitchenHeader, {
            props: {
                summary,
            },
        })

        expect(wrapper.text()).toContain('Nuevos')
        expect(wrapper.text()).toContain('3')
        expect(wrapper.text()).toContain('En curso')
        expect(wrapper.text()).toContain('2')
        expect(wrapper.text()).toContain('Listos')
        expect(wrapper.text()).toContain('5')
    })
})