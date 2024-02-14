<script setup>
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';

import { ref } from 'vue';

const carousel = ref(null);
</script>

<template>
    <main id="gallery">
        <sl-carousel ref="carousel" mouse-dragging navigation>
            <sl-carousel-item v-for="index in 11" :key="index">
                <!-- @click="carousel.goToSlide(index - 1, smooth)" -->
                <img :src="`/images/gallery/${index + 20}.png`" :alt="`${index + 20}.png`">
            </sl-carousel-item>
        </sl-carousel>
    </main>
</template>

<style scoped>
#gallery {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 4rem);
}

sl-carousel {
    height: 90%;
    width: 100%;
    --scroll-hint: 10%;
}

/* TODO: make prev and next item smaller */
</style>