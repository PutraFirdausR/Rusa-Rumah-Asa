<template>
  <div class="min-h-screen bg-[#f8fafc] py-10 font-sans">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
      <aside class="w-full lg:w-1/3 flex flex-col gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
          <h3 class="font-bold text-gray-800 mb-4 text-lg">Kembali ke Daftar</h3>
          <button
            @click="router.push('/artikel')"
            class="w-full border bg-[#ea7379] text-[white] rounded-xl px-4 py-3 text-sm hover:bg-[#9c001f] font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <i class="fas fa-arrow-left"></i> Semua Artikel
          </button>
        </div>
      </aside>

      <section class="w-full lg:w-2/3 flex flex-col gap-6">
        <div
          v-if="isLoading"
          class="bg-white p-20 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"
        >
          <i class="fas fa-spinner fa-spin text-4xl text-[#ea7379] mb-4"></i>
          <h3 class="text-xl font-bold text-gray-800">Memuat Artikel...</h3>
          <p class="text-gray-500 mt-2 text-sm">Mohon tunggu sebentar.</p>
        </div>

        <div
          v-else-if="article"
          class="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn"
        >
          <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span
              v-if="article.header"
              class="bg-[#ea7379]/10 text-[#ea7379] px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider"
              >{{ article.header }}</span
            >
            <span class="flex items-center gap-1"
              ><i class="far fa-calendar-alt"></i> {{ article.date }}</span
            >
          </div>

          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            {{ article.title }}
          </h1>
          <h2 v-if="article.subtitle" class="text-lg text-gray-500 font-medium mb-6">
            {{ article.subtitle }}
          </h2>

          <p class="text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            Ditulis oleh <span class="font-bold text-[#ea7379]">{{ article.author }}</span>
          </p>

          <div
            class="w-full h-64 md:h-100 rounded-2xl overflow-hidden mb-10 border border-gray-100 bg-gray-50 shadow-sm relative"
          >
            <img v-if="article.image" :src="article.image" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
              <i class="far fa-image text-5xl"></i>
            </div>
          </div>

          <div class="text-gray-700 leading-loose whitespace-pre-line text-base md:text-lg mb-10">
            {{ article.excerpt }}
          </div>

          <div
            v-if="article.link"
            class="mb-10 p-5 bg-blue-50/50 border border-blue-100 rounded-xl"
          >
            <p class="text-sm">
              <strong class="text-blue-900 flex items-center gap-2 mb-1"
                ><i class="fas fa-link"></i> Sumber Referensi:</strong
              >
              <a
                :href="article.link"
                target="_blank"
                class="text-blue-600 hover:text-blue-800 font-medium hover:underline break-all transition-colors"
                >{{ article.link }}</a
              >
            </p>
          </div>

          <div class="mt-10 pt-10 border-t border-gray-100">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <i class="far fa-comments text-gray-400"></i> Kolom Komentar
            </h3>

            <div
              class="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 focus-within:bg-white focus-within:shadow-md focus-within:border-blue-200 transition-all duration-300"
            >
              <label class="block font-bold text-gray-700 mb-3 text-sm">Tulis Komentar Anda</label>
              <textarea
                v-model="newComment"
                rows="3"
                class="w-full bg-transparent border-none focus:ring-0 p-0 mb-3 resize-none text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Bagaimana pendapat Anda tentang artikel ini?..."
              ></textarea>
              <div class="flex justify-end border-t border-gray-200 pt-3">
                <button
                  @click="kirimKomentar"
                  class="bg-[#ea7379] hover:bg-[#d9656b] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-[#ea7379]/20 hover:-translate-y-0.5"
                >
                  <i class="fas fa-paper-plane mr-1"></i> Kirim
                </button>
              </div>
            </div>

            <div class="space-y-6">
              <div class="flex gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-linear-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm border-2 border-white"
                >
                  A
                </div>
                <div
                  class="flex-1 bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100"
                >
                  <h4 class="font-bold text-gray-800 text-sm">
                    Admin RUSA
                    <span class="text-[11px] text-gray-400 font-normal ml-2"
                      ><i class="far fa-clock"></i> 06 Jun 2023</span
                    >
                  </h4>
                  <p class="text-gray-600 mt-1 text-sm leading-relaxed">
                    Artikel yang sangat bermanfaat! Semangat terus menulis konten-konten edukatif
                    lainnya ya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div
      v-if="showLoginModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity animate-fadeIn"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform scale-100"
      >
        <div
          class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center"
        >
          <h3 class="font-bold text-gray-800 flex items-center gap-2">
            <i class="fas fa-lock text-[#ea7379]"></i> Akses Terbatas
          </h3>
          <button
            @click="showLoginModal = false"
            class="text-gray-400 hover:text-red-500 transition-colors"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <div class="p-8 text-center">
          <div
            class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 text-2xl"
          >
            <i class="fas fa-user-circle"></i>
          </div>
          <p class="text-gray-600 mb-8 font-medium">
            Anda harus masuk (login) terlebih dahulu untuk dapat memberikan komentar.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <button
              @click="showLoginModal = false"
              class="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-bold text-sm transition-colors w-full sm:w-auto"
            >
              Lain Kali
            </button>
            <button
              @click="router.push('/login')"
              class="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto hover:-translate-y-0.5"
            >
              <i class="fas fa-sign-in-alt"></i> Login Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const newComment = ref('')
const showLoginModal = ref(false)

// Tambahkan variabel isLoading untuk mengontrol animasi muter
const isLoading = ref(true)

onMounted(() => {
  // Berikan jeda sebentar agar loading terlihat mulus (tidak nge-glitch)
  setTimeout(() => {
    try {
      const rawData = localStorage.getItem('articles_db')
      const articlesDb = rawData ? JSON.parse(rawData) : []

      const articleId = route.params.id

      // --- TAMBAHAN UNTUK DEBUGGING ---
      console.log('🔍 ID dari URL:', articleId)
      console.log('📚 Isi Database Artikel:', articlesDb)
      // --------------------------------

      // Cari artikel yang ID nya cocok
      const found = articlesDb.find(
        (a) => a.id != null && a.id.toString() === articleId?.toString(),
      )

      if (found) {
        article.value = found
      } else {
        alert(
          `Maaf, artikel dengan ID "${articleId}" tidak ditemukan. Cek Console (F12) untuk melihat data.`,
        )
        router.push('/artikel')
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memuat data:', error)
      alert('Terjadi kesalahan pada sistem saat memuat artikel.')
      router.push('/artikel')
    } finally {
      // Pastikan loading dimatikan, apapun yang terjadi (sukses/error)
      isLoading.value = false
    }
  }, 400)
})

const kirimKomentar = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (!currentUser) {
    showLoginModal.value = true
  } else {
    if (!newComment.value.trim()) {
      alert('Komentar tidak boleh kosong!')
      return
    }
    alert('Komentar berhasil ditambahkan (Mode Simulasi)!')
    newComment.value = ''
  }
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
