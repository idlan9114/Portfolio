<template>
  <header :class="['navbar', { scrolled: isScrolled }]">
    <a href="#home" class="logo" @click.prevent="navigateToHome">
      <img src="@/assets/Images/logo.PNG" style="height:50px" alt="Logo" />
    </a>
    <nav class="ml-auto">
      <a
        v-for="l in links"
        :key="l.id"
        :href="l.href"
        :class="{ active: active === l.id }"
        @click.prevent="navigateToSection(l.id)"
      >{{ l.label }}</a>
    </nav>
    <button class="hamburger-btn" :class="{ active: isPanelOpen }" @click="togglePanel">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>
  <Panel :isOpen="isPanelOpen" @close="isPanelOpen = false" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Panel from './Panel.vue'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const active = ref('home')
const isPanelOpen = ref(false)

const links = [
  { id: 'home',     href: '#home',     label: 'Home' },
  { id: 'about',    href: '#about',    label: 'About Me' },
  { id: 'skills',   href: '#skills',   label: 'Skills' },
  { id: 'design',   href: '#design',   label: 'Design' },
  { id: 'projects', href: '#projects', label: 'Projects' },
  { id: 'contact',  href: '#contact',  label: 'Contact' },
]

function navigateToSection(sectionId: string) {
  if (route.path === '/' || route.path === '/MainPage') {
    // Already on MainPage, just scroll to section
    scrollToSection(sectionId)
  } else {
    // On a different page (like DesignPage), navigate to MainPage with section hash
    router.push(`/?section=${sectionId}`)
  }
}

function navigateToHome() {
  if (route.path === '/' || route.path === '/MainPage') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/')
  }
}

function scrollToSection(sectionId: string) {
  active.value = sectionId
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function onScroll() {
  isScrolled.value = window.scrollY > 50
  links.forEach(l => {
    const el = document.getElementById(l.id)
    if (el && window.scrollY >= el.offsetTop - 200) active.value = l.id
  })
}

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value
}

onMounted(() => {
  // Check if there's a section parameter in query
  const section = route.query.section as string
  if (section) {
    setTimeout(() => scrollToSection(section), 100)
  }
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* Hamburger button - Mobile only */
.hamburger-btn {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 850;
  transition: all 0.3s ease;
}

.hamburger-btn span {
  width: 28px;
  height: 3px;
  background-color: #1db9be;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translateY(12px);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translateY(-12px);
}

/* Show hamburger button on mobile - match existing mobile breakpoint */
@media (max-width: 995px) {
  .hamburger-btn {
    display: flex;
  }

  nav {
    display: none !important;
  }
}
</style>