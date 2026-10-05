<template>
    <aside class="sidebar-admin">
        <RouterLink to="/admin" class="sidebar-admin__brand">
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
    flex w-full shrink-0 flex-col gap-4
    border-b border-border-default bg-bg-container p-4 shadow-sm
    md:sticky md:top-0 md:h-screen md:w-64
    md:gap-8 md:border-b-0 md:p-6;
}

.sidebar-admin__brand {
    @apply
    hidden font-display text-2xl font-bold
    text-text-brand no-underline md:block;
}

.sidebar-admin__nav {
    @apply
    flex gap-2 overflow-x-auto md:flex-col;
}

.sidebar-admin__link {
    @apply
    shrink-0 rounded-lg px-4 py-3 font-body text-sm font-semibold
    text-text-muted no-underline transition-colors
    hover:bg-bg-container-high hover:text-text-brand;
}

.sidebar-admin__link--active {
    @apply
    bg-bg-brand text-text-on-brand
    hover:bg-bg-brand hover:text-text-on-brand;
}
</style>
