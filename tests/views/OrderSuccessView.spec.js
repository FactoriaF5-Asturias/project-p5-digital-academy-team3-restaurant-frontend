import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import OrderSuccessView from '../../src/views/OrderSuccessView.vue'

vi.mock('vue-router', () => ({
    useRoute: () => ({ params: { id: '5' } })
}))

describe('OrderSuccessView', () => {
    function mountView() {
        return shallowMount(OrderSuccessView)
    }

    it('renderiza texto subtitulo', () => {
        const wrapper = mountView()
        expect(wrapper.text()).toContain('Gracias, hemos recibido tu pedido y el equipo ya está preparándolo en cocina. Ya puedes realizar el pago en caja.')
    })

    it('renderiza titulo', () => {
        const wrapper = mountView()
        expect(wrapper.text()).toContain('¡Pedido #P5-5 realizado con éxito!')
    })

    it('renderiza el icono', () => {
        const wrapper = mountView()
        expect(wrapper.find('img').exists()).toBe(true)
    })

})