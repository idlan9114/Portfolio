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

function onMove(e: MouseEvent) {
  if (cursorEl.value)  { cursorEl.value.style.left = e.clientX+'px'; cursorEl.value.style.top = e.clientY+'px' }
  if (cursor2El.value) { cursor2El.value.style.left = e.clientX+'px'; cursor2El.value.style.top = e.clientY+'px' }
}
onMounted(()  => window.addEventListener('mousemove', onMove))
onUnmounted(() => window.removeEventListener('mousemove', onMove))

</script>