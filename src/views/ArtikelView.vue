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
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm"
            />
            <button
              class="bg-white border border-blue-500 text-blue-500 rounded-lg px-4 py-2 text-sm hover:bg-blue-50 font-medium transition-colors"
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
                  class="text-blue-500 font-bold text-sm leading-tight mb-1 group-hover:underline"
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
              class="text-2xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
              @click="goToDetail(article.id)"
            >
              {{ article.title }}
            </h2>
            <p class="text-sm text-gray-500 mb-4">
              {{ article.date }} oleh
              <span class="font-semibold text-[#ea7379]">{{ article.author }}</span>
            </p>
            <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
              {{ article.excerpt }}
            </p>
            <div>
              <button
                @click="goToDetail(article.id)"
                class="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
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
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors mb-4 sm:mb-0"
          >
            {{ buttonText }}
          </button>
          <div class="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button class="bg-blue-500 text-white px-4 py-2 text-sm">1</button>
            <button
              class="text-gray-600 px-4 py-2 text-sm border-l border-gray-300 hover:bg-gray-50"
            >
              2
            </button>
            <button
              class="text-blue-500 px-4 py-2 text-sm border-l border-gray-300 hover:bg-gray-50"
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const allApprovedArticles = ref([])
const sidebarArticles = ref([])
const buttonText = ref('Jadilah Kontributor Artikel Kami')

// FUNGSI UNTUK MENGHASILKAN DATA DUMMY TERSINKRONISASI
const seedDatabase = () => {
  let db = JSON.parse(localStorage.getItem('articles_db'))
  // Jika DB kosong atau masih pakai versi lama (tidak ada subtitle), reset agar sinkron
  if (!db || db.length === 0 || db[0].subtitle === undefined) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const myEmail = currentUser ? currentUser.email : 'tes@gmail.com'

    db = [
      {
        id: 101,
        title: 'All About Naruto',
        subtitle: 'Mengenal Karakter Utama Anime',
        header: 'Edukasi',
        author: myEmail,
        date: '18 Jun 2026',
        excerpt:
          'Naruto Uzumaki adalah seorang shinobi dari klan Uzumaki Konohagakure. Dia menjadi jinchūriki dari Ekor-Sembilan pada hari kelahirannya...',
        image:
          'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?auto=format&fit=crop&q=80&w=400',
        link: '',
        status: 'approved',
      },
      {
        id: 102,
        title: 'All About Lebron James',
        subtitle: 'Perjalanan Sang Raja Basket',
        header: 'Olahraga',
        author: myEmail,
        date: '19 Jun 2026',
        excerpt:
          'LeBron James adalah pemain bola basket profesional Amerika yang secara luas dianggap sebagai salah satu pemain terhebat sepanjang masa...',
        image:
          'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=400',
        link: '',
        status: 'pending',
      },
      {
        id: 103,
        title: 'Keindahan Alam Indonesia',
        subtitle: 'Surga Tersembunyi di Asia',
        header: 'Pariwisata',
        author: 'penulis_lain@rusa.com',
        date: '20 Jun 2026',
        excerpt:
          'Indonesia menawarkan pemandangan alam yang luar biasa, mulai dari pantai berpasir putih di Bali hingga gunung berapi megah di Jawa...',
        image:
          'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400',
        link: '',
        status: 'approved',
      },
      {
        id: 104,
        title: 'Berita Kurang Valid',
        subtitle: 'Contoh Artikel Ditolak',
        header: 'Berita',
        author: myEmail,
        date: '21 Jun 2026',
        excerpt:
          'Ini adalah contoh artikel yang ditolak oleh admin karena mengandung informasi yang perlu direvisi.',
        image:
          'https://images.unsplash.com/photo-1621539036980-607212c75a44?auto=format&fit=crop&q=80&w=400',
        link: '',
        status: 'rejected',
      },
    ]
    localStorage.setItem('articles_db', JSON.stringify(db))
  }
  return db
}

onMounted(() => {
  const articlesDb = seedDatabase()
  const allApproved = articlesDb.filter((article) => article.status === 'approved')

  allApprovedArticles.value = allApproved
  sidebarArticles.value = allApproved.slice(0, 3)

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) buttonText.value = 'Ke Dashboard Saya'
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
