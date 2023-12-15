import { createRouter, createWebHashHistory } from 'vue-router'
// import storage from '@/utils/sessionStore.js';
// import { defineAsyncComponent, h } from 'vue'
import HomeView from '../views/HomeView.vue'

// 自动路由配置(自动导入views文件下所有的文件内的.vue文件进行注册到路由，除了文件名叫components下的vue文件不会被注册进行路由，默认这是一个组件文件夹)
const routeFiles = import.meta.glob('../views/**/*.vue') // 获取所有views文件下的.vue文件
// const routeFiles = import.meta.glob('../views/*.vue') // 获取所有views文件下的.vue文件
const routesList = [] // 储存符合路由页面的对象内容
// 会有一些页面不需要自动注册，需要我们手动添加的就在这里上路径
const notRead = [
  '../views/index.vue',
  '../views/login.vue',
  '../views/index-data.vue',
  '../views/notFound.vue.vue'
]
console.log('log--> routeFiles', routeFiles)

Object.keys(routeFiles).forEach((key) => {
  if (key.indexOf('components') === -1 && notRead.indexOf(key) === -1) {
    // 排除组件 和 不需要自动注册的路由
    console.log('log--> key', key)
    const name = key.match(/\.\/(.+)\.vue$/)[1]
    console.log('log--> name', name)

    const component = routeFiles[key]
    console.log('log-->component ', component)

    routesList.push({
      path: `/${name.toLowerCase()}`,
      component: component.default || component,
      name: name
    })
  }
})

console.log('log--> routesList', routesList)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/three1',
    name: 'three1',
    component: () => import('../views/three1.vue')
  },
  {
    path: '/three2',
    name: 'three2',
    component: () => import('/src/views/three1.vue')
  },
  ...routesList
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  //   children: [
  //     {
  //       path: '/',
  //       name: 'index-data',
  //       component: HomeView
  //     }
  //     // ...routesList // 自动配置在这个路由下（可以根据自己的需求进行调整）
  //   ]
  // }
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/views/notFound.vue')
  // }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  next()
})

export default router
