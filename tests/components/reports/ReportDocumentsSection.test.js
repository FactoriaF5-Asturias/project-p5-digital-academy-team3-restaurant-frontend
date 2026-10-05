import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ReportDocumentsSection from '../../../src/components/reports/ReportDocumentsSection.vue'

describe('ReportDocumentsSection', () => {
    it('renders report cards', () => {
        const wrapper = mount(ReportDocumentsSection, {
            props: {
                reports: [
                    {
                        id: 'daily',
                        title: 'Reporte Diario',
                        date: '04 oct 2026',
                        description: 'Resumen de ventas.',
                        label: 'Total',
                        amount: 4250,
                        downloadUrl: '/report.pdf',
                    },
                ],
            },
        })

        expect(wrapper.text()).toContain('Documentos y Reportes')
        expect(wrapper.text()).toContain('Reporte Diario')
        expect(wrapper.text()).toContain('04 oct 2026')
        expect(wrapper.text()).toContain('Resumen de ventas.')
        expect(wrapper.text()).toContain('Total')
        expect(wrapper.text()).toContain('4,250.00')
        expect(wrapper.find('a.report-documents__download-button').attributes('href')).toBe('/report.pdf')
    })

    it('renders multiple report cards', () => {
        const wrapper = mount(ReportDocumentsSection, {
            props: {
                reports: [
                    {
                        id: 'daily',
                        title: 'Reporte Diario',
                        date: '04 oct 2026',
                        description: 'Resumen diario.',
                        label: 'Total',
                        amount: 4250,
                        downloadUrl: '/daily.pdf',
                    },
                    {
                        id: 'monthly',
                        title: 'Cierre Mensual',
                        date: 'Octubre 2026',
                        description: 'Resumen mensual.',
                        label: 'Proyectado',
                        amount: 112400,
                        downloadUrl: '/monthly.pdf',
                    },
                ],
            },
        })

        expect(wrapper.text()).toContain('Reporte Diario')
        expect(wrapper.text()).toContain('Cierre Mensual')
        expect(wrapper.text()).toContain('4,250.00')
        expect(wrapper.text()).toContain('112,400.00')
    })
})