<template>
  <div>
    <Home class="z-10"/>
    <AboutMe />
    <Skills />
    <Design />
    <Projects />
    <Contact />
    <footer class="pixel-footer">
      <p>Thanks for visiting! &copy; 2025 Muhd Idlan</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar   from '../components/Navbar.vue'
import Home     from '../components/MainpageCom/Home.vue'
import AboutMe  from '../components/MainpageCom/AboutMe.vue'
import Skills   from '../components/MainpageCom/Skills.vue'
import Design   from '../components/MainpageCom/Design.vue'
import Projects from '../components/MainpageCom/Projects.vue'
import Contact  from '../components/MainpageCom/Contact.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  setTimeout(() => {
    // Check for section query parameter (from navbar navigation from other pages)
    const section = route.query.section as string
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else if (route.hash) {
      const element = document.querySelector(route.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, 100)
})

</script>