<script setup>
import NavBar from './components/NavBar.vue';
import HomeView from './views/HomeView.vue';
import WeatherView from './views/WeatherView.vue';
import ParallaxScrollingTransition from './views/ParallaxScrollingTransition.vue';
import FamilyFriendlyTrailsTransition from './views/FamilyFriendlyTrailsTransition.vue';
import FamilyFriendlyTrailsView from './views/FamilyFriendlyTrailsView.vue';
import EasyTrailsTransition from './views/EasyTrailsTransition.vue';
import EasyTrailsView from './views/EasyTrailsView.vue';
import ModerateTrailsTransition from './views/ModerateTrailsTransition.vue';
import ModerateTrailsView from './views/ModerateTrailsView.vue';
import ExpertTrailsTransition from './views/ExpertTrailsTransition.vue';
import ExpertTrailsView from './views/ExpertTrailsView.vue';
import GalleryView from './views/GalleryView.vue';
import AboutUsView from './views/AboutUsView.vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { useStore } from 'vuex';

import { onMounted, ref } from 'vue';

const containerAnimation = ref(null);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const mains = gsap.utils.toArray('main');

  const scrollTween = gsap.to(mains, {
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

  containerAnimation.value = scrollTween;

  const store = useStore();
  store.commit('setContainerAnimation', scrollTween);
});
</script>

<template>
  <HomeView :container-animation="containerAnimation"></HomeView>
  <WeatherView :container-animation="containerAnimation"></WeatherView>
  <ParallaxScrollingTransition :container-animation="containerAnimation"></ParallaxScrollingTransition>
  <FamilyFriendlyTrailsTransition :container-animation="containerAnimation"></FamilyFriendlyTrailsTransition>
  <FamilyFriendlyTrailsView :container-animation="containerAnimation"></FamilyFriendlyTrailsView>
  <EasyTrailsTransition :container-animation="containerAnimation"></EasyTrailsTransition>
  <EasyTrailsView :container-animation="containerAnimation"></EasyTrailsView>
  <ModerateTrailsTransition :container-animation="containerAnimation"></ModerateTrailsTransition>
  <ModerateTrailsView :container-animation="containerAnimation"></ModerateTrailsView>
  <ExpertTrailsTransition :container-animation="containerAnimation"></ExpertTrailsTransition>
  <ExpertTrailsView :container-animation="containerAnimation"></ExpertTrailsView>
  <GalleryView :container-animation="containerAnimation"></GalleryView>
  <AboutUsView :container-animation="containerAnimation"></AboutUsView>


  <NavBar></NavBar>
</template>

<style scoped></style>
