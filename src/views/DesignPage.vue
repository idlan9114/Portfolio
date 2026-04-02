<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref, onMounted } from 'vue'

interface DesignItem {
  id: string
  name: string
  url: string
}

const images = ref<DesignItem[]>([])
const loading = ref(true)

function formatFileName(fileName: string): string {
  // Remove file extension and format the name
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
  // Replace hyphens and underscores with spaces and capitalize
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

async function loadGallery() {
  try {
    loading.value = true
    
    // Dynamically import all images from AdobeGallery folder
    const imageModules = import.meta.glob<{ default: string }>(
      '/src/assets/Images/AdobeGallery/**/*.(jpg|jpeg|png|gif|webp)',
      { eager: true }
    )
    
    // Convert imported modules to DesignItem array
    const loadedImages: DesignItem[] = Object.entries(imageModules).map(
      ([path, module], index) => {
        const fileName = path.split('/').pop() || `design-${index}`
        return {
          id: `adobe-${index}`,
          name: formatFileName(fileName),
          url: module.default
        }
      }
    )
    
    images.value = loadedImages
    loading.value = false
  } catch (e) {
    console.error('Error loading gallery:', e)
    loading.value = false
  }
}

onMounted(() => loadGallery())
</script>


<template>
    <Navbar/>
    <main class="gallery-main min-h-screen bg-black text-white">

        <h1 class="text-5xl sm:text-4xl md:text-5xl lg:text-[5rem] text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 font-bold px-4">
        Design <span class="text-[#1db9be]">Gallery</span>
        </h1>

        <!-- Loading -->
        <div v-if="loading" class="text-center text-base sm:text-xl md:text-2xl lg:text-3xl text-[#aaa] mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-4">
        <p>Loading gallery...</p>
        </div>

        <!-- Empty -->
        <div v-else-if="images.length === 0" class="text-center text-base sm:text-xl md:text-2xl lg:text-3xl text-[#aaa] mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-4">
        <p>No designs to display yet.</p>
        </div>

        <!-- Gallery Grid -->
        <div v-else 
            class="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-6 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 md:py-12 lg:pt-16 lg:pb-24">
            <div
                v-for="img in images"
                :key="img.id"
                class="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent
                    transition-all duration-300 ease-in-out hover:border-[#1db9be] hover:scale-[1.02] group"
            >
                <img
                :src="img.url"
                :alt="img.name"
                class="w-full h-full object-cover block"
                />
                <div
                class="absolute bottom-0 w-full bg-black/70 text-[#1db9be] px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-[1.4rem]
                        text-center translate-y-full transition-transform duration-300 ease-in-out
                        group-hover:translate-y-0"
                >
                {{ img.name }}
                </div>
            </div>
        </div>

    </main>
</template>

<style scoped>
.gallery-main {
  padding-top: 12rem;
}
.gallery-main .gallery {
  padding-top: 6rem;
}

@media (max-width: 767px) {
  .gallery-main .gallery {
    padding-top: 4rem;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 6rem;
  }
}
</style>