import { mount } from "@vue/test-utils"
import { describe } from "vitest"
import MenuCategoryFilter from "../../src/components/home/MenuCategoryFilter.vue"

describe('MenuCategoryFilter', () => {

    function mountMenuFilter() {
                return mount(MenuCategoryFilter, {
                    props: {
                        modelValue: 'all'
                    }
                })
            }

})