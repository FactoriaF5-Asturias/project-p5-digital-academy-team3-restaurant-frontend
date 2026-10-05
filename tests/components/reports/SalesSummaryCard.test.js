import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SalesSummaryCard from '../../../src/components/reports/SalesSummaryCard.vue'

describe('SalesSummaryCard', () => {
    it('renders sales summary information', () => {
        const wrapper = mount(SalesSummaryCard, {
            props: {
                summary: {
                    date: '04 oct 2026',
                    totalOrders: 12,
                    income: 4250,
                    previousIncome: 3780,
                    showComparison: true,
                    chart: [25, 50, 100],
                    chartLabels: ['1', '2', '3'],
                    chartPeriod: 'month',
                },
            },
        })

        expect(wrapper.text()).toContain('Ingresos Totales')
        expect(wrapper.text()).toContain('04 oct 2026')
        expect(wrapper.text()).toContain('12')
        expect(wrapper.text()).toContain('€4,250.00')
        expect(wrapper.text()).toContain('vs €3,780.00 ayer')
        expect(wrapper.text()).toContain('1')
        expect(wrapper.text()).toContain('2')
        expect(wrapper.text()).toContain('3')
    })

    it('hides comparison text when showComparison is false', () => {
        const wrapper = mount(SalesSummaryCard, {
            props: {
                summary: {
                    date: 'Octubre 2026',
                    totalOrders: 30,
                    income: 9000,
                    previousIncome: 0,
                    showComparison: false,
                    chart: [40, 80],
                    chartLabels: ['Sep', 'Oct'],
                    chartPeriod: 'year',
                },
            },
        })

        expect(wrapper.text()).toContain('Octubre 2026')
        expect(wrapper.text()).toContain('€9,000.00')
        expect(wrapper.text()).not.toContain('ayer')
    })
})