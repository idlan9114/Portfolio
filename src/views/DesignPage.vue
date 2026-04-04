<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()

// Load up to 3 preview images per gallery folder
const adobePreviews   = ref<string[]>([])
const drawingPreviews = ref<string[]>([])
const brandPreviews     = ref<string[]>([])

function loadPreviews(
  modules: Record<string, { default: string }>,
  target: typeof adobePreviews
) {
  const urls = Object.values(modules)
    .slice(0, 3)
    .map((m) => m.default)
  target.value = urls
}

onMounted(() => {
  // Adobe / Photoshop / Illustrator
  const adobeModules = import.meta.glob<{ default: string }>(
    '@/assets/Images/AdobeGallery/**/*.(jpg|jpeg|png|gif|webp)',
    { eager: true }
  )
  loadPreviews(adobeModules, adobePreviews)

  // Drawing
  const drawingModules = import.meta.glob<{ default: string }>(
    '@/assets/Images/DrawingGallery/**/*.(jpg|jpeg|png|gif|webp)',
    { eager: true }
  )
  loadPreviews(drawingModules, drawingPreviews)

  // Brand Design
  const brandModules = import.meta.glob<{ default: string }>(
    '@/assets/Images/BrandDesignGallery/**/*.(jpg|jpeg|png|gif|webp)',
    { eager: true }
  )
  loadPreviews(brandModules, brandPreviews)
})

const sections = [
  {
    name: 'Photoshop & Illustrator',
    route: '/design/photoshop-illustrator',
    accent: '#1db9be',
    label: 'Adobe Suite',
    previews: adobePreviews,
  },
  {
    name: 'Drawing',
    route: '/design/drawing',
    accent: '#e87d3e',
    label: 'Illustration',
    previews: drawingPreviews,
  },
  {
    name: 'Brand Design',
    route: '/design/brand-design',
    accent: '#a78bfa',
    label: 'UI / UX',
    previews: brandPreviews,
  },
]
</script>

<template>
  <Navbar />
  <main class="design-main min-h-screen bg-black text-white">

    <!-- Hero Header -->
    <div class="hero-header text-center px-6">
      <h1 class="page-title">
        Design <span class="accent-teal">Gallery</span>
      </h1>
      <p class="subtitle">Explore the different creative work</p>
    </div>

    <!-- 3 Stacked Card Sections -->
    <div class="sections-row">
      <div
        v-for="(section, i) in sections"
        :key="section.route"
        class="section-col"
        @click="router.push(section.route)"
      >
        <!-- Fanned paper stack -->
        <div class="stack-wrapper">

          <!-- Back card 2 (leftmost) -->
          <div class="card card--back-2" :style="{ '--accent': section.accent }">
            <img
              v-if="section.previews.value[2]"
              :src="section.previews.value[2]"
              class="card-img"
              alt=""
            />
            <div v-else class="card-empty" />
          </div>

          <!-- Back card 1 (middle) -->
          <div class="card card--back-1" :style="{ '--accent': section.accent }">
            <img
              v-if="section.previews.value[1]"
              :src="section.previews.value[1]"
              class="card-img"
              alt=""
            />
            <div v-else class="card-empty" />
          </div>

          <!-- Front card -->
          <div class="card card--front" :style="{ '--accent': section.accent }">
            <img
              v-if="section.previews.value[0]"
              :src="section.previews.value[0]"
              class="card-img"
              alt=""
            />
            <div v-else class="card-empty">
              <span class="card-empty-label">No images yet</span>
            </div>
            <!-- Overlay gradient so accent shows even on images -->
            <div class="card-overlay" />
          </div>

        </div>

        <!-- Section Label + Name -->
        <div class="section-label-wrap">
          <span class="section-overline" :style="{ color: section.accent }">{{ section.label }}</span>
          <h2 class="section-name">{{ section.name }}</h2>
          <div class="section-arrow" :style="{ color: section.accent }">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Explore</span>
          </div>
        </div>

      </div>
    </div>

  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

* { box-sizing: border-box; }

.design-main {
  padding-top: 10rem;
  padding-bottom: 6rem;
  font-family: 'DM Sans', sans-serif;
}

/* ── Hero ── */
.hero-header {
  margin-bottom: 7rem;
  animation: fadeUp 0.7s ease both;
}
.overline-text {
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #1db9be;
  opacity: 0.65;
  margin-bottom: 0.75rem;
}
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 1rem;
}
.accent-teal { color: #1db9be; }
.subtitle { color: #555; font-size: 0.9rem; }

/* ── Row ── */
.sections-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: clamp(3rem, 7vw, 8rem);
  padding: 0 4rem;
  flex-wrap: wrap;
}

/* ── Column ── */
.section-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
  cursor: pointer;
  animation: fadeUp 0.7s ease both;
}
.section-col:nth-child(2) { animation-delay: 0.13s; }
.section-col:nth-child(3) { animation-delay: 0.26s; }

/* ── Paper Stack ── */
.stack-wrapper {
  position: relative;
  width: 220px;
  height: 285px;
}

/* Shared card */
.card {
  position: absolute;
  width: 180px;
  height: 240px;
  border-radius: 12px;
  border: 1.5px solid rgba(255,255,255,0.07);
  overflow: hidden;
  transition:
    transform 0.45s cubic-bezier(.22,.68,0,1.15),
    border-color 0.35s ease,
    box-shadow 0.4s ease;
}

/* Back card 2 */
.card--back-2 {
  bottom: 0;
  left: 0;
  transform: rotate(-11deg) translateY(5px);
  z-index: 1;
  background: #0c0c0c;
  filter: brightness(0.55) saturate(0.6);
}

/* Back card 1 */
.card--back-1 {
  bottom: 0;
  left: 16px;
  transform: rotate(-4deg) translateY(2px);
  z-index: 2;
  background: #0f0f0f;
  filter: brightness(0.7) saturate(0.7);
}

/* Front card */
.card--front {
  bottom: 0;
  left: 32px;
  transform: rotate(3deg);
  z-index: 3;
  background: #141414;
}

/* Accent top stripe */
.card--front::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  opacity: 0;
  z-index: 5;
  border-radius: 12px 12px 0 0;
  transition: opacity 0.3s;
}

/* Image fills card */
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

/* Subtle gradient overlay on front card for depth */
.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    transparent 40%,
    rgba(0,0,0,0.45) 100%
  );
  pointer-events: none;
  z-index: 4;
}

/* Empty state */
.card-empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
}
.card-empty-label {
  font-size: 0.7rem;
  color: #333;
  letter-spacing: 0.05em;
}

/* ── Hover: fan out ── */
.section-col:hover .card--back-2 {
  transform: rotate(-20deg) translateX(-14px) translateY(8px);
  border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 10px 36px rgba(0,0,0,0.6);
  filter: brightness(0.65) saturate(0.75);
}
.section-col:hover .card--back-1 {
  transform: rotate(-8deg) translateX(-5px) translateY(4px);
  border-color: color-mix(in srgb, var(--accent) 22%, transparent);
  box-shadow: 0 10px 36px rgba(0,0,0,0.5);
  filter: brightness(0.8) saturate(0.85);
}
.section-col:hover .card--front {
  transform: rotate(5deg) translateY(-10px);
  border-color: var(--accent);
  box-shadow: 0 20px 56px color-mix(in srgb, var(--accent) 30%, transparent);
  filter: brightness(1) saturate(1);
}
.section-col:hover .card--front::before { opacity: 1; }
.section-col:hover .card-img { transform: scale(1.04); }

/* ── Labels ── */
.section-label-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}
.section-overline {
  font-size: 0.6rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  opacity: 0.65;
  transition: opacity 0.3s;
}
.section-col:hover .section-overline { opacity: 1; }

.section-name {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #fff;
  margin: 0;
}

.section-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(5px);
  transition: opacity 0.3s, transform 0.3s;
  margin-top: 0.1rem;
}
.section-col:hover .section-arrow {
  opacity: 1;
  transform: translateY(0);
}

/* ── Animation ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .sections-row {
    flex-direction: column;
    align-items: center;
    gap: 5rem;
    padding: 0 2rem;
  }
  .design-main { padding-top: 8rem; }
}
</style>