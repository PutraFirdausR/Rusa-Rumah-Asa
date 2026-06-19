<script setup>
import Navbar from './components/Navbar.vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

const route = useRoute()
const isMaintenance = ref(false)

onMounted(() => {
  // Menarik tema dari MySQL menggunakan API get_theme.php
  fetch('http://localhost/rusa-backend/get_theme.php')
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        document.documentElement.setAttribute('data-theme', result.tema)
        // Menyimpan di localStorage sebagai cadangan sekunder
        localStorage.setItem('app_theme', result.tema)
      }
    })

  // Logika maintenance bawaan kamu biarkan saja seperti semula
  isMaintenance.value = localStorage.getItem('maintenance_mode') === 'true'

  window.addEventListener('maintenance-changed', () => {
    isMaintenance.value = localStorage.getItem('maintenance_mode') === 'true'
  })
})

// Mencegah halaman admin terblokir oleh mode maintenance
const isExemptFromMaintenance = computed(() => {
  const path = route.path.toLowerCase()
  // Pengecualian path: memastikan admin tetap bisa login dan masuk dashboard
  return path.includes('admin') || path.includes('dashboard') || path.includes('login')
})
</script>

<template>
  <div
    v-if="isMaintenance && !isExemptFromMaintenance"
    class="fixed inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center p-6 text-center"
  >
    <div class="bg-white p-10 rounded-3xl shadow-xl max-w-lg border-t-4 border-orange-500 w-full">
      <div
        class="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm border border-orange-100"
      >
        <i class="fas fa-tools animate-bounce"></i>
      </div>

      <h1 class="text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">Sedang Perbaikan</h1>
      <p class="text-gray-500 leading-relaxed mb-8 text-sm">
        Mohon maaf, website saat ini sedang dalam masa perbaikan dan pengembangan sistem untuk
        sementara waktu.
      </p>

      <div
        class="bg-orange-50/80 text-orange-800 p-4 rounded-xl text-sm border border-orange-200/60 flex items-start text-left gap-3"
      >
        <i class="fas fa-info-circle text-lg mt-0.5"></i>
        <p>
          <strong>Perhatian:</strong> Website ini tidak untuk keperluan publik. Situs ini dibangun
          secara khusus hanya sebagai pemenuhan <strong>Tugas Tengah Semester Semester 2</strong>.
        </p>
      </div>
    </div>
  </div>

  <template v-else>
    <Navbar v-if="!$route.meta.hideNavbar" />
    <RouterView />
  </template>
</template>
