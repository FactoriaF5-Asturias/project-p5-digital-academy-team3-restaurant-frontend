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
  @apply fixed left-0 top-0 flex h-screen w-56 flex-col justify-between bg-bg-container p-5 shadow-sm;
}

.kitchen-sidebar__top {
  @apply flex flex-col;
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
  @apply rounded-lg bg-bg-surface p-3 text-sm text-text-default;
}

.kitchen-sidebar__profile-name {
  @apply font-medium;
}

.kitchen-sidebar__profile-id {
  @apply text-xs text-text-muted;
}
</style>