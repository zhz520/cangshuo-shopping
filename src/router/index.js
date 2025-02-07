import Vue from 'vue'
import VueRouter from 'vue-router'

// 二级
import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import cart from '@/views/layout/cart.vue'
import user from '@/views/layout/user.vue'

import store from '@/store'

// 一级
import layout from '@/views/layout/index.vue'
const login = () => import('@/views/login/index.vue')
const myorder = () => import('@/views/myorder/index.vue')
const pay = () => import('@/views/pay/index.vue')
const prodetail = () => import('@/views/prodetail/index.vue')
const search = () => import('@/views/search/index.vue')
const searchList = () => import('@/views/search/searchList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      { path: '/home', component: home },
      { path: '/category', component: category },
      { path: '/cart', component: cart },
      { path: '/user', component: user }
    ]
  },
  { path: '/login', component: login },
  { path: '/myorder', component: myorder },
  { path: '/searchList', component: searchList },
  { path: '/pay', component: pay },
  { path: '/prodetail/:id', component: prodetail },
  { path: '/search', component: search }
]

const router = new VueRouter({
  routes
})

const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.state.user.userInfo.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
