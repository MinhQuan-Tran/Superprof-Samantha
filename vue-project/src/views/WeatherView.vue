<script setup>
import '@shoelace-style/shoelace/dist/components/switch/switch.js';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, reactive, computed } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const weather = reactive({
  temp: 0,
  rain: 0,
  temp_unit_C: true,
});

const computedTemp = computed(() => {
  return weather.temp_unit_C ? weather.temp : ((weather.temp * 9 / 5) + 32);
});

onMounted(() => {
  gsap.to('.background', {
    scrollTrigger: {
      trigger: '.background',
      scrub: 1,
      start: 'top top',
      end: 'bottom bottom',
    },
    rotation: 360,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m,rain`).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);

        weather.temp = data.current.temperature_2m;
        weather.rain = data.current.rain;
      });
    });

  } else {
    console.log("Geolocation is not supported by this browser.");
  }

});
</script>

<template>
  <main>
    <div class="content">
      <img class="background" style="--order: 1" src="@/assets/blob.svg" alt="blob">
      <img class="background" style="--order: 2" src="@/assets/blob.svg" alt="blob">
      <img class="background" style="--order: 3" src="@/assets/blob.svg" alt="blob">
      <h1>Joshua Tree National Park</h1>
      <time datetime="2024-01-15">Monday 15 January, 2024</time>
      <p>{{ computedTemp }}℃<sl-switch @sl-change="weather.temp_unit_C = !weather.temp_unit_C">℉</sl-switch></p>
    </div>
  </main>
</template>

<style scoped>
main {
  position: relative;
}

.content {
  width: fit-content;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
}

.background {
  filter: sepia(calc(100% / var(--order)));
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  z-index: -1;
  transform-origin: center;
  animation: rotate calc(60s * var(--order)) linear infinite;
}

@keyframes rotate {
  0% {
    transform: scale(3.5) rotate(calc(var(--order) * 30deg));
  }

  100% {
    transform: scale(3.5) rotate(calc(1turn + (var(--order) * 30deg)));
  }
}
</style>
