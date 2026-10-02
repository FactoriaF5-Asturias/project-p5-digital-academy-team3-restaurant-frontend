<template>
    <aside class="sidebar-admin">
        <RouterLink to="/" class="sidebar-admin__brand">
            Giacobello
        </RouterLink>
        <nav class="sidebar-admin__nav" aria-label="Administration">
            <RouterLink
                to="/admin/products"
                class="sidebar-admin__link"
                active-class="sidebar-admin__link--active"
            >
                Productos
            </RouterLink>
            <RouterLink 
                to="/admin/orders"
                class="sidebar-admin__link"
                active-class="sidebar-admin__link--active"
            >
                Pedidos
            </RouterLink>

            <RouterLink
                to="/admin/reports"
                class="sidebar-admin__link"
                active-class="sidebar-admin__link--active"
            >
                Informes
            </RouterLink>
        </nav>
    </aside>
</template>

<style scoped>
@reference '../../main.css';

.sidebar-admin {
    @apply
    flex w-full shrink-0 flex-col gap-8
    bg-bg-container p-5 shadow-sm
    md:sticky md:top-0 md:h-screen
    md:w-64 md:p-6;
}

.sidebar-admin__brand {
    @apply
    font-display text-2xl font-bold
    text-text-brand no-underline;
}

.sidebar-admin__nav {
    @apply
    flex flex-col gap-2;
}

.sidebar-admin__link {
    @apply
    rounded-lg px-4 py-3 font-body text-sm font-semibold
    text-text-muted no-underline transition-colors
    hover:bg-bg-container-high hover:text-text-brand;
}

.sidebar-admin__link--active {
    @apply
    bg-bg-brand text-text-on-brand
    hover:bg-bg-brand hover:text-text-on-brand;
}
</style>
