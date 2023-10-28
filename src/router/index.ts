import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/three1',
      name: 'three1',
      component: () => import('../views/three1.vue')
    },
    {
      path: '/three2',
      name: 'three2',
      component: () => import('../views/three2.vue')
    },
    {
      path: '/three3',
      name: 'three3',
      component: () => import('../views/three3.vue')
    }
  ]
})

export default router
