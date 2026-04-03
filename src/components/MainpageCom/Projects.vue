<template>
  <section class="projects reveal" id="projects" v-reveal>
    <div class="projects-container">
      <div class="slider-wrapper" ref="wrapperEl">
        <h2 class="heading"><span>Projects</span></h2>
        <button class="slider-btn prev-btn" @click="prevSlide"><i class="fa-solid fa-angle-left"></i></button>
        <button class="slider-btn next-btn" @click="nextSlide"><i class="fa-solid fa-angle-right"></i></button>
        <div class="project-slider" ref="sliderEl">
          <div v-for="p in projects" :key="p.title" class="project-box">
            <div class="project-img"><img :src="p.img" :alt="p.title" /></div>
            <div class="project-info">
              <h3>{{ p.title }}</h3>
              <p>{{ p.desc }}</p>
              <a :href="p.link" class="btn" target="_blank">Check Project</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Hammer from 'hammerjs' // <-- Install this: npm install hammerjs

import PejuangSlime from '@/assets/Images/PejuangSlime.png'
import Farming      from '@/assets/Images/Farming.png'
import Nameless     from '@/assets/Images/Nameless.png'
import VirtualTour  from '@/assets/Images/VirtualTour.png'
import FKPark       from '@/assets/Images/FKPark.png'
import UMPSA        from '@/assets/Images/UMPSA.png'
import Mom          from '@/assets/Images/Mom.png'

interface Project { title: string; img: string; desc: string; link: string }

const projects: Project[] = [
  { title: 'Pejuang Slime',             img: PejuangSlime, desc: '2D action-adventure platformer deeply rooted in Malay folklore and culture',           link: 'https://drive.google.com/drive/folders/1-bpVyODZ-fp6jKvbHKImex7EQXXJparG?usp=sharing' },
  { title: 'Farming Training System',   img: Farming,      desc: 'Immersive VR application designed to revolutionize agricultural education',            link: 'https://drive.google.com/drive/folders/1QqpKveb8wNkz2kLTfN4hgcMqI0RaRkPR?usp=sharing' },
  { title: 'Nameless Temple',           img: Nameless,     desc: '3D third-person survival escape game — an archaeologist trapped in ancient ruins',     link: 'https://drive.google.com/drive/folders/1Sfrz1pv4NDwiD_aVzcqjBDBKijcP5Smm?usp=sharing' },
  { title: 'Virtual Tour Of Pekan',     img: VirtualTour,  desc: 'Website showing interesting locations at Pekan Pahang with 360° view',                 link: 'https://virtualtourofpekan.netlify.app/' },
  { title: 'FK Park Management System', img: FKPark,       desc: 'Parking system website for Faculty Computer — admin, staff, and student roles',         link: 'https://drive.google.com/drive/folders/1vIBV2sBTFoYhrN-x3GKumZ8wHV3hU4VQ?usp=drive_link' },
  { title: 'Pano2VR UMPSA',            img: UMPSA,        desc: 'Panorama view of Universiti Malaysia Pahang Al-Sultan Abdullah',                        link: 'https://drive.google.com/drive/folders/1odfQe7sbWcj6A0K8KvWztX76LwDDycnn?usp=sharing' },
  { title: 'Memoir of Malaya',          img: Mom,          desc: "3D interactive educational game exploring Malaysia's history through gameplay quiz",     link: 'https://drive.google.com/drive/folders/1hKPjVA_ZHx6FZ8nKK518v8tq2f4ylOf9?usp=drive_link' },
]

const sliderEl  = ref<HTMLElement | null>(null)
const wrapperEl = ref<HTMLElement | null>(null)
let isTransitioning = false
let hammerManager: HammerManager | null = null

function getCardStep(): number {
  const card = sliderEl.value?.querySelector<HTMLElement>('.project-box')
  return card ? card.offsetWidth + 20 : 0
}

function getCenterPosition(): number {
  const card = sliderEl.value?.querySelector<HTMLElement>('.project-box')
  if (!card || !wrapperEl.value) return 0
  const cardWidth    = card.offsetWidth
  const gap          = 20
  const wrapperWidth = wrapperEl.value.offsetWidth
  
  // Adjusted visibleCards for mobile centering (80% width)
  const visibleCards = window.innerWidth <= 768 ? 1 : 3
  
  const totalWidth   = cardWidth * visibleCards + gap * (visibleCards - 1)
  
  // Corrected offset for the cloned card prepended during initialization
  return -(cardWidth + gap) + (wrapperWidth - totalWidth) / 2
}

function alignSlider(): void {
  if (!sliderEl.value) return
  sliderEl.value.style.transition = 'none'
  sliderEl.value.style.transform  = `translateX(${getCenterPosition()}px)`
}

function initSlider(): void {
  if (!sliderEl.value?.lastElementChild) return
  sliderEl.value.prepend(sliderEl.value.lastElementChild)
  alignSlider()
  
  // Set up Hammer.js for swiping
  if (sliderEl.value && window.innerWidth <= 768) {
      hammerManager = new Hammer(sliderEl.value);
      // Ensure horizontal panning is prioritized
      hammerManager.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
      
      hammerManager.on('panend', (ev) => {
          if (ev.direction === Hammer.DIRECTION_LEFT) {
              nextSlide();
          } else if (ev.direction === Hammer.DIRECTION_RIGHT) {
              prevSlide();
          }
      });
  }
}

function nextSlide(): void {
  if (isTransitioning || !sliderEl.value) return
  isTransitioning = true
  
  // Get current X position safely
  const transform = window.getComputedStyle(sliderEl.value).transform;
  const matrix = transform && transform !== 'none' ? new DOMMatrixReadOnly(transform) : { m41: 0 };
  
  sliderEl.value.style.transition = 'transform 0.5s ease'
  sliderEl.value.style.transform  = `translateX(${matrix.m41 - getCardStep()}px)`
  setTimeout(() => {
    sliderEl.value!.appendChild(sliderEl.value!.firstElementChild!)
    alignSlider()
    isTransitioning = false
  }, 500)
}

function prevSlide(): void {
  if (isTransitioning || !sliderEl.value) return
  isTransitioning = true
  
  // Get current X position safely
  const transform = window.getComputedStyle(sliderEl.value).transform;
  const matrix = transform && transform !== 'none' ? new DOMMatrixReadOnly(transform) : { m41: 0 };
  
  sliderEl.value.style.transition = 'transform 0.5s ease'
  sliderEl.value.style.transform  = `translateX(${matrix.m41 + getCardStep()}px)`
  setTimeout(() => {
    sliderEl.value!.prepend(sliderEl.value!.lastElementChild!)
    alignSlider()
    isTransitioning = false
  }, 500)
}

onMounted(() => {
  initSlider()
  window.addEventListener('resize', alignSlider)
})

onUnmounted(() => {
  if (hammerManager) {
      hammerManager.destroy();
  }
  window.removeEventListener('resize', alignSlider)
})
</script>