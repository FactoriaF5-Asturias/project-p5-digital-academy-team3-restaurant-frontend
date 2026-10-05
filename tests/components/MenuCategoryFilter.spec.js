import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import MenuCategoryFilter from "../../src/components/home/MenuCategoryFilter.vue"

describe('MenuCategoryFilter', () => {

    function mountMenuFilter() {
                return mount(MenuCategoryFilter, {
                    props: {
                        modelValue: 'all'
                    }
                })
            }

    it('renderiza los cuatro botones de categoría', () => {
        const wrapper = mountMenuFilter()
        expect(wrapper.findAll('button').length).toBe(4)
    })

    it('renderiza los textos de las categorías', () => {
        const wrapper = mountMenuFilter()
        expect(wrapper.text()).toContain('Todos')
        expect(wrapper.text()).toContain('Especialidades')
        expect(wrapper.text()).toContain('Postres')
        expect(wrapper.text()).toContain('Bebidas')
    })

    it('emite update:modelValue al pulsar una categoría', async () => {
        const wrapper = mountMenuFilter()
        await wrapper.findAll('button')[1].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Especialidades'])
    })

    it('marca como activo el botón correspondiente al modelValue', () => {
        const wrapper = mount(MenuCategoryFilter, {
            props: { modelValue: 'Postres' }
        })
        const buttons = wrapper.findAll('button')
        expect(buttons[2].classes()).toContain('menu-category-filter__button--active')
        expect(buttons[0].classes()).not.toContain('menu-category-filter__button--active')
    })

})