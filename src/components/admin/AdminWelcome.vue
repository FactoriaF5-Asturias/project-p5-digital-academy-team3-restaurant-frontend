<template>
    <section class="admin-welcome" aria-labelledby="admin-welcome-title">
        <div class="admin-welcome__intro">
            <p class="admin-welcome__eyebrow">Panel de administración</p>
            <h1 id="admin-welcome-title">¡Bienvenido a Giacobello!</h1>
            <p class="admin-welcome__description">
                Desde aquí puedes gestionar los productos, revisar los pedidos y consultar los informes del restaurante.
            </p>
        </div>

        <div class="admin-welcome__cards">
            <RouterLink to="/admin/products" class="admin-welcome__card">
                <span class="admin-welcome__card-title">Productos</span>
                <span class="admin-welcome__card-description">Añade, edita y actualiza los productos del menú.</span>
                <span class="admin-welcome__card-action">Gestionar productos →</span>
            </RouterLink>

            <RouterLink to="/admin/orders" class="admin-welcome__card">
                <span class="admin-welcome__card-title">Pedidos</span>
                <span class="admin-welcome__card-description">Consulta el historial y el estado de los pedidos.</span>
                <span class="admin-welcome__card-action">Ver pedidos →</span>
            </RouterLink>

            <RouterLink to="/admin/reports" class="admin-welcome__card">
                <span class="admin-welcome__card-title">Informes</span>
                <span class="admin-welcome__card-description">Revisa las ventas y descarga los informes disponibles.</span>
                <span class="admin-welcome__card-action">Consultar informes →</span>
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>
@reference '../../main.css';

.admin-welcome {
    @apply mx-auto w-full max-w-6xl;
}

.admin-welcome__intro {
    @apply mb-10 rounded-2xl bg-bg-container p-8 shadow-sm md:p-12;
}

.admin-welcome__eyebrow {
    @apply mb-3 font-body text-sm font-semibold uppercase tracking-wider text-text-brand;
}

.admin-welcome__intro h1 {
    @apply mb-4 font-display text-3xl font-bold text-text-default md:text-5xl;
}

.admin-welcome__description {
    @apply max-w-2xl font-body text-base leading-relaxed text-text-muted md:text-lg;
}

.admin-welcome__cards {
    @apply grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3;
}

.admin-welcome__card {
    @apply flex min-h-64 flex-col items-start rounded-2xl border border-border-default bg-bg-container p-6 no-underline shadow-sm transition hover:-translate-y-1 hover:shadow-md;
}

.admin-welcome__card-title {
    @apply mb-2 font-display text-xl font-bold text-text-default;
}

.admin-welcome__card-description {
    @apply mb-6 font-body text-sm leading-relaxed text-text-muted;
}

.admin-welcome__card-action {
    @apply mt-auto font-body text-sm font-semibold text-text-brand;
}
</style>
