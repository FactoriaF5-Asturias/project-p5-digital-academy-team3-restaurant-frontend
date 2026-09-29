import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderFilter from '../../../src/components/OrderFilter.vue'

const options = [
    { label: 'Todos', value: 'all' },
    { label: 'Nuevos', value: 'PENDING' },
    { label: 'En proceso', value: 'ACCEPTED' },
]

describe('OrderFilter', () => {
    it('renders label and second label line', () => {
        const wrapper = mount(OrderFilter, {
            props: {
                label: 'Filtrar',
                labelSecondLine: 'por estado:',
                options,
                modelValue: 'all',
            },
        })

        expect(wrapper.text()).toContain('Filtrar')
        expect(wrapper.text()).toContain('por estado:')
    })

    it('renders all filter options', () => {
        const wrapper = mount(OrderFilter, {
            props: {
                label: 'Filtrar',
                options,
                modelValue: 'all',
            },
        })

        const buttons = wrapper.findAll('.order-filter__button')

        expect(buttons).toHaveLength(3)
        expect(wrapper.text()).toContain('Todos')
        expect(wrapper.text()).toContain('Nuevos')
        expect(wrapper.text()).toContain('En proceso')
    })

    it('adds active class to selected option', () => {
        const wrapper = mount(OrderFilter, {
            props: {
                label: 'Filtrar',
                options,
                modelValue: 'PENDING',
            },
        })

        const activeButton = wrapper.find('.order-filter__button--active')

        expect(activeButton.text()).toBe('Nuevos')
    })

    it('emits update:modelValue when option is clicked', async () => {
        const wrapper = mount(OrderFilter, {
            props: {
                label: 'Filtrar',
                options,
                modelValue: 'all',
            },
        })

        await wrapper.findAll('.order-filter__button')[1].trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([['PENDING']])
    })
})