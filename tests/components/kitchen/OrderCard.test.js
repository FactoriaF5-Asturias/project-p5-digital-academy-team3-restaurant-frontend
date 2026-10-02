import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderCard from '../../../src/components/OrderCard.vue'

const baseOrder = {
    id: 5,
    tabletId: 2,
    statusName: 'PENDING',
    createdAt: '2026-09-24T10:30:00',
    items: [
        {
            id: 1,
            productName: 'Pizza',
            quantity: 2,
        },
    ],
}

describe('OrderCard', () => {
    it('shows accept and reject buttons for pending orders', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: baseOrder,
            },
        })

        expect(wrapper.text()).toContain('Aceptar')
        expect(wrapper.text()).toContain('Rechazar')
    })

    it('shows takeaway label when order is takeaway', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    orderTypeName: 'TAKEAWAY',
                },
            },
        })

        expect(wrapper.text()).toContain('Para Llevar')
    })

    it('does not render time when createdAt is missing', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    createdAt: '',
                },
            },
        })

        expect(wrapper.find('.order-card__time span').text()).toBe('')
    })

    it('renders without items when order items are missing', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    items: undefined,
                },
            },
        })

        expect(wrapper.findAll('.order-card__item')).toHaveLength(0)
    })

    it('emits accept event when accept button is clicked', async () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: baseOrder,
            },
        })

        await wrapper.find('.order-card__button--accept').trigger('click')

        expect(wrapper.emitted('accept')).toEqual([[5]])
    })

    it('shows cancelled status and disables status button for cancelled orders', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    statusName: 'CANCELLED',
                },
            },
        })

        const statusButton = wrapper.find('.order-card__status-select')

        expect(wrapper.text()).toContain('Cancelado')
        expect(statusButton.attributes('disabled')).toBeDefined()
        expect(wrapper.classes()).toContain('order-card--cancelled')
    })

    it('emits update-status event when selecting a new status', async () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    statusName: 'ACCEPTED',
                },
            },
        })

        await wrapper.find('.order-card__status-select').trigger('click')
        await wrapper.findAll('.order-card__status-option')[1].trigger('click')

        expect(wrapper.emitted('update-status')).toEqual([[5, 'DELAYED']])
    })

    it('shows ready label for completed orders', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    statusName: 'COMPLETED',
                },
            },
        })

        expect(wrapper.text()).toContain('Listo')
        expect(wrapper.find('.order-card__status-select').classes()).toContain(
            'order-card__status-select--completed',
        )
    })

    it('disables status button for completed orders', async () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    statusName: 'COMPLETED',
                },
            },
        })

        const statusButton = wrapper.find('.order-card__status-select')

        expect(statusButton.attributes('disabled')).toBeDefined()
        expect(wrapper.classes()).toContain('order-card--completed')

        await statusButton.trigger('click')

        expect(wrapper.find('.order-card__status-menu').exists()).toBe(false)
    })

    it('shows delayed label for delayed orders', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    statusName: 'DELAYED',
                },
            },
        })

        expect(wrapper.text()).toContain('Con retraso')
        expect(wrapper.find('.order-card__status-select').classes()).toContain(
            'order-card__status-select--delayed',
        )
    })

    it('does not open status menu for cancelled orders', async () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    statusName: 'CANCELLED',
                },
            },
        })

        await wrapper.find('.order-card__status-select').trigger('click')

        expect(wrapper.find('.order-card__status-menu').exists()).toBe(false)
    })

    it('shows fallback label for unknown status', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    statusName: 'UNKNOWN',
                },
            },
        })

        expect(wrapper.text()).toContain('Cambiar estado')
    })

    it('renders empty order type when order has no orderType and no tabletId', () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: {
                    ...baseOrder,
                    orderType: undefined,
                    tabletId: undefined,
                },
            },
        })

        expect(wrapper.find('.order-card__type').text()).toBe('')
    })

    it('emits reject event when reject button is clicked', async () => {
        const wrapper = mount(OrderCard, {
            props: {
                order: baseOrder,
            },
        })

        await wrapper.find('.order-card__button--reject').trigger('click')

        expect(wrapper.emitted('reject')).toEqual([[5]])
    })
})
