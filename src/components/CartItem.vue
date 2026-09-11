<script setup>
    
    defineProps({
        item: {
            type: Object,
            required: true,
            // se espera: { id, name, description, price, quantity, image }
        }
    })

    defineEmits(['increment', 'decrement', 'remove'])

    function formatPrice(value) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(value)
    }

</script>

<template>
    <article class="flex flex-col gap-4
                    rounded-2xl border border-stone-200 bg-white
                    p-4 sm:flex-row">
        <img
            :src="item.image"
            :alt="item.name"
            class="h-36 w-full shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
        />

        <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-2">
                <h2 class="font-serif text-lg">{{ item.name }}</h2>
                <button
                    class="cursor-pointer border-none bg-transparent px-1 text-xl leading-none text-stone-400 transition-colors hover:text-red-900"
                    type="button"
                    :aria-label="`Quitar ${item.name} de la cesta`"
                    @click="$emit('remove', item.id)"
                >
                    x
                </button>
            </div>

            <p class="mb-3 mt-1 truncate text-sm text-stone-500">{{ item.description }}</p>

            <div class="flex items-center justify-between">
                <span class="font-serif font-bold text-red-900">{{ formatPrice(item.price) }}</span>

                <div class="flex items-center gap-2.5 rounded-full bg-stone-100 px-2.5 py-1">
                    <button
                        type="button"
                        class="flex h-5.5 w-5.5 cursor-pointer items-center justify-center
                        rounded-full border-none bg-transparent text-base leading-none
                        text-stone-900 disabled:cursor-not-allowed disabled:opacity-35"
                        :disabled="item.quantity <= 1"
                        :aria-label="`Reducir cantidad de ${item.name}`"
                        @click="$emit('decremente', item.id)"
                    >
                        -
                    </button>
                    <span class="min-w-3.5 text-center text-sm">{{ item.quantity }}</span>
                    <button
                        type="button"
                        class="flex h-5.5 w-5.5 cursor pointer items-center justify-center
                        rounded-full border-none bg-transparent text-base leading-none
                        text-stone-900"
                        :aria-lable="`Aumentar cantidad de ${item.name}`"
                        @click="$emit('increment', item.id)"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>