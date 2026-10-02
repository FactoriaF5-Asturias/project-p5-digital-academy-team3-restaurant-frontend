const API_URL = import.meta.env.VITE_API_URL

function buildUrl(path) {
    return `${API_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

const periodMap = {
    day: {
        totalField: 'daily',
        ordersField: 'dailyOrders',
        pdfPeriod: 'DAY',
        dateLabel: 'Hoy',
    },
    month: {
        totalField: 'monthly',
        ordersField: 'monthlyOrders',
        pdfPeriod: 'MONTH',
        dateLabel: 'Mes',
    },
    quarter: {
        totalField: 'quarterly',
        ordersField: 'quarterlyOrders',
        pdfPeriod: 'QUARTER',
        dateLabel: 'Trimestre',
    },
    year: {
        totalField: 'yearly',
        ordersField: 'yearlyOrders',
        pdfPeriod: 'YEAR',
        dateLabel: 'Año',
    },
}

function getPeriodDateLabel(period) {
    const currentDate = new Date()

    if (period === 'day') {
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(currentDate)
    }

    if (period === 'month') {
        return new Intl.DateTimeFormat('es-ES', {
            month: 'long',
            year: 'numeric',
        }).format(currentDate)
    }

    if (period === 'quarter') {
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1

        return `Trimestre ${quarter}, ${currentDate.getFullYear()}`
    }

    return String(currentDate.getFullYear())
}

async function fetchInvoices() {
    const response = await fetch(buildUrl('api/v1/invoices'))

    if (!response.ok) {
        throw new Error(`Error al cargar facturas: ${response.status}`)
    }

    return response.json()
}

function normalizeChart(values) {
    const maxValue = Math.max(...values)

    if (maxValue === 0) {
        return values.map(() => 0)
    }

    return values.map((value) => {
        if (value === 0) return 0

        return Math.max((value / maxValue) * 100, 12)
    })
}

function buildChartFromInvoices(invoices, period) {
    const now = new Date()

    if (period === 'year') {
        const values = Array(12).fill(0)

        invoices.forEach((invoice) => {
            const date = new Date(invoice.issuedAt)

            if (date.getFullYear() === now.getFullYear()) {
                values[date.getMonth()] += Number(invoice.totalAmount)
            }
        })

        return normalizeChart(values)
    }

    if (period === 'month') {
        const values = Array(31).fill(0)

        invoices.forEach((invoice) => {
            const date = new Date(invoice.issuedAt)

            if (
                date.getFullYear() === now.getFullYear()
                && date.getMonth() === now.getMonth()
            ) {
                values[date.getDate() - 1] += Number(invoice.totalAmount)
            }
        })

        return normalizeChart(values)
    }

    if (period === 'quarter') {
        const values = Array(3).fill(0)
        const currentQuarter = Math.floor(now.getMonth() / 3)

        invoices.forEach((invoice) => {
            const date = new Date(invoice.issuedAt)
            const invoiceQuarter = Math.floor(date.getMonth() / 3)

            if (
                date.getFullYear() === now.getFullYear()
                && invoiceQuarter === currentQuarter
            ) {
                values[date.getMonth() % 3] += Number(invoice.totalAmount)
            }
        })

        return normalizeChart(values)
    }

    const values = Array(24).fill(0)

    invoices.forEach((invoice) => {
        const date = new Date(invoice.issuedAt)

        if (
            date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate()
        ) {
            values[date.getHours()] += Number(invoice.totalAmount)
        }
    })

    return normalizeChart(values)
}

function buildChartLabels(period) {
    if (period === 'year') {
        return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }

    if (period === 'quarter') {
        const currentMonth = new Date().getMonth()
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3
        const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

        return monthLabels.slice(quarterStartMonth, quarterStartMonth + 3)
    }

    if (period === 'month') {
        return Array.from({ length: 31 }, (_, index) => String(index + 1))
    }

    return []
}

export async function fetchSalesSummary(period) {
    const totalsResponse = await fetch(buildUrl('api/v1/invoices/totals'))

    if (!totalsResponse.ok) {
        throw new Error(`Error al cargar resumen de ventas: ${totalsResponse.status}`)
    }

    const totals = await totalsResponse.json()
    const invoices = await fetchInvoices()
    const selectedPeriod = periodMap[period]

    return {
        date: getPeriodDateLabel(period),
        totalOrders: totals[selectedPeriod.ordersField],
        income: totals[selectedPeriod.totalField],
        previousIncome: 0,
        showComparison: period === 'day',
        chart: buildChartFromInvoices(invoices, period),
        chartLabels: buildChartLabels(period),
        chartPeriod: period,
    }
}

const reportDocumentsMock = [
    {
        id: 'daily',
        title: 'Reporte Diario',
        date: getPeriodDateLabel('day'),
        description: 'Resumen de ventas, propinas y desglose por categorías del día actual.',
        label: 'Total',
        amount: 0,
        downloadUrl: buildUrl('api/v1/invoices/report/pdf?period=DAY'),
    },
    {
        id: 'monthly',
        title: 'Cierre Mensual',
        date: getPeriodDateLabel('month'),
        description: 'Consolidado mensual para contabilidad. Incluye impuestos y deducciones.',
        label: 'Proyectado',
        amount: 0,
        downloadUrl: buildUrl('api/v1/invoices/report/pdf?period=MONTH'),
    },
    {
        id: 'yearly',
        title: 'Reporte Anual',
        date: getPeriodDateLabel('year'),
        description: 'Métricas de crecimiento interanual, análisis estacional y rentabilidad.',
        label: 'Acumulado',
        amount: 0,
        downloadUrl: buildUrl('api/v1/invoices/report/pdf?period=YEAR'),
    },
]

export async function fetchReportDocuments() {
    const response = await fetch(buildUrl('api/v1/invoices/totals'))

    if (!response.ok) {
        throw new Error(`Error al cargar documentos de ventas: ${response.status}`)
    }

    const data = await response.json()

    return [
        {
            ...reportDocumentsMock[0],
            amount: data.daily,
        },
        {
            ...reportDocumentsMock[1],
            amount: data.monthly,
        },
        {
            ...reportDocumentsMock[2],
            amount: data.yearly,
        },
    ]
}