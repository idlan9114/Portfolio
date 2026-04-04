import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import DesignPage from '@/views/DesignPage.vue'
import PhotoshopIllustrator from '@/components/DesignCom/PhotoshopIllustrator.vue'
import Drawing from '@/components/DesignCom/Drawing.vue'
import BrandDesign from '@/components/DesignCom/BrandDesign.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: MainPage },
    { path: '/Design', name: 'design', component: DesignPage },
    { path: '/design/photoshop-illustrator', name: 'photoshop-illustrator', component: PhotoshopIllustrator },
    { path: '/design/drawing', name: 'drawing', component: Drawing },
    { path: '/design/brand-design', name: 'brand-design', component: BrandDesign },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router