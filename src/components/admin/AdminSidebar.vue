<template>
    <aside class="sidebar-admin">
        <RouterLink to="/" class="sidebar-admin__brand">
            Giacobello
        </RouterLink>
        <nav class="sidebar-admin__nav" aria-label="Administration">
            <RouterLink to="/admin/products">Productos</RouterLink>
            <RouterLink to="/admin/orders">Pedidos</RouterLink>
        </nav>
    </aside>
</template>