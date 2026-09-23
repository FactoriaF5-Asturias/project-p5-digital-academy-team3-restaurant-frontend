<script setup>
import locationIcon from '../../assets/location.svg'
import clockIcon from '../../assets/clock.svg'
import phoneIcon from '../../assets/phone.svg'
</script>
<template>
    <section class="contact-section">
        <div class="contact-section__content">
            <div class="contact-section__info">
                <h2 class="contact-section__title">
                    Encuéntranos
                </h2>

                <div class="contact-section__list">
                    <div class="contact-section__item">
                        <img
                            :src="locationIcon"
                            alt=""
                            class="contact-section__icon"
                        />

                        <div>
                            <h3 class="contact-section__subtitle">Dirección</h3>
                            <p class="contact-section__text">Calle Roma 123, Barrio Gótico</p>
                            <p class="contact-section__text">08002, Barcelona</p>
                        </div>
                    </div>

                    <div class="contact-section__item">
                        <img
                            :src="clockIcon"
                            alt=""
                            class="contact-section__icon"
                        />

                        <div>
                            <h3 class="contact-section__subtitle">Horario</h3>
                            <p class="contact-section__text">Lun - Jue: 13:00 - 23:00</p>
                            <p class="contact-section__text">Vie - Sáb: 13:00 - 00:00</p>
                            <p class="contact-section__text contact-section__text--brand">Domingo: 12:30 - 22:30</p>
                        </div>
                    </div>

                    <div class="contact-section__item">
                        <img
                            :src="phoneIcon"
                            alt=""
                            class="contact-section__icon"
                        />

                        <div>
                            <h3 class="contact-section__subtitle">Contacto</h3>
                            <p class="contact-section__text">+34 93 123 45 67</p>
                            <p class="contact-section__text">hola@bellavita.es</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contact-section__map">
                <iframe
                    class="contact-section__map-frame"
                    title="Mapa de Bella Vita en Barcelona"
                    src="https://www.google.com/maps?q=Calle%20Roma%20123%2C%20Barcelona&z=15&output=embed"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </section>
</template>
<style scoped>
@reference "../../main.css";
.contact-section {
    @apply
        bg-bg-container
        py-20;
}

.contact-section__content {
    @apply
        grid
        grid-cols-1
        md:grid-cols-[420px_1fr]
        items-center
        gap-12
        px-10
        md:px-20;
}

.contact-section__info {
    @apply
        flex
        flex-col
        gap-14;
}

.contact-section__title {
    @apply
        font-serif
        text-3xl
        font-bold
        text-text-brand;
}

.contact-section__list {
    @apply
        flex
        flex-col
        gap-6;
}

.contact-section__item {
    @apply
        flex
        items-start
        gap-4;
}

.contact-section__icon {
    @apply
        h-5
        w-5
        shrink-0;
}

.contact-section__subtitle {
    @apply
        mb-2
        text-sm
        font-bold
        uppercase
        tracking-wide
        text-text-default;
}

.contact-section__text {
    @apply
        text-base
        leading-relaxed
        text-text-muted;
}

.contact-section__text--brand {
    @apply
        font-medium
        text-text-brand;
}

.contact-section__map {
    @apply
        mt-4
        md:mt-23
        overflow-hidden
        rounded-3xl
        border
        border-border-default
        shadow-xl;
}

.contact-section__map-frame {
    @apply
        w-full
        border-0;
        height: 320px;
}
</style>