<template>
  <div>
    <Navbar />
    <div class="cursor" ref="cursorEl"></div>
    <div class="cursor2" ref="cursor2El"></div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

const cursorEl  = ref<HTMLElement | null>(null)
const cursor2El = ref<HTMLElement | null>(null)

// Check if device is mobile/touch
function isMobileOrTouchDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.matchMedia('(hover: none) and (pointer: coarse)').matches)
  )
}

function onMove(e: MouseEvent) {
  if (cursorEl.value)  { cursorEl.value.style.left = e.clientX+'px'; cursorEl.value.style.top = e.clientY+'px' }
  if (cursor2El.value) { cursor2El.value.style.left = e.clientX+'px'; cursor2El.value.style.top = e.clientY+'px' }
}

onMounted(() => {
  // Only add cursor tracking on desktop devices
  if (!isMobileOrTouchDevice()) {
    window.addEventListener('mousemove', onMove)
  }
})

onUnmounted(() => window.removeEventListener('mousemove', onMove))

</script>