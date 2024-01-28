import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather',
      name: 'weather',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/WeatherView.vue')
    },
    {
      path: '/family-friendly-trails',
      name: 'family-friendly trails',
      component: () => import('@/views/FamilyFriendlyTrailsView.vue')
    },
    {
      path: '/easy-trails',
      name: 'easy trails',
      component: () => import('@/views/EasyTrailsView.vue')
    },
    {
      path: '/moderate-trails',
      name: 'moderate trails',
      component: () => import('@/views/ModerateTrailsView.vue')
    },
    {
      path: '/expert-trails',
      name: 'expert trails',
      component: () => import('@/views/ExpertTrailsView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue')
    },
    {
      path: '/about-us',
      name: 'about us',
      component: () => import('@/views/AboutUsView.vue')
    }
  ]
})

export default router
