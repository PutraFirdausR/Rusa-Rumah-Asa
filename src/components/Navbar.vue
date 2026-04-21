<template>
  <nav class="bg-[#ea7379] w-full shadow-sm sticky top-0 z-50">
    <div class="max-w-285 w-full mx-auto px-4 py-3 flex items-center justify-between">
      <router-link
        to="/"
        @click="scrollToTop"
        class="flex items-center gap-3 hover:opacity-90 transition cursor-pointer"
      >
        <div
          class="w-10.5 h-10.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm"
        >
          <img
            src="/src/assets/img/logorusa1.gif"
            alt="Logo RUSA"
            class="w-full h-full object-cover"
          />
        </div>
        <span class="text-white font-bold text-[22px] tracking-wide">RUSA</span>
      </router-link>
      <div class="hidden md:flex items-center space-x-7 text-white font-medium text-[15px]">
        <router-link to="/" class="flex items-center gap-1.5 hover:text-gray-200 transition">
          <i class="fas fa-home text-sm"></i> Home
        </router-link>
        <router-link to="/about" class="flex items-center gap-1.5 hover:text-gray-200 transition">
          <i class="fas fa-info-circle text-sm"></i> Tentang
        </router-link>
        <router-link to="/artikel" class="flex items-center gap-1.5 hover:text-gray-200 transition">
          <i class="fas fa-newspaper text-sm"></i> Artikel
        </router-link>
        <router-link to="/contact" class="flex items-center gap-1.5 hover:text-gray-200 transition">
          <i class="fas fa-address-book text-sm"></i> Kontak
        </router-link>
      </div>

      <div class="flex items-center gap-5">
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="flex items-center gap-1.5 text-white font-medium text-[15px] hover:text-gray-200 transition"
        >
          <i class="fas fa-sign-in-alt text-sm"></i> Login
        </router-link>

        <router-link
          v-else
          :to="dashboardRoute"
          class="flex items-center gap-1.5 text-white font-bold text-[15px] hover:text-gray-200 transition"
        >
          <i class="fas fa-tachometer-alt text-sm"></i> Dashboard
        </router-link>

        <button
          @click="toggleMobileMenu"
          class="md:hidden text-white hover:text-gray-200 focus:outline-none transition-transform duration-300"
        >
          <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-[#ea7379] border-t border-white/20 absolute w-full left-0 shadow-md"
      >
        <div class="px-4 py-3 space-y-2 text-white font-medium text-[15px]">
          <router-link
            @click="closeMobileMenu"
            to="/"
            class="block px-3 py-2 rounded-md hover:bg-white/10 transition"
          >
            <i class="fas fa-home w-5 text-center mr-1"></i> Home
          </router-link>
          <router-link
            @click="closeMobileMenu"
            to="/about"
            class="block px-3 py-2 rounded-md hover:bg-white/10 transition"
          >
            <i class="fas fa-info-circle w-5 text-center mr-1"></i> Tentang
          </router-link>
          <router-link
            @click="closeMobileMenu"
            to="/artikel"
            class="block px-3 py-2 rounded-md hover:bg-white/10 transition"
          >
            <i class="fas fa-newspaper w-5 text-center mr-1"></i> Artikel
          </router-link>
          <router-link
            @click="closeMobileMenu"
            to="/contact"
            class="block px-3 py-2 rounded-md hover:bg-white/10 transition"
          >
            <i class="fas fa-address-book w-5 text-center mr-1"></i> Kontak
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)
const dashboardRoute = ref('/user-dashboard') // Rute bawaan

// State untuk Hamburger Menu
const isMobileMenuOpen = ref(false)

// Fungsi untuk membuka/menutup menu mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Fungsi untuk menutup menu saat tautan di-klik
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (currentUser) {
    isLoggedIn.value = true // Ubah tombol Login menjadi Dashboard

    if (currentUser.role === 'superadmin') {
      dashboardRoute.value = '/dashboard-superadmin'
    } else if (currentUser.role === 'admin') {
      dashboardRoute.value = '/dashboard-admin'
    } else {
      dashboardRoute.value = '/user-dashboard'
    }
  }
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Membuat efek gulir ke atas
  })
}
</script>
