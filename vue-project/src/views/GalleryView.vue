<script setup>
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';

import { ref } from 'vue';

const carousel = ref(null);
</script>

<template>
    <main id="gallery">
        <sl-carousel ref="carousel">
            <sl-carousel-item v-for="index in 11" :key="index" @click="carousel.goToSlide(index - 1, smooth)">
                <img :src="`/images/gallery/${index + 20}.png`" :alt="`${index + 20}.png`">
            </sl-carousel-item>
        </sl-carousel>
    </main>
</template>

<style scoped>
sl-carousel {
    --scroll-hint: 10%;
}

/* TODO: make prev and next item smaller */
</style>