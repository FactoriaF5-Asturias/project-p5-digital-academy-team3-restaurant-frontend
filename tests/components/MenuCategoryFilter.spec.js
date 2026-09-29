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

})