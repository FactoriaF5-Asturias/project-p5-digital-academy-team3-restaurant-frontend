<script setup>
import MainHeader from '../components/common/MainHeader.vue';
import loginPhoto from '../assets/login-photo.jpg';
import eyeIcon from '../assets/eye.svg'
</script>

<template>
    <MainHeader />
    <main>
        <div>
            <div>
                <img :src="loginPhoto" alt="Foto de comida italiana">
            </div>
            <div>
                <form>
                    <h1>Iniciar sesión</h1>
                    <p>Accede a tu cuenta para gestionar tus pedidos y disfrutar de ofertas exclusivas.</p>
                    <div>
                        <label for="email">EMAIL</label>
                        <input id="email" type="email" placeholder="tu@email.com">
                    </div>
                    <div>
                        <div>
                            <label for="password">CONTRASEÑA</label>
                        </div>
                        <div>
                            <input id="password">
                            <button type="button">
                                <img :src="eyeIcon" alt="">
                            </button>
                        </div>
                    </div>
                    <div>
                        <input id="remember" type="checkbox">
                        <label for="remember">Recordarme</label>
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </div>
    </main>
</template>