<template>
  <!-- Navbar dinamis menyesuaikan tema -->
  <nav
    :class="[
      'w-full shadow-md sticky top-0 z-50 transition-colors duration-500',
      themeConfig[currentTheme].bg,
    ]"
  >
    <!-- Ornamen Geometris / Bubble -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-xl"
      ></div>
      <div class="absolute bottom-0 left-20 w-16 h-16 bg-white/10 rounded-full blur-md"></div>
    </div>

    <div class="max-w-285 w-full mx-auto px-4 py-3 flex items-center justify-between relative z-10">
      <router-link
        to="/"
        @click="scrollToTop"
        class="flex items-center gap-3 hover:opacity-90 transition cursor-pointer"
      >
        <div
          class="w-10.5 h-10.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm"
        >
          <img src="/img/logorusa1.gif" alt="Logo RUSA" class="w-full h-full object-cover" />
        </div>
        <span class="text-white font-black text-[22px] tracking-widest drop-shadow-sm">RUSA</span>
      </router-link>

      <div class="hidden md:flex items-center space-x-7 text-white/90 font-medium text-[15px]">
        <router-link
          to="/"
          class="flex items-center gap-1.5 hover:text-white hover:scale-105 transition-all"
        >
          <i class="fas fa-home text-sm"></i> Home
        </router-link>
        <router-link
          to="/about"
          class="flex items-center gap-1.5 hover:text-white hover:scale-105 transition-all"
        >
          <i class="fas fa-info-circle text-sm"></i> Tentang
        </router-link>
        <router-link
          to="/artikel"
          class="flex items-center gap-1.5 hover:text-white hover:scale-105 transition-all"
        >
          <i class="fas fa-newspaper text-sm"></i> Artikel
        </router-link>
        <router-link
          to="/contact"
          class="flex items-center gap-1.5 hover:text-white hover:scale-105 transition-all"
        >
          <i class="fas fa-address-book text-sm"></i> Kontak
        </router-link>
      </div>

      <div class="flex items-center gap-5">
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full font-bold text-[14px] transition-all backdrop-blur-sm"
        >
          <i class="fas fa-sign-in-alt text-sm"></i> Login
        </router-link>

        <router-link
          v-else
          :to="dashboardRoute"
          class="flex items-center gap-2 bg-white text-gray-800 px-4 py-1.5 rounded-full font-bold text-[14px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <i class="fas fa-tachometer-alt text-sm" :class="themeConfig[currentTheme].text"></i>
          Dashboard
        </router-link>

        <button
          @click="toggleMobileMenu"
          class="md:hidden text-white hover:text-gray-200 focus:outline-none transition-transform duration-300"
        >
          <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        :class="[
          'md:hidden absolute left-0 w-full top-[100%] border-t border-white/20 shadow-2xl z-[999] flex flex-col',
          themeConfig[currentTheme].bg,
        ]"
      >
        <!-- Isi Menu Mobile Lengkap -->
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="px-6 py-4 text-white font-medium hover:bg-white/10 border-b border-white/10 flex items-center gap-3 transition-colors"
        >
          <i class="fas fa-home w-5 text-center"></i> Home
        </router-link>

        <router-link
          to="/about"
          @click="closeMobileMenu"
          class="px-6 py-4 text-white font-medium hover:bg-white/10 border-b border-white/10 flex items-center gap-3 transition-colors"
        >
          <i class="fas fa-info-circle w-5 text-center"></i> Tentang
        </router-link>

        <router-link
          to="/artikel"
          @click="closeMobileMenu"
          class="px-6 py-4 text-white font-medium hover:bg-white/10 border-b border-white/10 flex items-center gap-3 transition-colors"
        >
          <i class="fas fa-newspaper w-5 text-center"></i> Artikel
        </router-link>

        <router-link
          to="/contact"
          @click="closeMobileMenu"
          class="px-6 py-4 text-white font-medium hover:bg-white/10 border-b border-white/10 flex items-center gap-3 transition-colors"
        >
          <i class="fas fa-address-book w-5 text-center"></i> Kontak
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isLoggedIn = ref(false)
const dashboardRoute = ref('/user-dashboard')
const isMobileMenuOpen = ref(false)

// SISTEM TEMA DINAMIS
const currentTheme = ref('merah')

// Konfigurasi Warna Tema
const themeConfig = {
  merah: { bg: 'bg-[#ea7379]', text: 'text-[#ea7379]' },
  biru: { bg: 'bg-blue-500', text: 'text-blue-500' },
  hijau: { bg: 'bg-emerald-500', text: 'text-emerald-500' },
}

const checkTheme = () => {
  currentTheme.value = localStorage.getItem('app_theme') || 'merah'
}

const toggleMobileMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value)
const closeMobileMenu = () => (isMobileMenuOpen.value = false)
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  checkTheme()
  // Mendengarkan teriakan perubahan tema dari SuperAdmin
  window.addEventListener('theme-changed', checkTheme)

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) {
    isLoggedIn.value = true
    if (currentUser.role === 'superadmin') dashboardRoute.value = '/dashboard-superadmin'
    else if (currentUser.role === 'admin') dashboardRoute.value = '/dashboard-admin'
  }
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', checkTheme)
})
</script>
