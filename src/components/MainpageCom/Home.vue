<template>
  <section class="home reveal" id="home" v-reveal>
    <div class="home-img">
      <img src="@/assets/Images/model.png" alt="Profile Model">
    </div>
    <div class="home-content">
      <h1>Hi, It's <span>MUHD IDLAN</span></h1>
      <h3 class="typing-text">I'm a <span ref="typingEl"></span></h3>
      <p>3rd year student in Bachelor of Computer Science (Graphics & Multimedia Technology) with Honours. Passionate about Game Development, VR and Web Development</p>
      <div class="social-icons">
        <a href="https://www.linkedin.com/in/muhammad-idlan-bin-idris-47ba40264/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://github.com/idlan9114" target="_blank"><i class="fa-brands fa-github"></i></a>
        <a href="https://x.com/idlan9114" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="https://www.instagram.com/iidlann._.n?igsh=bHd3eGtycm56bnB2" target="_blank"><i class="fa-brands fa-instagram"></i></a>
      </div>
      <div class="btn-box">
        <a href="#about" class="btn">More About Me</a>
        <a href="MuhammadIdlanBinIdris_Resume.pdf" download class="btn">Download CV</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const typingEl = ref<HTMLElement | null>(null)

const textArray: string[] = ['UMPSA Student', 'Game Developer', 'Web Developer', 'Web Designer', 'Illustrator']
const typingDelay  = 100
const erasingDelay = 50
const newTextDelay = 2000

let textIndex: number = 0
let charIndex: number = 0
let timer: ReturnType<typeof setTimeout>

function type() {
  if (!typingEl.value) return
  const currentText = textArray[textIndex] ?? ''   // ← fixes the TS error
  if (charIndex < currentText.length) {
    typingEl.value.textContent += currentText.charAt(charIndex++)
    timer = setTimeout(type, typingDelay)
  } else {
    timer = setTimeout(erase, newTextDelay)
  }
}

function erase() {
  if (!typingEl.value) return
  const currentText = textArray[textIndex] ?? ''   // ← fixes the TS error
  if (charIndex > 0) {
    typingEl.value.textContent = currentText.substring(0, --charIndex)
    timer = setTimeout(erase, erasingDelay)
  } else {
    textIndex = (textIndex + 1) % textArray.length
    timer = setTimeout(type, typingDelay + 1100)
  }
}

onMounted(() => { timer = setTimeout(type, newTextDelay + 250) })
onUnmounted(() => clearTimeout(timer))
</script>