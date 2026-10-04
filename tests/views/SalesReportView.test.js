import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import SalesReportView from '../../src/views/SalesReportView.vue'
import { fetchSalesSummary, fetchReportDocuments } from '../../src/services/ReportService.js'

vi.mock('../../src/services/ReportService.js', () => ({
    fetchSalesSummary: vi.fn(),
    fetchReportDocuments: vi.fn(),
}))

describe('SalesReportView', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('loads and renders sales report data', async () => {
        fetchSalesSummary.mockResolvedValue({
            date: '04 oct 2026',
            totalOrders: 12,
            income: 4250,
            previousIncome: 3780,
            showComparison: true,
            chart: [20, 60, 100],
            chartLabels: [],
            chartPeriod: 'day',
        })

        fetchReportDocuments.mockResolvedValue([
            {
                id: 'daily',
                title: 'Reporte Diario',
                date: '04 oct 2026',
                description: 'Resumen de ventas del día actual.',
                label: 'Total',
                amount: 4250,
                downloadUrl: '/api/v1/invoices/report/pdf?period=DAY',
            },
        ])

        const wrapper = mount(SalesReportView)

        await flushPromises()

        expect(fetchSalesSummary).toHaveBeenCalledWith('day')
        expect(fetchReportDocuments).toHaveBeenCalled()
        expect(wrapper.text()).toContain('Resumen de Ventas')
        expect(wrapper.text()).toContain('Ingresos Totales')
        expect(wrapper.text()).toContain('Reporte Diario')
    })

    it('shows error message when reports cannot be loaded', async () => {
        fetchSalesSummary.mockRejectedValue(new Error('Request failed'))
        fetchReportDocuments.mockResolvedValue([])

        const wrapper = mount(SalesReportView)

        await flushPromises()

        expect(wrapper.text()).toContain('No se pudieron cargar los informes.')
    })
})