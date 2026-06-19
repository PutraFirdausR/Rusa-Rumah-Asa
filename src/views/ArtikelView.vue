<template>
  <div class="min-h-screen bg-[#f8fafc] py-10 font-sans">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
      <aside class="w-full lg:w-1/3 flex flex-col gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4 text-lg">Cari Artikel</h3>
          <div class="flex gap-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari artikel..."
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-sm transition-colors"
              :class="themeConfig[currentTheme].ring"
            />
            <button
              :class="[
                'bg-white border rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                themeConfig[currentTheme].text,
                themeConfig[currentTheme].border,
                themeConfig[currentTheme].bgLight,
              ]"
            >
              Cari
            </button>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
          <h3 class="font-bold text-gray-800 mb-6 text-lg">Lihat Artikel Lainnya</h3>
          <div class="flex flex-col gap-6">
            <div
              v-for="article in sidebarArticles"
              :key="article.id"
              class="flex gap-4 items-start cursor-pointer group"
              @click="goToDetail(article.id)"
            >
              <div
                class="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
              >
                <img
                  :src="article.image"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <h4
                  :class="[
                    'font-bold text-sm leading-tight mb-1 group-hover:underline',
                    themeConfig[currentTheme].text,
                  ]"
                >
                  {{ article.title }}
                </h4>
                <p class="text-xs text-gray-500 mb-2">Oleh {{ article.author }}</p>
                <p class="text-xs text-gray-600 line-clamp-2">{{ article.excerpt }}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section class="w-full lg:w-2/3 flex flex-col">
        <div
          v-if="filteredArticles.length === 0"
          class="bg-white p-10 rounded-2xl border text-center"
        >
          <p class="text-gray-500">Artikel tidak ditemukan.</p>
        </div>

        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col-reverse md:flex-row gap-6 hover:shadow-md transition-shadow"
        >
          <div class="flex-1 flex flex-col justify-start">
            <h2
              :class="[
                'text-2xl font-bold text-gray-800 mb-2 cursor-pointer transition-colors',
                themeConfig[currentTheme].textHover,
              ]"
              @click="goToDetail(article.id)"
            >
              {{ article.title }}
            </h2>
            <p class="text-sm text-gray-500 mb-4">
              {{ article.date }} oleh
              <span :class="['font-semibold', themeConfig[currentTheme].text]">{{
                article.author
              }}</span>
            </p>
            <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
              {{ article.excerpt }}
            </p>
            <div>
              <button
                @click="goToDetail(article.id)"
                :class="[
                  'bg-white border font-semibold px-5 py-2 rounded-lg text-sm transition-colors',
                  themeConfig[currentTheme].text,
                  themeConfig[currentTheme].border,
                  themeConfig[currentTheme].bgLight,
                ]"
              >
                Lihat Selengkapnya
              </button>
            </div>
          </div>
          <div
            class="w-full md:w-64 h-56 md:h-auto shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200"
          >
            <img :src="article.image" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
          <button
            @click="handleWriteArticle"
            :class="[
              'text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors mb-4 sm:mb-0 shadow-sm',
              themeConfig[currentTheme].bg,
              themeConfig[currentTheme].bgHover,
            ]"
          >
            {{ buttonText }}
          </button>
          <div class="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button :class="['text-white px-4 py-2 text-sm', themeConfig[currentTheme].bg]">
              1
            </button>
            <button
              class="text-gray-600 px-4 py-2 text-sm border-l border-gray-300 hover:bg-gray-50"
            >
              2
            </button>
            <button
              :class="[
                'px-4 py-2 text-sm border-l border-gray-300 hover:bg-gray-50',
                themeConfig[currentTheme].text,
              ]"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const allApprovedArticles = ref([])
const sidebarArticles = ref([])
const buttonText = ref('Jadilah Kontributor Artikel Kami')

// SISTEM TEMA DINAMIS
const currentTheme = ref('merah')

const themeConfig = {
  merah: {
    text: 'text-[#ea7379]',
    bg: 'bg-[#ea7379]',
    bgHover: 'hover:bg-[#d9656b]',
    border: 'border-[#ea7379]',
    ring: 'focus:border-[#ea7379]',
    textHover: 'hover:text-[#ea7379]',
    bgLight: 'hover:bg-red-50',
  },
  biru: {
    text: 'text-blue-500',
    bg: 'bg-blue-500',
    bgHover: 'hover:bg-blue-600',
    border: 'border-blue-500',
    ring: 'focus:border-blue-500',
    textHover: 'hover:text-blue-600',
    bgLight: 'hover:bg-blue-50',
  },
  hijau: {
    text: 'text-emerald-500',
    bg: 'bg-emerald-500',
    bgHover: 'hover:bg-emerald-600',
    border: 'border-emerald-500',
    ring: 'focus:border-emerald-500',
    textHover: 'hover:text-emerald-600',
    bgLight: 'hover:bg-emerald-50',
  },
}

const checkTheme = () => {
  currentTheme.value = localStorage.getItem('app_theme') || 'merah'
}

onMounted(() => {
  // Aktifkan pemantau tema
  checkTheme()
  window.addEventListener('theme-changed', checkTheme)

  // Menarik semua artikel dari PHP
  fetch('http://localhost/rusa-backend/get_articles.php')
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        const allApproved = result.data.filter((article) => article.status === 'approved')
        allApprovedArticles.value = allApproved
        sidebarArticles.value = allApproved.slice(0, 3)
      }
    })

  // Cek apakah ada user yang sedang login
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) buttonText.value = 'Ke Dashboard Saya'
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', checkTheme)
})

const filteredArticles = computed(() => {
  if (!searchQuery.value) return allApprovedArticles.value
  return allApprovedArticles.value.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const goToDetail = (id) => router.push(`/artikel/${id}`)

const handleWriteArticle = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (!currentUser) router.push('/login')
  else {
    if (currentUser.role === 'superadmin') router.push('/dashboard-superadmin')
    else if (currentUser.role === 'admin') router.push('/dashboard-admin')
    else router.push('/user-artikel')
  }
}
</script>
