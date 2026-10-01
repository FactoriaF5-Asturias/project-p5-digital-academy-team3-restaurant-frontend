<script setup>
import totalOrdersIcon from '../../assets/reports/total-orders.svg'

defineProps({
    summary: {
        type: Object,
        required: true,
    },
})

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    }).format(value)
}
</script>
<template>
    <section class="sales-summary-card">
        <div class="sales-summary-card__header">
            <div>
                <p class="sales-summary-card__title">
                    Ingresos Totales
                </p>

                <p class="sales-summary-card__date">
                    {{ summary.date }}
                </p>
            </div>

            <div class="sales-summary-card__orders-chip">
                <img
                    class="sales-summary-card__orders-icon"
                    :src="totalOrdersIcon"
                    alt=""
                >

                <div>
                    <p class="sales-summary-card__orders-label">
                        Pedidos Totales
                    </p>

                    <p class="sales-summary-card__orders-value">
                        {{ summary.totalOrders }}
                    </p>
                </div>
            </div>
        </div>

        <div class="sales-summary-card__income">
            <strong class="sales-summary-card__income-value">
                {{ formatCurrency(summary.income) }}
            </strong>

            <span class="sales-summary-card__income-compare">
                vs {{ formatCurrency(summary.previousIncome) }} ayer
            </span>
        </div>

        <div class="sales-summary-card__chart">
            <div
                v-for="(value, index) in summary.chart"
                :key="index"
                class="sales-summary-card__chart-bar"
                :style="{ height: `${value}%` }"
            ></div>
        </div>
    </section>
</template>

<style scoped>
@reference "../../main.css";

.sales-summary-card {
    @apply
        mb-10
        flex
        min-h-[320px]
        flex-col
        rounded-3xl
        bg-bg-container
        p-5
        shadow-xl
        md:min-h-[420px]
        md:p-8;
}

.sales-summary-card__header {
    @apply
        flex
        items-start
        justify-between
        gap-3
        md:gap-6;
}

.sales-summary-card__title {
    @apply
        text-lg
        font-bold;
}

.sales-summary-card__date {
    @apply
        mt-1
        text-xs
        uppercase
        text-text-muted;
}

.sales-summary-card__orders-chip {
    @apply
        flex
        items-center
        gap-2
        rounded-2xl
        bg-bg-container-high
        px-3
        py-2
        md:gap-3
        md:px-4
        md:py-3;
}

.sales-summary-card__orders-icon {
    @apply
        h-5
        w-5
        shrink-0;
}

.sales-summary-card__orders-label {
    @apply
        text-[10px]
        uppercase
        text-text-muted
        md:text-xs;
}

.sales-summary-card__orders-value {
    @apply
        text-base
        font-bold
        text-text-special
        md:text-lg;
}

.sales-summary-card__income {
    @apply
        mt-8
        flex
        flex-wrap
        items-baseline
        gap-6;
}

.sales-summary-card__income-value {
    @apply
        text-4xl
        font-bold
        text-text-brand
        md:text-5xl;
}

.sales-summary-card__income-compare {
    @apply
        text-sm
        text-text-muted;
}

.sales-summary-card__chart {
    @apply
        mt-auto
        flex
        h-28
        w-full
        items-end
        justify-center
        gap-3
        md:h-44
        md:justify-end
        md:gap-4;
}

.sales-summary-card__chart-bar {
    @apply
        w-7
        rounded-t-xl
        bg-bg-brand
        md:w-14;
}
</style>