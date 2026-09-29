<template>
    <aside class="sidebar-admin">
        <RouterLink to="/" class="sidebar-admin__brand">
            Giacobello
        </RouterLink>
        <nav class="sidebar-admin__nav" aria-label="Administration">
            <RouterLink to="/admin/productos">Productos</RouterLink>
            <RouterLink to="/admin/pedidos">Pedidos</RouterLink>
        </nav>
    </aside>
</template>