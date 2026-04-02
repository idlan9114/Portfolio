<template>
  <section class="contact" id="contact" v-reveal>
    <h2>Contact Me</h2>
    <div class="contact-container">
      <div class="contact-left">
        <form @submit.prevent="send">
          <div class="input-box">
            <input v-model="f.name"    type="text"  placeholder="Full Name" required />
            <input v-model="f.email"   type="email" placeholder="Email Address" required />
          </div>
          <div class="input-box">
            <input v-model="f.phone"   type="tel"   placeholder="Mobile Number" />
            <input v-model="f.subject" type="text"  placeholder="Email Subject" />
          </div>
          <textarea v-model="f.msg" rows="10" placeholder="Your Message" required></textarea>
          <button type="submit" class="btn">{{ sent ? '✓ Message Sent!' : 'Send Message' }}</button>
        </form>
      </div>
      <div class="contact-right">
        <h3>Let's Connect</h3>
        <p>Actively seeking internship opportunities to learn, contribute and grow professionally in Graphics and Multimedia Development.</p>
        <div class="contact-info">
          <p><i class="fa-solid fa-envelope"></i> idlan9114@gmail.com</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const sent = ref(false)
const f = reactive({ name: '', email: '', phone: '', subject: '', msg: '' })

function send() {
  console.log('Form submitted:', { ...f })
  sent.value = true
  setTimeout(() => {
    sent.value = false
    Object.assign(f, { name: '', email: '', phone: '', subject: '', msg: '' })
  }, 3000)
}
</script>