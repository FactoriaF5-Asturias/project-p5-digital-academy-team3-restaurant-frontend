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

})