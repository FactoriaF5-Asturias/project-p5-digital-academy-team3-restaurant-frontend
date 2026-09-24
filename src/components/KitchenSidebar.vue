<template>
  <aside class="kitchen-sidebar">
    <div class="kitchen-sidebar__top">
      <div class="kitchen-sidebar__brand">
        Bella Vita
      </div>

      <nav class="kitchen-sidebar__nav" aria-label="Navegación principal">
        <div class="kitchen-sidebar__link">
          Dashboard
        </div>
      </nav>
    </div>

    <div class="kitchen-sidebar__profile">
      <p class="kitchen-sidebar__profile-name">Executive Chef</p>
      <p class="kitchen-sidebar__profile-id">Staff ID #204</p>
    </div>
  </aside>
</template>

<style scoped>
@reference "../main.css";

.kitchen-sidebar {
  @apply order-2 border-t border-border-default bg-bg-container p-5 shadow-sm md:fixed md:left-0 md:top-0 md:order-none md:flex md:h-screen md:w-56 md:flex-col md:justify-between md:border-t-0;
}

.kitchen-sidebar__top {
  @apply hidden md:flex md:flex-col;
}

.kitchen-sidebar__brand {
  @apply text-lg font-bold text-text-brand;
}

.kitchen-sidebar__nav {
  @apply mt-10;
}

.kitchen-sidebar__link {
  @apply flex rounded-md bg-bg-brand-darker px-4 py-3 text-sm font-semibold text-text-on-brand;
}

.kitchen-sidebar__profile {
  @apply flex items-center gap-4 rounded-none bg-transparent p-0 text-sm text-text-default md:block md:rounded-lg md:bg-bg-surface md:p-3;
}

.kitchen-sidebar__profile-name {
  @apply font-medium;
}

.kitchen-sidebar__profile-id {
  @apply text-xs text-text-muted;
}
</style>