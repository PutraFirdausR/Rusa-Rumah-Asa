<template>
  <div
    class="min-h-[calc(100vh-65px)] flex flex-col font-sans border-t border-gray-100 overflow-x-hidden bg-gray-50/30"
  >
    <main class="flex-1 max-w-285 w-full mx-auto px-4 py-6 flex flex-col relative z-10">
      <h1
        class="shrink-0 text-[28px] md:text-[32px] font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-3"
      >
        <i class="far fa-envelope text-3xl" :class="themeConfig[currentTheme].text"></i>
        Hubungi Kami
      </h1>

      <div
        class="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row overflow-hidden"
      >
        <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-gray-600 font-semibold text-sm mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all focus:ring-2"
                  :class="themeConfig[currentTheme].ring"
                />
              </div>
              <div>
                <label class="block text-gray-600 font-semibold text-sm mb-1.5">Alamat Email</label>
                <input
                  type="email"
                  placeholder="email@anda.com"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all focus:ring-2"
                  :class="themeConfig[currentTheme].ring"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-600 font-semibold text-sm mb-1.5">Subjek</label>
              <input
                type="text"
                placeholder="Perihal pesan"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all focus:ring-2"
                :class="themeConfig[currentTheme].ring"
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-600 font-semibold text-sm mb-1.5">Pesan</label>
              <textarea
                rows="4"
                placeholder="Tuliskan pesan Anda di sini..."
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:bg-white transition-all focus:ring-2"
                :class="themeConfig[currentTheme].ring"
              ></textarea>
            </div>

            <button
              type="submit"
              :class="[
                'w-full text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5',
                themeConfig[currentTheme].btn,
              ]"
            >
              <i class="fas fa-paper-plane mr-2"></i> Kirim Pesan Sekarang
            </button>
          </form>
        </div>

        <div class="w-full md:w-1/2 bg-gray-200 relative min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.561520817491!2d110.4080523!3d-7.0606941999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7089425c802481%3A0x745e54e4b1f6f7b1!2sPAUD%20RUSA%20DAN%20BIMBEL%20BANYUMANIK%20SEMARANG!5e0!3m2!1sen!2sid!4v1776395006198!5m2!1sen!2sid"
            class="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
            allowfullscreen=""
            loading="lazy"
          >
          </iframe>
        </div>
      </div>
    </main>

    <footer
      :class="[
        'shrink-0 pt-12 pb-6 w-full relative transition-colors duration-500 mt-8',
        themeConfig[currentTheme].bg,
      ]"
    >
      <div class="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[99%]">
        <svg
          class="relative block w-full h-10"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.32,201.39,111.4Z"
            :class="themeConfig[currentTheme].fill"
          ></path>
        </svg>
      </div>

      <div class="max-w-285 mx-auto px-4 flex flex-wrap justify-center gap-4 relative z-10">
        <a
          href="#"
          class="flex flex-col items-center justify-center w-24 h-20 bg-white/10 hover:bg-white text-white hover:text-pink-500 rounded-2xl transition-all duration-300 backdrop-blur-sm group border border-white/20"
        >
          <i class="fab fa-instagram text-3xl mb-1 group-hover:scale-110 transition-transform"></i>
          <span class="text-[12px] font-bold">Instagram</span>
        </a>
        <a
          href="#"
          class="flex flex-col items-center justify-center w-24 h-20 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-2xl transition-all duration-300 backdrop-blur-sm group border border-white/20"
        >
          <i class="fab fa-facebook-f text-3xl mb-1 group-hover:scale-110 transition-transform"></i>
          <span class="text-[12px] font-bold">Facebook</span>
        </a>
        <a
          href="#"
          class="flex flex-col items-center justify-center w-24 h-20 bg-white/10 hover:bg-white text-white hover:text-green-500 rounded-2xl transition-all duration-300 backdrop-blur-sm group border border-white/20"
        >
          <i class="fab fa-whatsapp text-3xl mb-1 group-hover:scale-110 transition-transform"></i>
          <span class="text-[12px] font-bold">Whatsapp</span>
        </a>
      </div>

      <p class="text-center text-white/70 text-xs mt-6 font-medium">
        © 2026 Rumah Asa (RUSA). Seluruh hak cipta dilindungi.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const submitForm = () => {
  alert('Pesan berhasil dikirim!')
}

// SISTEM TEMA DINAMIS
const currentTheme = ref('merah')

const themeConfig = {
  merah: {
    bg: 'bg-[#ea7379]',
    text: 'text-[#ea7379]',
    btn: 'bg-[#ea7379] hover:bg-[#d9656b]',
    ring: 'focus:ring-[#ea7379]/30 focus:border-[#ea7379]',
    fill: 'fill-[#ea7379]',
  },
  biru: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    btn: 'bg-blue-500 hover:bg-blue-600',
    ring: 'focus:ring-blue-500/30 focus:border-blue-500',
    fill: 'fill-blue-500',
  },
  hijau: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-500',
    btn: 'bg-emerald-500 hover:bg-emerald-600',
    ring: 'focus:ring-emerald-500/30 focus:border-emerald-500',
    fill: 'fill-emerald-500',
  },
}

const checkTheme = () => {
  currentTheme.value = localStorage.getItem('app_theme') || 'merah'
}

onMounted(() => {
  checkTheme()
  window.addEventListener('theme-changed', checkTheme)
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', checkTheme)
})
</script>
