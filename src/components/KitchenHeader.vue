<script setup>
import userIcon from '../assets/user.svg'

defineProps({
  summary: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <header class="kitchen-header">
    <div class="kitchen-header__content">
      <div class="kitchen-header__stats">
        <div class="kitchen-header__stat">
          <p class="kitchen-header__label">Nuevos</p>
          <p class="kitchen-header__value kitchen-header__value--red">
            {{ summary.newOrders }}
          </p>
        </div>

        <div class="kitchen-header__stat">
          <p class="kitchen-header__label">En curso</p>
          <p class="kitchen-header__value kitchen-header__value--green">
            {{ summary.inProgressOrders }}
          </p>
        </div>

        <div class="kitchen-header__stat">
          <p class="kitchen-header__label">Listos</p>
          <p class="kitchen-header__value">
            {{ summary.readyOrders }}
          </p>
        </div>

        <div class="kitchen-header__divider"></div>

        <div class="kitchen-header__status">
          <p class="kitchen-header__status-label">Service Status</p>
          <p class="kitchen-header__status-value">OPERATIONAL</p>
        </div>
      </div>

      <button
        class="kitchen-header__profile-button"
        type="button"
        aria-label="Perfil de usuario"
      >
        <img
          :src="userIcon"
          alt=""
          class="kitchen-header__profile-icon"
        />
      </button>
    </div>
  </header>
</template>

<style scoped>
@reference "../main.css";

.kitchen-header {
  @apply h-16 border-b border-border-default bg-bg-container;
}

.kitchen-header__content {
  @apply flex h-full items-center justify-between px-6 md:px-8;
}

.kitchen-header__stats {
  @apply flex items-center gap-4 md:gap-8;
}

.kitchen-header__stat {
  @apply min-w-14;
}

.kitchen-header__label {
  @apply text-[10px] font-medium uppercase text-text-muted;
}

.kitchen-header__value {
  @apply text-sm font-bold text-text-default;
}

.kitchen-header__value--red {
  @apply text-text-brand;
}

.kitchen-header__value--green {
  @apply text-text-special;
}

.kitchen-header__divider {
  @apply h-8 border-l border-border-default;
}

.kitchen-header__status {
  @apply hidden min-w-36 md:block;
}

.kitchen-header__status-label {
  @apply text-[10px] text-text-muted;
}

.kitchen-header__status-value {
  @apply text-sm font-bold text-text-special;
}

.kitchen-header__profile-button {
  @apply flex h-8 w-8 items-center justify-center rounded-full bg-bg-brand-darker;
}

.kitchen-header__profile-icon {
  @apply h-4 w-4;
}
</style>