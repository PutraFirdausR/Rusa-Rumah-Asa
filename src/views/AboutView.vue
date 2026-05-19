<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 1. Import gambar secara langsung
import img1 from '@/assets/img/rusa1.jpg'
import img2 from '@/assets/img/rusa2.jpg'
import img3 from '@/assets/img/rusa3.jpg'
// Catatan: Jika '@' tidak jalan, gunakan relative path seperti '../assets/img/rusa1.jpg'

const currentSlide = ref(0)

// 2. Masukkan variabel hasil import ke dalam array
const images = [img1, img2, img3]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + images.length) % images.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

let slideInterval = null

const startAutoSlide = () => {
  slideInterval = setInterval(nextSlide, 2000)
}

const stopAutoSlide = () => {
  clearInterval(slideInterval)
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<template>
  <div
    class="h-[calc(100vh-65px)] bg-[#fcfcfc] relative overflow-hidden flex items-center justify-center box-border"
  >
    <main
      class="max-w-285 w-full mx-auto px-4 md:px-6 py-2 md:py-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 max-h-full"
    >
      <div class="w-full md:w-1/2 flex justify-center md:justify-start">
        <div
          class="relative w-full max-w-137.5 rounded-xl overflow-hidden shadow-lg group bg-gray-100 shrink-0"
          @mouseenter="stopAutoSlide"
          @mouseleave="startAutoSlide"
        >
          <transition name="fade" mode="out-in">
            <img
              :key="currentSlide"
              :src="images[currentSlide]"
              alt="Kegiatan RUSA"
              class="w-full h-auto object-cover aspect-4/3 max-h-[30vh] md:max-h-[50vh]"
            />
          </transition>

          <button
            @click="prevSlide"
            class="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer z-10 p-2"
          >
            <i class="fas fa-chevron-left text-2xl md:text-3xl drop-shadow-md"></i>
          </button>

          <button
            @click="nextSlide"
            class="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer z-10 p-2"
          >
            <i class="fas fa-chevron-right text-2xl md:text-3xl drop-shadow-md"></i>
          </button>

          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <span
              v-for="(img, index) in images"
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-6 md:w-8 h-1 rounded transition-all cursor-pointer',
                currentSlide === index ? 'bg-white shadow-sm' : 'bg-white/50 hover:bg-white/70',
              ]"
            ></span>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2 max-w-125">
        <h1
          class="text-[28px] md:text-[44px] font-semibold text-[#1e293b] leading-tight mb-2 md:mb-6 text-center md:text-left"
        >
          Tentang
        </h1>

        <div
          class="space-y-2 md:space-y-4 text-[14px] md:text-[16px] text-[#64748b] leading-normal md:leading-[1.8] text-justify"
        >
          <p>
            RUSA atau Rumah Asa terletak di Jl. Berdikari Kelurahan Srondol Kulon Banyumanik
            Semarang. RUSA berada di bawah naungan Yayasan Rumah Asa Indonesia yang berdiri pada
            tanggal 7 Juli 2017.
          </p>
          <p>
            Kehadiran RUSA di tengah masyarakat memberikan fasilitas kepada generasi tunas bangsa
            dalam bidang pendidikan, yaitu PAUD dalam Kelompok Bermain untuk anak usia 2-4 tahun dan
            Kelompok Belajar untuk SD dan SMP.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
