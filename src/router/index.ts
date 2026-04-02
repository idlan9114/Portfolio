import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import DesignPage from '@/views/DesignPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: MainPage },
    { path: '/Design', name: 'design', component: DesignPage },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router