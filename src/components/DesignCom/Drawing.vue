<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface DesignItem {
  id: string
  name: string
  url: string
}

const router = useRouter()
const images = ref<DesignItem[]>([])
const loading = ref(true)

const lightboxVisible = ref(false)
const lightboxSrc = ref('')
const lightboxName = ref('')

function openLightbox(img: DesignItem) {
  lightboxSrc.value = img.url
  lightboxName.value = img.name
  lightboxVisible.value = true
}

function formatFileName(fileName: string): string {
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

async function loadGallery() {
  try {
    loading.value = true
    const imageModules = import.meta.glob<{ default: string }>(
      '@/assets/Images/DrawingGallery/**/*.(jpg|jpeg|png|gif|webp)',
      { eager: true }
    )
    const loadedImages: DesignItem[] = Object.entries(imageModules).map(
      ([path, module], index) => {
        const fileName = path.split('/').pop() || `drawing-${index}`
        return { id: `drawing-${index}`, name: formatFileName(fileName), url: module.default }
      }
    )
    images.value = loadedImages
  } catch (e) {
    console.error('Error loading gallery:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => loadGallery())
</script>

<template>
  <Navbar />
  <main class="gallery-main min-h-screen bg-black text-white">

    <button class="back-btn" @click="router.push('/Design')">
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Back
    </button>

    <div class="page-header text-center px-6">
      <h1 class="page-title">
        <span class="highlight">Drawing</span>
      </h1>
      <p class="page-sub">Hand-drawn sketches, illustrations, and traditional art pieces.</p>
    </div>

    <div v-if="loading" class="state-msg">
      <div class="spinner" />
      <p>Loading gallery…</p>
    </div>

    <div v-else-if="images.length === 0" class="state-msg">
      <p>No drawings to display yet.</p>
    </div>

    <!-- Desktop: masonry | Mobile: 2-col grid -->
    <div v-else class="gallery-grid">
      <div
        v-for="img in images"
        :key="img.id"
        class="gallery-item"
        @click="openLightbox(img)"
      >
        <img :src="img.url" :alt="img.name" class="gallery-img" loading="lazy" />
        <div class="gallery-caption">{{ img.name }}</div>
      </div>
    </div>

  </main>

  <ImageLightbox
    :src="lightboxSrc"
    :name="lightboxName"
    accent="#e87d3e"
    :visible="lightboxVisible"
    @close="lightboxVisible = false"
  />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

.gallery-main {
  padding-top: 9rem;
  padding-bottom: 6rem;
  font-family: 'DM Sans', sans-serif;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 2rem;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  transition: color 0.25s;
  padding: 0;
  margin-bottom: 3rem;
}
.back-btn:hover { color: #e87d3e; }
.page-header { margin-bottom: 4rem; animation: fadeUp 0.6s ease both; }
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 1rem;
}
.highlight { color: #e87d3e; }
.page-sub { color: #666; font-size: 0.9rem; }
.state-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #555;
  padding: 5rem 1rem;
}
.spinner {
  width: 36px; height: 36px;
  border: 2px solid rgba(255,255,255,0.08);
  border-top-color: #e87d3e;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Desktop: masonry */
.gallery-grid {
  columns: 3 280px;
  column-gap: 1.25rem;
  padding: 0 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeUp 0.7s ease 0.2s both;
}
.gallery-item {
  position: relative;
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  cursor: pointer;
  margin-bottom: 1.25rem;
  break-inside: avoid;
  transition: border-color 0.3s, transform 0.3s;
}
.gallery-item:hover { border-color: #e87d3e; transform: scale(1.015); }
.gallery-img {
  width: 100%;
  display: block;
  transition: transform 0.4s ease;
}
.gallery-item:hover .gallery-img { transform: scale(1.04); }
.gallery-caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(0,0,0,0.75);
  color: #e87d3e;
  font-size: 0.85rem;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.gallery-item:hover .gallery-caption { transform: translateY(0); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Mobile: 2-col grid (override masonry) */
@media (max-width: 640px) {
  .gallery-main { padding-top: 7rem; }
  .back-btn { margin-left: 1rem; margin-bottom: 1.5rem; }
  .gallery-grid {
    columns: unset;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
    padding: 0 0.75rem 3rem;
  }
  .gallery-item {
    border-radius: 0.625rem;
    margin-bottom: 0;
    break-inside: unset;
  }
  .gallery-img { height: 100%; object-fit: cover; }
  .gallery-caption {
    transform: translateY(0);
    font-size: 0.65rem;
    padding: 0.4rem;
  }
}
</style>