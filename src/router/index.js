import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级
import layout from '@/views/layout/index.vue'
import login from '@/views/login/index.vue'
import myorder from '@/views/myorder/index.vue'
import pay from '@/views/pay/index.vue'
import prodetail from '@/views/prodetail/index.vue'
import search from '@/views/search/index.vue'
import searchList from '@/views/search/searchList.vue'

// 二级
import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import cart from '@/views/layout/cart.vue'
import user from '@/views/layout/user.vue'

import store from '@/store'

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
