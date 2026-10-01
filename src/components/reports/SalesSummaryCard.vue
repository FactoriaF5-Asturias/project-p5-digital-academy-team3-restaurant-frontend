<script setup>
import totalOrdersIcon from '../../assets/reports/total-orders.svg'

defineProps({
    summary: {
        type: Object,
        required: true,
    },
})
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

            <div class="sales-summary-card__content">
                <div class="sales-summary-card__income">
                    <strong class="sales-summary-card__income-value">
                       € {{ summary.income }}
                    </strong>

                    <span class="sales-summary-card__income-compare">
                        vs € {{ summary.previousIncome }} ayer
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
            </div>
    </section>
</template>

<style scoped>
@reference "../../main.css";

.sales-summary-card {
    @apply
        mb-10
        rounded-3xl
        bg-bg-container
        p-8
        shadow-xl;
}

.sales-summary-card__header {
    @apply
        flex
        items-start
        justify-between
        gap-6;
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
        gap-3
        rounded-2xl
        bg-bg-container-high
        px-4
        py-3;
}

.sales-summary-card__orders-icon {
    @apply
        h-5
        w-5
        shrink-0;
}

.sales-summary-card__orders-label {
    @apply
        text-xs
        uppercase
        text-text-muted;
}

.sales-summary-card__orders-value {
    @apply
        text-lg
        font-bold
        text-text-special;
}

.sales-summary-card__content {
    @apply
        mt-12
        flex
        flex-col
        gap-8
        md:flex-row
        md:items-end
        md:justify-between;
}

.sales-summary-card__income {
    @apply
        flex
        flex-wrap
        items-baseline
        gap-4;
}

.sales-summary-card__income-value {
    @apply
        text-4xl
        font-bold
        text-text-brand;
}

.sales-summary-card__income-compare {
    @apply
        text-sm
        text-text-muted;
}

.sales-summary-card__chart {
    @apply
        flex
        h-36
        w-40
        items-end
        justify-center
        gap-2;
}

.sales-summary-card__chart-bar {
    @apply
        w-5
        rounded-t-xl
        bg-bg-brand;
}
</style>