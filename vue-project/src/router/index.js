import { createRouter, createWebHistory } from 'vue-router'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/views/WeatherView.vue')
    },
    {
      path: '/family-friendly-trails',
      name: 'family-friendly-trails',
      component: () => import('@/views/FamilyFriendlyTrailsView.vue')
    },
    {
      path: '/easy-trails',
      name: 'easy-trails',
      component: () => import('@/views/EasyTrailsView.vue')
    },
    {
      path: '/moderate-trails',
      name: 'moderate-trails',
      component: () => import('@/views/ModerateTrailsView.vue')
    },
    {
      path: '/expert-trails',
      name: 'expert-trails',
      component: () => import('@/views/ExpertTrailsView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue')
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: () => import('@/views/AboutUsView.vue')
    }
  ]
})

// https://gsap.com/community/forums/topic/31802-help-with-jumping-to-section-using-scrolltoplugin-in-fake-horizontal-scrolling-layout/?do=findComment&comment=159032
/*
Returns a FUNCTION that you can feed an element to get its scroll position.
- targets: selector text, element, or Array of elements 
- containerAnimation: the horizontal scrolling tween/timeline. Must have an ease of "none"/"linear".
- position: defaults to "left left" but can be anything like "center center", "100px 80%", etc. Same format as "start" and "end" ScrollTrigger values.
*/
function getScrollLookup(targets, containerAnimation, position) {
  let triggers = gsap.utils.toArray(targets).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: position || 'left left',
        containerAnimation: containerAnimation
      })
    ),
    st = containerAnimation.scrollTrigger

  return (target) => {
    let t = gsap.utils.toArray(target)[0],
      i = triggers.length
    while (i-- && triggers[i].trigger !== t) {
      /* empty */
    }
    return i >= 0
      ? st.start + (triggers[i].start / containerAnimation.duration()) * (st.end - st.start)
      : console.warn('target not found', target)
  }
}

const waitForContainerAnimation = setInterval(() => {
  if (store.state.containerAnimation) {
    const getPosition = getScrollLookup('main', store.state.containerAnimation, 'center center')

    // Horizontal scrollTo (not an actual router navigation)
    router.afterEach((to) => {
      gsap.to(window, { duration: 2, scrollTo: getPosition('#' + to.name) })
    })

    clearInterval(waitForContainerAnimation)
  }
}, 100)

export default router
