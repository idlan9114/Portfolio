<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  src: string
  name: string
  accent?: string
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(() => props.visible, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lb">
      <div
        v-if="visible"
        class="lb-backdrop"
        @click.self="emit('close')"
      >
        <div class="lb-box" :style="{ '--accent': accent || '#1db9be' }">
          <!-- Close button -->
          <button class="lb-close" @click="emit('close')" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Image -->
          <img :src="src" :alt="name" class="lb-img" />

          <!-- Caption -->
          <div class="lb-caption">{{ name }}</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop */
.lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

/* Box */
.lb-box {
  position: relative;
  max-width: min(90vw, 860px);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 14px;
  overflow: hidden;
  border: 1.5px solid var(--accent);
  box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 25%, transparent);
}

/* Image */
.lb-img {
  display: block;
  max-width: 100%;
  max-height: calc(90vh - 3rem);
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Caption */
.lb-caption {
  width: 100%;
  padding: 0.65rem 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: var(--accent);
  font-size: 0.8rem;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.04em;
}

/* Close btn */
.lb-close {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  z-index: 10;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: background 0.2s, border-color 0.2s;
}
.lb-close:hover {
  background: rgba(255,255,255,0.12);
  border-color: var(--accent);
  color: var(--accent);
}

/* Transition */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.25s ease;
}
.lb-enter-active .lb-box,
.lb-leave-active .lb-box {
  transition: transform 0.25s cubic-bezier(.22,.68,0,1.2), opacity 0.25s ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
.lb-enter-from .lb-box {
  transform: scale(0.9);
  opacity: 0;
}
.lb-leave-to .lb-box {
  transform: scale(0.95);
  opacity: 0;
}
</style>