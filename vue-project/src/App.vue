<script setup>
import NavBar from './components/NavBar.vue';
import HomeView from './views/HomeView.vue';
import WeatherView from './views/WeatherView.vue';
import FamilyFriendlyTrailsView from './views/FamilyFriendlyTrailsView.vue';
import EasyTrailsView from './views/EasyTrailsView.vue';
import ModerateTrailsView from './views/ModerateTrailsView.vue';
import ExpertTrailsView from './views/ExpertTrailsView.vue';
import GalleryView from './views/GalleryView.vue';
import AboutUsView from './views/AboutUsView.vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { onMounted } from 'vue';

onMounted(() => {
  const mains = gsap.utils.toArray('main');

  gsap.to(mains, {
    scrollTrigger: {
      trigger: '#app',
      pin: true,
      scrub: 1,
      snap: 1 / (mains.length - 1),
      end: () => "+=" + document.querySelector('#app').offsetWidth,
    },
    xPercent: -100 * (mains.length - 1),
    ease: "none",
  });
});
</script>

<template>
  <HomeView></HomeView>
  <WeatherView></WeatherView>
  <FamilyFriendlyTrailsView></FamilyFriendlyTrailsView>
  <EasyTrailsView></EasyTrailsView>
  <ModerateTrailsView></ModerateTrailsView>
  <ExpertTrailsView></ExpertTrailsView>
  <GalleryView></GalleryView>
  <AboutUsView></AboutUsView>


  <NavBar></NavBar>
</template>

<style scoped></style>
