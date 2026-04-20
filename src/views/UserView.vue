<template>
  <DashboardLayout
    theme="pink"
    role="user"
    roleName="Penulis"
    :userEmail="userEmail"
    :menus="userMenus"
    title="RUSA | Bermain Sambil Belajar"
    @logout="handleLogout"
  >
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div
        @click="router.push('/user-artikel')"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div
          class="w-14 h-14 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center text-2xl"
        >
          <i class="fas fa-hourglass-half"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm font-medium">Ditinjau</p>
          <h3 class="text-3xl font-bold text-gray-800">{{ stats.pending }}</h3>
        </div>
      </div>

      <div
        @click="router.push('/user-artikel')"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div
          class="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-2xl"
        >
          <i class="fas fa-check-circle"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm font-medium">Disetujui</p>
          <h3 class="text-3xl font-bold text-gray-800">{{ stats.approved }}</h3>
        </div>
      </div>

      <div
        @click="router.push('/user-artikel')"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div
          class="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl"
        >
          <i class="fas fa-times-circle"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm font-medium">Ditolak</p>
          <h3 class="text-3xl font-bold text-gray-800">{{ stats.rejected }}</h3>
        </div>
      </div>

      <div
        @click="router.push('/')"
        class="bg-linear-to-br from-[#ea7379] to-[#d9656b] rounded-2xl p-6 shadow-md text-white flex items-center justify-between cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
      >
        <div>
          <p class="text-white/80 text-sm font-medium mb-1">Kunjungi</p>
          <h3 class="text-xl font-bold">Website Utama</h3>
        </div>
        <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6 h-80">
      <h3 class="font-bold text-gray-800 mb-4">Statistik Artikel Saya</h3>
      <div class="relative h-64 w-full">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import DashboardLayout from '@/components/DashboardLayout.vue' // IMPORT KOMPONEN LAYOUT

const router = useRouter()
const userEmail = ref('Penulis')
const stats = ref({ pending: 0, approved: 0, rejected: 0 })
const chartCanvas = ref(null)

// Definisi Menu untuk Sidebar User
const userMenus = [
  { label: 'Dashboard', path: '/user-dashboard', icon: 'fas fa-tachometer-alt' },
  { label: 'Artikel Saya', path: '/user-artikel', icon: 'fas fa-newspaper' },
]

const seedDatabase = () => {
  let db = JSON.parse(localStorage.getItem('articles_db'))
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
        excerpt: 'Naruto Uzumaki...',
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
        excerpt: 'LeBron James...',
        image:
          'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=400',
        link: '',
        status: 'pending',
      },
      {
        id: 103,
        title: 'Keindahan Alam Indonesia',
        subtitle: 'Surga Tersembunyi',
        header: 'Pariwisata',
        author: 'penulis_lain@rusa.com',
        date: '20 Jun 2026',
        excerpt: 'Indonesia menawarkan...',
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
        excerpt: 'Ini adalah contoh artikel ditolak.',
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
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) userEmail.value = currentUser.email

  const articlesDb = seedDatabase()

  // Hitung statistik untuk user yang login
  const myArticles = articlesDb.filter((a) => a.author === userEmail.value)
  stats.value.approved = myArticles.filter((a) => a.status === 'approved').length
  stats.value.pending = myArticles.filter((a) => a.status === 'pending').length
  stats.value.rejected = myArticles.filter((a) => a.status === 'rejected').length

  // Render Grafik Chart.js
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Disetujui', 'Menunggu', 'Ditolak'],
        datasets: [
          {
            label: 'Jumlah Artikel',
            data: [stats.value.approved, stats.value.pending, stats.value.rejected],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'], // Hijau, Kuning, Merah
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
      },
    })
  }
})

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>
