<template>
    <div class="cart-loading" role="status" aria-live="polite">
        <span class="sr-only">Cargando tu cesta...</span>

        <div v-for="n in 3" class="cart-loading_item">
            <div class="cart-loading_img"></div>
            <div class="cart-loading_body">
                <div class="cart-loading_line--title"></div>
                <div class="cart-loading_line--desc"></div>
                <div class="cart-loading_line--price"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference '../main.css';

.cart-loading {
    @apply
    flex flex col gap-4;
}

.cart-loading_item {
    @apply
    flex gap-4 rounded-lg
    border border-border-default bg-bg-container p-4;
}

.cart-loading_img {
    @apply
    h-20 w-20 shrink-0 animate-pulse
    rounded bg-bg-container-high;
}

.cart-loading_body {
    @apply
    flex flex-1 flex-col gap-2 py-1;
}

.cart-loading_line {
    @apply
    animate-pulse rounded bg-bg-container-high;
}

.cart-loading_line--title {
    @apply
    h-4 w-1/3;
}

.cart-loading_line--desc {
    @apply
    h-3 w-2/3;
}

.cart-loading_line--price {
    @apply
    mt-2 h-4 w-16;
}

.sr-only {
    @apply
    asolute h-px w-px overflow hidden whitespace-nowrap;
    clip: rect(0, 0, 0);
}
</style>