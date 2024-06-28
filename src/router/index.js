import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Orcamento from '../views/Orcamento.vue'
import Calculator from '../views/Calculator.vue'
import ListItems from '../views/ListItems.vue'
import PdfView from '../views/Viewpage.vue'
import Admin from '../views/Config.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pdfview',
    name: 'pdf-view',
    component: PdfView
  },
  {
    path: '/orcamento',
    name: 'orc-view',
    component: Orcamento
  },
  {
    path: '/calc',
    name: 'orc-calc',
    component: Calculator
  },
  {
    path: '/items',
    name: 'list-items',
    component: ListItems
  },
  {
    path: '/admin',
    name: 'adm-config',
    component: Admin
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
