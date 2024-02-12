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
            trigger: '#parallax-scrolling-transition',
            containerAnimation: scrollTween,
            scrub: 1,
            start: "left right",
            end: "+=" + (window.innerWidth * 3),
        },
    });

    const fakePin = gsap.to('#parallax-scrolling-transition', { x: window.innerWidth, ease: 'none' });

    ScrollTrigger.create({

        trigger: "#parallax-scrolling-transition",
        containerAnimation: scrollTween,
        start: 'left left',
        end: "+=" + window.innerWidth,
        scrub: true,
        animation: fakePin

    });

    tl
        .fromTo('#parallax-scrolling-transition #are-you',
            {
                transform: 'translateY(-70vh) rotate(90deg)',
            },
            {
                transform: 'translateY(85vh) rotate(90deg)',
                ease: "none",
            }, 0)
        .fromTo('#parallax-scrolling-transition #ready-for-adventure',
            {
                transform: 'translateX(80vw)',
            },
            {
                transform: 'translateX(-90vw)',
                ease: "none",
            }, 0);
});
</script>

<template>
    <main id="parallax-scrolling-transition">
        <span id="are-you">
            Are you
        </span>

        <span id="ready-for-adventure">
            Ready for adventure?
        </span>
    </main>
</template>

<style scoped>
#parallax-scrolling-transition {
    z-index: 0;
}

#are-you,
#ready-for-adventure {
    position: absolute;
    will-change: transform;
    text-transform: uppercase;
    font-size: larger;
    letter-spacing: 0.8em;
    text-wrap: nowrap;
    font-size: xx-large;
}

#are-you {
    top: 40%;
    left: 30%;
    z-index: -100;
}

#ready-for-adventure {
    top: 50%;
    left: 0;
}
</style>