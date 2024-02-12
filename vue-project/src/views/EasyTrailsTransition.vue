<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { watch } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
    containerAnimation: {
        type: Object,
        required: true,
    },
});

watch(() => props.containerAnimation, (scrollTween) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#easy-trails-transition',
            containerAnimation: scrollTween,
            scrub: 1,
            start: "left right",
            end: "right left",
        },
    });

    tl.fromTo('#easy-trails-transition #easy-trails-text',
        {
            xPercent: 200,
        },
        {
            xPercent: -300,
            ease: "none",
        });
    // Progress: 50% 
    // => xPercent: -50 (make element centered) 
    // => if start xPercent: 200 
    // => half distance from start to end: 200 - -50 = 250
    // => full distance from start to end: 250 * 2 = 500
    // => end xPercent: 200 - 500 = -300
});
</script>

<template>
    <main id="easy-trails-transition">
        <div class="content">
            <div class="blobs">
                <img style="--order: 1; --filter: opacity(0.7);" src="@/assets/blob-1.svg" alt="blob">
                <img style="--order: 2; --filter: opacity(0.3);" src="@/assets/blob-1.svg" alt="blob">
                <img style="--order: 3;" src="@/assets/blob-1.svg" alt="blob">
                <div></div>
            </div>
            <p class="description">
                Easy trails are perfect for those who are new to hiking or simply seeking a low-impact outdoor activity.
                These trails generally have well-groomed paths and minimal obstacles. Hikers can expect a tranquil and
                enjoyable environment, perfect for connecting with nature without the challenges of more demanding terrain.
            </p>
        </div>

        <span id="easy-trails-text">
            Easy Trails
        </span>
    </main>
</template>

<style scoped>
.content {
    width: fit-content;
    position: absolute;
    top: 50%;
    right: 30%;
    transform: translate(50%, -50%);
}

.blobs {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
}

.blobs img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1000px;
    height: 1000px;
    filter: var(--filter);
    object-fit: contain;
    z-index: -1;
    transform-origin: center center;
    transform: translate(-54%, -50%) rotate(110deg);
}

.description {
    position: relative;
    z-index: 1;
    width: 530px;
    letter-spacing: 2.6px;
}

#easy-trails-text {
    position: absolute;
    top: 20%;
    left: 80%;
    will-change: transform;
    text-transform: uppercase;
    font-size: larger;
    letter-spacing: 0.8em;
    text-wrap: nowrap;
}
</style>