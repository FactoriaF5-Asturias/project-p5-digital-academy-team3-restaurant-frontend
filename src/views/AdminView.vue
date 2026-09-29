<script setup>

    import AdminSidebar from '../components/admin/AdminSidebar.vue'

</script>

<template>
    <div class="admin-page">
        <div class="admin-page__layout">
            <AdminSidebar />
            <main class="admin-page__main">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style scoped>
@reference '../main.css';

.admin-page {
    @apply
    min-h-screen
    bg-bg-body;
}

.admin-page__layout {
    @apply
    flex min-h-screen;
}

.admin-page__main {
    @apply
    min-w-0 flex-1
    p-6 md:p-10;
}
</style>