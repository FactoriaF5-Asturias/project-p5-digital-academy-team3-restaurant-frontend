const salesSummaryMock = {
    date: 'Hoy, 24 Oct 2023',
    totalOrders: 94,
    income: 4250,
    previousIncome: 3780,
    chart: [35, 55, 42, 70, 95],
}

const reportDocumentsMock = [
    {
        id: 'daily',
        title: 'Reporte Diario',
        date: '24 Oct 2026',
        description: 'Resumen de ventas, propinas y desglose por categorías del día actual.',
        label: 'Total',
        amount: 4250,
        downloadUrl: null,
    },
    {
        id: 'monthly',
        title: 'Cierre Mensual',
        date: 'Octubre 2026',
        description: 'Consolidado mensual para contabilidad. Incluye impuestos y deducciones.',
        label: 'Proyectado',
        amount: 112400,
        downloadUrl: null,
    },
    {
        id: 'yearly',
        title: 'Reporte Anual',
        date: 'Año 2026',
        description: 'Métricas de crecimiento interanual, análisis estacional y rentabilidad.',
        label: 'Acumulado',
        amount: 984200,
        downloadUrl: null,
    },
]

export async function fetchSalesSummary(period) {
    return salesSummaryMock
}

export async function fetchReportDocuments() {
    return reportDocumentsMock
}