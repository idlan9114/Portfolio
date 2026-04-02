<template>
  <section class="banner reveal" id="design" v-reveal>
        <div class="slider" :style="{ '--quantity': designImages.length }">
            <div 
              v-for="(img, index) in designImages" 
              :key="img.id"
              class="item" 
              :style="{ '--position': index + 1 }">
              <img :src="img.url" :alt="img.name">
            </div>
        </div>
        <div class="content">
            <h1 data-content="DESIGN">DESIGN</h1>
            <div class="author">
                <h2>M.IDLAN</h2>
                <p><b>Photoshop & Illustrator</b></p>
                <p>Where Ideas Become Algorithms</p>
            </div>
            <div class="model"></div>
        </div>
        <RouterLink 
            to="/Design" 
            style="padding: 10px 30px;"
            class="fixed bottom-18 right-40 sm:right-25 inline-block whitespace-nowrap bg-black text-[#9ececf] font-mono text-2xl font-semibold tracking-[0.2em] rounded-full border-2 border-[#9ececf] no-underline z-50 cursor-pointer transition-all duration-300 hover:bg-[#9ececf] hover:text-black">
            More Design >
        </RouterLink>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface DesignItem {
  id: string
  name: string
  url: string
}

const designImages = ref<DesignItem[]>([])

async function loadDesignImages() {
  try {
    // Dynamically import all images from AdobeGallery folder
    const imageModules = import.meta.glob<{ default: string }>(
      '/src/assets/Images/AdobeGallery/**/*.(png|jpg|jpeg|gif|webp)',
      { eager: true }
    )
    
    // Convert imported modules to DesignItem array
    const loadedImages: DesignItem[] = Object.entries(imageModules).map(
      ([path, module], index) => {
        const fileName = path.split('/').pop() || `design-${index}`
        return {
          id: `design-${index}`,
          name: fileName,
          url: module.default
        }
      }
    )
    
    designImages.value = loadedImages.slice(0, 10)
  } catch (e) {
    console.error('Error loading design images:', e)
  }
}

onMounted(() => loadDesignImages())
</script>