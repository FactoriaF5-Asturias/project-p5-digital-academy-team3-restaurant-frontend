<script setup>
import reportDocumentIcon from '../../assets/reports/report-document.svg'
import generateReportIcon from '../../assets/reports/generate-report.svg'
import downloadReportIcon from '../../assets/reports/download-report.svg'

defineProps({
    reports: {
        type: Array,
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
    <section class="report-documents">
        <h2 class="report-documents__title">
            Documentos y Reportes
        </h2>

        <div class="report-documents__grid">
            <article
                v-for="report in reports"
                :key="report.id"
                class="report-documents__card"
            >
                <div class="report-documents__meta">
                    <span class="report-documents__icon">
                        <img
                            class="report-documents__icon-image"
                            :src="reportDocumentIcon"
                            alt=""
                        >
                    </span>

                    <span class="report-documents__date">
                        {{ report.date }}
                    </span>
                </div>

                <h3 class="report-documents__card-title">
                    {{ report.title }}
                </h3>

                <p class="report-documents__description">
                    {{ report.description }}
                </p>

                <div class="report-documents__amount">
                    <span>{{ report.label }}</span>
                    <strong>{{ formatCurrency(report.amount) }}</strong>
                </div>

                <div class="report-documents__actions">
                    <button
                        type="button"
                        class="report-documents__generate-button"
                        :href="report.downloadUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            class="report-documents__action-icon"
                            :src="generateReportIcon"
                            alt=""
                        >

                        <span>Generar</span>
                    </button>

                    <a
                        class="report-documents__download-button"
                        :href="report.downloadUrl"
                        aria-label="Descargar reporte"
                    >
                        <img
                            class="report-documents__action-icon"
                            :src="downloadReportIcon"
                            alt=""
                        >
                    </a>
                </div>
            </article>
        </div>
    </section>
</template>

<style scoped>
@reference "../../main.css";

.report-documents {
    @apply
        mt-8;
}

.report-documents__title {
    @apply
        mb-5
        font-display
        text-2xl
        font-bold
        text-text-default
        md:text-xl;
}

.report-documents__grid {
    @apply
        grid
        gap-6
        md:grid-cols-3;
}

.report-documents__card {
    @apply
        flex
        min-h-56
        flex-col
        rounded-2xl
        bg-bg-container
        p-4
        shadow-xl
        md:min-h-72
        md:rounded-3xl
        md:p-6;
}

.report-documents__meta {
    @apply
        mb-5
        flex
        items-center
        justify-between
        gap-3
        text-xs
        text-text-muted
        md:mb-6;
}

.report-documents__icon {
    @apply
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        bg-bg-surface;
}

.report-documents__icon-image {
    @apply
        h-5
        w-5;
}

.report-documents__date {
    @apply
        text-xs
        text-text-muted;
}

.report-documents__card-title {
    @apply
        text-xl
        font-bold
        text-text-default;
}

.report-documents__description {
    @apply
        mt-2
        min-h-16
        text-sm
        leading-relaxed
        text-text-muted
        md:min-h-20;
}

.report-documents__amount {
    @apply
        mt-5
        flex
        items-center
        justify-between
        border-t
        border-border-default
        pt-4
        text-sm;
}

.report-documents__amount span {
    @apply
        text-text-muted;
}

.report-documents__amount strong {
    @apply
        text-text-default;
}

.report-documents__actions {
    @apply
        mt-auto
        flex
        items-center
        justify-between
        pt-5
        md:pt-8;
}

.report-documents__generate-button {
    @apply
        flex
        items-center
        gap-2
        text-sm
        font-semibold
        text-text-default;
}

.report-documents__action-icon {
    @apply
        h-4
        w-4
        shrink-0;
}

.report-documents__download-button {
    @apply
        flex
        h-10
        w-10
        cursor-pointer
        items-center
        justify-center
        rounded-xl
        text-text-brand
        transition-colors
        hover:bg-bg-brand
        hover:text-text-on-brand;
}
</style>