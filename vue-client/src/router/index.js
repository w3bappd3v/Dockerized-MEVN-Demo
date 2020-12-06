import Vue from 'vue'
import VueRouter from 'vue-router'
import Listings from '../views/Listings.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Listings',
    component: Listings
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
