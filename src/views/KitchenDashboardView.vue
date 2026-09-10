<script setup>
import KitchenHeader from '../components/KitchenHeader.vue'
import KitchenSidebar from '../components/KitchenSidebar.vue'

const orderSummary = {
  newOrders: 12,
  inProgressOrders: 5,
  readyOrders: 8,
}
</script>

<template>
  <div class="kitchen-dashboard">
    <KitchenSidebar />

    <main class="kitchen-dashboard__main">
      <KitchenHeader :summary="orderSummary" />

      <div class="kitchen-dashboard__content">
        <section class="kitchen-dashboard__title-section">
          <h1 class="kitchen-dashboard__title">
            Cola de Preparación
          </h1>
        </section>

        <section class="kitchen-dashboard__body">
          <!-- Aquí irá el contenido del Kitchen Dashboard -->
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "../main.css";

.kitchen-dashboard {
  @apply min-h-screen bg-bg-body;
}

.kitchen-dashboard__main {
  @apply min-h-screen pl-56;
}

.kitchen-dashboard__content {
  @apply px-8 py-6;
}

.kitchen-dashboard__title-section {
  @apply mb-8;
}

.kitchen-dashboard__title {
  @apply text-2xl font-bold text-text-default;
}

.kitchen-dashboard__body {
  @apply mt-8;
}
</style>