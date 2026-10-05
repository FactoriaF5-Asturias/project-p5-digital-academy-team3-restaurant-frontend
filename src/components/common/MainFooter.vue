<script setup>
    import restaurantLogo from '../../assets/logo.png'
    import hannaAvatar from '../../assets/developers/hannafr14.jpg'
    import iulianAvatar from '../../assets/developers/iulian640.jpg'
    import joseAvatar from '../../assets/developers/joseang1.png'
    import rubenAvatar from '../../assets/developers/ruben-campal-1996.png'
    import simoneAvatar from '../../assets/developers/simoneavilarranz.jpg'
    import zookattAvatar from '../../assets/developers/zookatt.png'

    const developers = [
        { name: 'Hanna', avatar: hannaAvatar, url: 'https://github.com/hannafr14' },
        { name: 'Iulian', avatar: iulianAvatar, url: 'https://github.com/iulian640' },
        { name: 'Jose', avatar: joseAvatar, url: 'https://github.com/joseang1' },
        { name: 'Ruben', avatar: rubenAvatar, url: 'https://github.com/ruben-campal-1996' },
        { name: 'Simone', avatar: simoneAvatar, url: 'https://github.com/simoneavilarranz' },
        { name: 'Zookatt', avatar: zookattAvatar, url: 'https://github.com/zookatt' },
    ]

</script>

<template>
    <footer class="flex flex-col items-start gap-4 px-10 py-5 bg-bg-container text-text-muted shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-20">
        <div>
            <RouterLink class="flex items-center gap-2 hover:underline underline-offset-2 active:text-text-brand" to="/" aria-label="Ir a página principal">
                <img class="h-7" :src="restaurantLogo" alt="">
                <span class="font-['Playfair-Display'] text-xl font-bold">Giacobello</span>
            </RouterLink>
             <span class="text-base max-w-20 sm:max-w-none">
                © 2026 Giacobello Gastronomía Italiana
            </span>
        </div>

        <div class="flex flex-wrap items-center gap-3">
            <a
                v-for="developer in developers"
                :key="developer.name"
                :href="developer.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block shrink-0 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-border-brand"
            >
                <img
                    class="h-9 w-9 rounded-full object-cover"
                    :src="developer.avatar"
                    :alt="developer.name"
                >
            </a>
        </div>
       
    </footer>
</template>