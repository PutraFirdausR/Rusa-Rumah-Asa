<script setup>
import { computed } from 'vue'
import { globalBanners } from '@/store/bannerStore' // Panggil brankas global

// Otomatis menyesuaikan data jika admin mematikan/menghapus banner
const activeBanners = computed(() => {
  return globalBanners.value.filter((banner) => banner.aktif === true)
})

const bukaFile = (url) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100">
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold text-gray-800">Informasi Terkini</h2>
      <p class="text-gray-500 mt-2">Berita dan update terbaru dari Rumah Asa</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="banner in activeBanners"
        :key="banner.id"
        @click="bukaFile(banner.file)"
        class="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      >
        <div class="h-52 bg-gray-50 relative overflow-hidden flex items-center justify-center">
          <div
            v-if="banner.file.includes('drive.google.com')"
            class="flex flex-col items-center text-blue-500"
          >
            <i class="fab fa-google-drive text-6xl mb-3"></i>
            <span class="text-xs font-black tracking-widest">BUKA DOKUMEN</span>
          </div>
          <img
            v-else
            :src="banner.file"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div class="absolute top-4 left-4">
            <span
              class="px-3 py-1 bg-white/90 backdrop-blur text-[#ea7379] text-[10px] font-extrabold rounded-full shadow-sm uppercase"
            >
              {{ banner.tipe }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <h3
            class="font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#ea7379] transition-colors"
          >
            {{ banner.judul }}
          </h3>
          <div
            class="mt-4 flex items-center text-xs font-bold text-gray-400 group-hover:text-[#ea7379]"
          >
            LIHAT DETAIL
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
