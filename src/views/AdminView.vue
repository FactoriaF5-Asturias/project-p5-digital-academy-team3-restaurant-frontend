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