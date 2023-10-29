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
    },
    {
      path: '/three4',
      name: 'three4',
      component: () => import('../views/three4.vue')
    },
    {
      path: '/three5',
      name: 'three5',
      component: () => import('../views/three5.vue')
    },
    {
      path: '/three6',
      name: 'three6',
      component: () => import('../views/three6.vue')
    },
    {
      path: '/three7',
      name: 'three7',
      component: () => import('../views/three7.vue')
    },
    {
      path: '/three8',
      name: 'three8',
      component: () => import('../views/three8.vue')
    },
    {
      path: '/three9',
      name: 'three9',
      component: () => import('../views/three9.vue')
    }
  ]
})

export default router
