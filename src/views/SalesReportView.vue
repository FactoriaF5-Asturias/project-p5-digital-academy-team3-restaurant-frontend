<script setup>
import { onMounted, ref, watch } from 'vue'
import { fetchSalesSummary, fetchReportDocuments } from '../services/ReportService.js'
import OrderFilter from '../components/OrderFilter.vue'
import SalesSummaryCard from '../components/reports/SalesSummaryCard.vue'
import ReportDocumentsSection from '../components/reports/ReportDocumentsSection.vue'

const selectedPeriod = ref('day')

const periodOptions = [
    { label: 'Día', value: 'day' },
    { label: 'Mes', value: 'month' },
    { label: 'Año', value: 'year' },
    { label: 'Trimestre', value: 'quarter' },
]

const salesSummary = ref(null)
const reportDocuments = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

async function loadReportsData() {
    try {
        isLoading.value = true
        errorMessage.value = ''

        salesSummary.value = await fetchSalesSummary(selectedPeriod.value)
        reportDocuments.value = await fetchReportDocuments()
    } catch {
        errorMessage.value = 'No se pudieron cargar los informes.'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadReportsData()
})

watch(selectedPeriod, () => {
    loadReportsData()
})
</script>

<template>
    <main class="sales-report">
        <section class="sales-report__container">
            <header class="sales-report__header">
                <h1 class="sales-report__title">
                    Resumen de Ventas
                </h1>

                <p class="sales-report__subtitle">
                    Análisis detallado y gestión documental del rendimiento comercial de Bella Vita.
                </p>
            </header>

            <section class="sales-report__toolbar">
                <OrderFilter
                    v-model="selectedPeriod"
                    label=""
                    :options="periodOptions"
                    variant="secondary"
                />
            </section>

            <p
                v-if="isLoading"
                class="sales-report__message"
            >
                Cargando informes...
            </p>

            <p
                v-else-if="errorMessage"
                class="sales-report__message"
            >
                {{ errorMessage }}
            </p>

            <template v-else>
                <SalesSummaryCard
                    v-if="salesSummary"
                    :summary="salesSummary"
                />

                <ReportDocumentsSection :reports="reportDocuments" />
            </template>
        </section>
    </main>
</template>

<style scoped>
@reference "../main.css";

.sales-report {
    @apply
        text-text-default;
}

.sales-report__container {
    @apply
        mx-auto
        w-full
        max-w-5xl;
}

.sales-report__header {
    @apply
        mb-5
        md:mb-8;
}

.sales-report__title {
    @apply
        font-display
        text-3xl
        font-bold
        md:text-4xl;
}

.sales-report__subtitle {
    @apply
        mt-2
        max-w-xl
        text-sm
        text-text-muted;
}

.sales-report__toolbar {
    @apply
        mb-6
        flex
        flex-col
        gap-3
        md:flex-row
        md:items-center
        md:justify-between;
}

.sales-report__message {
    @apply
        mt-8
        text-sm
        text-text-muted;
}
</style>
