import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from "./auth-guard";
import Login from '@/views/Login.vue';
import HomeView from '../views/HomeView.vue'
import Orcamento from '../views/Orcamento.vue'
import Calculator from '../views/Calculator.vue'
import ListItems from '../views/ListItems.vue'
import PdfView from '../views/Viewpage.vue'
import Admin from '../views/Config.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: AuthGuard,
  },
  {
    path: '/pdfview',
    name: 'pdf-view',
    component: PdfView,
    beforeEnter: AuthGuard,
  },
  {
    path: '/orcamento',
    name: 'orc-view',
    component: Orcamento,
    beforeEnter: AuthGuard,
  },
  {
    path: '/calc',
    name: 'orc-calc',
    component: Calculator,
    beforeEnter: AuthGuard,
  },
  {
    path: '/items',
    name: 'list-items',
    component: ListItems,
    beforeEnter: AuthGuard,
  },
  {
    path: '/admin',
    name: 'adm-config',
    component: Admin,
    beforeEnter: AuthGuard,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
