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
    },
    // 11 - BufferGeometry  设置顶点
    {
      path: '/three11',
      name: 'three11',
      component: () => import('../views/three11.vue')
    },
    {
      path: '/three12starDemo',
      name: 'three12starDemo',
      component: () => import('../views/three12starDemo.vue')
    },
    {
      path: '/three13',
      name: 'three13',
      component: () => import('../views/three13.vue')
    },
    {
      path: '/three14',
      name: 'three14',
      component: () => import('../views/three14.vue')
    },
    {
      path: '/three15',
      name: 'three15',
      component: () => import('../views/three15.vue')
    },
    {
      path: '/three16',
      name: 'three16',
      component: () => import('../views/three16.vue')
    },
    {
      path: '/three17',
      name: 'three17',
      component: () => import('../views/three17.vue')
    },
    {
      path: '/three18',
      name: 'three18',
      component: () => import('../views/three18.vue')
    },
    // {
    //   path: '/three19',
    //   name: 'three19',
    //   component: () => import('../views/three18.vue')
    // },
    // {
    //   path: '/three20',
    //   name: 'three20',
    //   component: () => import('../views/three18.vue')
    // },
    {
      path: '/three21',
      name: 'three21',
      component: () => import('../views/three21.vue')
    },
    {
      path: '/three21starFall',
      name: 'three21starFall',
      component: () => import('../views/three21starFall.vue')
    }
  ]
})

export default router
