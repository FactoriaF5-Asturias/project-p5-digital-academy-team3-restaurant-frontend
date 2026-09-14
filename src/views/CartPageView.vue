<template>
    <div class="cart-page">
        <div class="cart-page_layout">
            <p v-if="isLoading" class="cart-page_status">Cargando cesta...</p>

            <div v-else-if="loadError" class="cart-page_status">
                <p>No se pudo cargar tu cesta.</p>
                <button type="button" @click="loadItems">Reintentar</button>
            </div>

            <p v-else-if="items.length === 0" class="cart-page_status">Tu cesta está vacía</p>

            <CartItemsSection
                v-else
                :items="items"
                @increment="incrementQty"
                @decrement="decrementQty"
                @remove="removeItem"
                @continue-shopping="$router.push('/menu')"
            />
            
            <aside class="cart-page_summary">
                <p>Subtotal: {{ subtotal.toFixed(2) }}€</p>
                <p>Envío: {{ shipping.toFixed(2) }}€</p>
                <p>Total: {{ total.toFixed(2) }}€</p>
            </aside>
        </div>
    </div>
</template>