<script setup>
import { ref } from 'vue'
import MenuSearch from '../components/home/MenuSearch.vue'
import OrderFilter from '../components/OrderFilter.vue'
import SalesSummaryCard from '../components/reports/SalesSummaryCard.vue'

const searchText = ref('')
const selectedPeriod = ref('day')

const periodOptions = [
    { label: 'Día', value: 'day' },
    { label: 'Mes', value: 'month' },
    { label: 'Año', value: 'year' },
    { label: 'Trimestre', value: 'quarter' },
]

const salesSummary = {
    date: 'Hoy, 24 Oct 2023',
    totalOrders: 94,
    income: 4250,
    previousIncome: 3780,
    chart: [35, 55, 42, 70, 95],
}
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

                <MenuSearch v-model="searchText" />
            </section>

            <SalesSummaryCard :summary="salesSummary" />
        </section>
    </main>
</template>

<style scoped>
@reference "../main.css";

.sales-report {
    @apply
        min-h-screen
        bg-bg-body
        px-6
        py-16
        text-text-default
        md:px-12
        lg:px-20;
}

.sales-report__container {
    @apply
        mx-auto
        max-w-5xl;
}

.sales-report__header {
    @apply
        mb-8;
}

.sales-report__title {
    @apply
        font-display
        text-4xl
        font-bold;
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
        gap-4
        md:flex-row
        md:items-center
        md:justify-between;
}
</style>