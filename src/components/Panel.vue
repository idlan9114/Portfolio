<template>
  <transition name="slide">
    <div
      v-if="isOpen"
      class="panel-overlay"
      @click="closePanel"
    >
      <!-- PANEL -->
      <div class="panel" @click.stop>
        
        <!-- CLOSE BUTTON -->
        <button @click="closePanel" class="close-btn z-10">
          <span></span>
          <span></span>
        </button>

        <!-- NAV -->
        <div class="panel-nav">
          <a
            v-for="l in links"
            :key="l.id"
            :href="l.href"
            @click.prevent="handleLinkClick(l.id)"
            :class="{ active: active === l.id }"
          >
            <span class="link-bg" v-if="active === l.id"></span>
            <span class="link-text">{{ l.label }}</span>
          </a>
        </div>
        
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const route = useRoute()
const active = ref('home')

const links = [
  { id: 'home',     href: '#home',     label: 'Home' },
  { id: 'about',    href: '#about',    label: 'About Me' },
  { id: 'skills',   href: '#skills',   label: 'Skills' },
  { id: 'design',   href: '#design',   label: 'Design' },
  { id: 'projects', href: '#projects', label: 'Projects' },
  { id: 'contact',  href: '#contact',  label: 'Contact' },
]

function closePanel() {
  emit('close')
}

function handleLinkClick(linkId: string) {
  active.value = linkId
  closePanel()
  
  if (route.path === '/' || route.path === '/MainPage') {
    // Already on MainPage, just scroll to section
    setTimeout(() => scrollToSection(linkId), 100)
  } else {
    // On a different page, navigate to MainPage with section hash
    router.push(`/?section=${linkId}`)
  }
}

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

watch(() => props.isOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : ''
})
</script>

<style scoped>

/* ===== OVERLAY ===== */
.panel-overlay {
  position: fixed !important;
  inset: 0 !important;
  background: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(4px);
  z-index: 9999 !important;
}

/* ===== PANEL ===== */
.panel {
  position: fixed !important;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: #000 !important;
  border-left: 1px solid rgba(29, 185, 190, 0.4);
  display: flex !important;
  flex-direction: column !important;
  z-index: 10000;
}

/* ===== CLOSE BUTTON ===== */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: none;
}

.close-btn span {
  position: absolute;
  width: 100%;
  height: 2px;
  background: white;
  top: 50%;
  left: 0;
  transform-origin: center;
  transition: 0.3s;
}

.close-btn span:first-child {
  transform: rotate(45deg);
}

.close-btn span:last-child {
  transform: rotate(-45deg);
}

.close-btn:hover span {
  background: #1db9be;
}

/* ===== NAV (FORCE OVERRIDE GLOBAL NAV) ===== */
.panel-nav {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: stretch !important;
  height: 100%;
  text-align: center;

  /* RESET GLOBAL nav DAMAGE */
  margin: 0 !important;
  padding: 0 !important;
}

/* ===== LINKS ===== */
.panel-nav a {
  position: relative;
  display: block !important;
  padding: 30px 0;
  font-size: 14px;
  color: white !important;
  text-decoration: none !important;

  border-bottom: 1px solid rgba(29, 185, 190, 0.2);

  /* RESET GLOBAL nav a DAMAGE */
  margin: 0 !important;
  border-left: none !important;
}

/* ===== HOVER ===== */
.panel-nav a:hover {
  color: #1db9be !important;
}

/* ===== ACTIVE ===== */
.panel-nav a.active {
  color: #1db9be !important;
}

/* BACKGROUND HIGHLIGHT */
.link-bg {
  position: absolute;
  inset: 0;
  background: rgba(29, 185, 190, 0.1);
  z-index: 0;
}

/* TEXT */
.link-text {
  position: relative;
  z-index: 1;

  /* FIX global span color */
  color: inherit !important;
}

/* ===== BOTTOM LINE ===== */
.panel-bottom-line {
  height: 2px;
  width: 100%;
  background: rgba(29, 185, 190, 0.6);
}

/* ===== ANIMATION ===== */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
}

.slide-enter-from .panel {
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
}

.slide-leave-to .panel {
  transform: translateX(100%);
}

</style>
