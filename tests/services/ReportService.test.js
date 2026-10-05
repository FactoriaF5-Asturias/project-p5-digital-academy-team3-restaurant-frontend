import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchSalesSummary, fetchReportDocuments } from '../../src/services/ReportService.js'

beforeEach(() => {
    global.fetch = vi.fn()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-04T12:00:00'))
})

afterEach(() => {
    vi.useRealTimers()
})

describe('ReportService', () => {
    it('fetches sales summary from totals and invoices endpoints', async () => {
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    daily: 100,
                    monthly: 500,
                    quarterly: 900,
                    yearly: 1200,
                    dailyOrders: 2,
                    monthlyOrders: 8,
                    quarterlyOrders: 12,
                    yearlyOrders: 20,
                }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([
                    {
                        id: 1,
                        totalAmount: 100,
                        issuedAt: '2026-10-04T10:00:00',
                    },
                ]),
            })

        const result = await fetchSalesSummary('day')

        expect(fetch).toHaveBeenCalledWith(
            `${import.meta.env.VITE_API_URL}/api/v1/invoices/totals`,
            { headers: {} },
        )
        expect(fetch).toHaveBeenCalledWith(
            `${import.meta.env.VITE_API_URL}/api/v1/invoices`,
            { headers: {} },
        )
        expect(result.income).toBe(100)
        expect(result.totalOrders).toBe(2)
        expect(result.showComparison).toBe(true)
    })

    it('returns monthly report summary data', async () => {
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    daily: 100,
                    monthly: 500,
                    quarterly: 900,
                    yearly: 1200,
                    dailyOrders: 2,
                    monthlyOrders: 8,
                    quarterlyOrders: 12,
                    yearlyOrders: 20,
                }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([]),
            })

        const result = await fetchSalesSummary('month')

        expect(result.income).toBe(500)
        expect(result.totalOrders).toBe(8)
        expect(result.showComparison).toBe(false)
        expect(result.chartPeriod).toBe('month')
        expect(result.chartLabels).toContain('1')
        expect(result.chartLabels).toContain('31')
    })

    it('fetches report documents with totals', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                daily: 100,
                monthly: 500,
                quarterly: 900,
                yearly: 1200,
                dailyOrders: 2,
                monthlyOrders: 8,
                quarterlyOrders: 12,
                yearlyOrders: 20,
            }),
        })

        const reports = await fetchReportDocuments()

        expect(reports).toHaveLength(3)
        expect(reports[0].title).toBe('Reporte Diario')
        expect(reports[0].amount).toBe(100)
        expect(reports[1].amount).toBe(500)
        expect(reports[2].amount).toBe(1200)
    })
})