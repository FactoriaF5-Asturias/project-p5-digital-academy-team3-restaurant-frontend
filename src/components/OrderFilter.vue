<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },

    labelSecondLine: {
        type: String,
        default: '',
    },

    options: {
        type: Array,
        required: true,
    },

    modelValue: {
        type: String,
        required: true,
    },

    variant: {
        type: String,
        default: 'primary',
    },
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
    <div class="order-filter">
        <p class="order-filter__label">
            <span>{{ label }}</span>
            <span v-if="labelSecondLine">{{ labelSecondLine }}</span>
        </p>

        <div class="order-filter__options">
            <button
                v-for="option in options"
                :key="option.value"
                class="order-filter__button"
                :class="[
                    `order-filter__button--${variant}`,
                    {
                        'order-filter__button--active': modelValue === option.value,
                    },
                ]"
                type="button"
                @click="emit('update:modelValue', option.value)"
            >
                {{ option.label }}
            </button>
        </div>
    </div>
</template>
<style scoped>
@reference "../main.css";

.order-filter {
    @apply flex items-center gap-4;
}

.order-filter__label {
  @apply flex flex-col text-sm font-semibold uppercase leading-tight text-text-muted;
}

.order-filter__options {
    @apply flex rounded-full bg-bg-surface p-1 shadow-sm;
}

.order-filter__button {
  @apply rounded-full font-semibold text-text-muted;
}

.order-filter__button--primary {
  @apply px-7 py-4 text-sm;
}

.order-filter__button--secondary {
  @apply px-5 py-1 text-sm;
}

.order-filter__button--active {
  @apply bg-bg-brand-darker text-text-on-brand shadow-md;
}
</style>