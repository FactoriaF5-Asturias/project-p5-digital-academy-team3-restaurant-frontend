<script setup>
import MainHeader from '../components/common/MainHeader.vue'
import MainFooter from '../components/common/MainFooter.vue';
import HeroSection from '../components/home/HeroSection.vue';
import ContactSection from '../components/home/ContactSection.vue';
import MenuSection from '../components/home/MenuSection.vue';

function handleAddToCart(payload){
    console.log(payload)
}
</script>

<template>
    <MainHeader />
    <main>
        <HeroSection />
        <MenuSection @add-to-cart="handleAddToCart" />
        <ContactSection />
    </main>
    <MainFooter />
</template>