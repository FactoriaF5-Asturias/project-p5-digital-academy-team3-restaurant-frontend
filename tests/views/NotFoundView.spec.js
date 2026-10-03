import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NotFoundView from '../../src/views/NotFoundView.vue'

describe('NotFoundView', () => {
    function mountView() {
        return shallowMount(NotFoundView, {
            global: {
                stubs: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot /></a>'
                    }
                }
            }
        })
    }

    it('renderiza texto subtitulo', () => {
        const wrapper = mountView()
        expect(wrapper.text()).toContain('Lo sentimos, la página que buscas no existe o ha sido trasladada. Es posible que el enlace esté roto o haya caducado.')
    })

    it('renderiza titulo', () => {
        const wrapper = mountView()
        expect(wrapper.text()).toContain('¡Página no encontrada!')
    })

    it('renderiza el icono', () => {
        const wrapper = mountView()
        expect(wrapper.find('img').exists()).toBe(true)
    })

    it('renderiza el texto del boton', () => {
        const wrapper = mountView()
        expect(wrapper.text()).toContain('Volver a la página principal →')
    })

    it('el boton envia a home', () => {
        const wrapper = mountView()
        expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    })

})