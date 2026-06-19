<template>
  <DashboardLayout
    theme="pink"
    role="admin"
    roleName="Administrator"
    :userEmail="userEmail"
    :menu="adminMenu"
    @logout="handleLogout"
  >
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Tinjauan Artikel</h1>
        <p class="text-gray-500 mt-1 text-sm">Periksa, sahkan, tolak, atau hapus artikel.</p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button
          @click="lihatWeb"
          class="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:text-[#ea7379] transition-all font-semibold text-sm shadow-sm flex items-center justify-center gap-2"
        >
          <i class="fas fa-external-link-alt"></i> Lihat Web
        </button>
        <button
          @click="exportPDF"
          class="flex-1 sm:flex-none px-4 py-2.5 bg-[#ea7379] text-white rounded-xl hover:bg-[#d9656b] transition-all font-semibold text-sm shadow-sm flex items-center justify-center gap-2"
        >
          <i class="fas fa-file-pdf"></i> Export PDF
        </button>
      </div>
    </div>

    <div
      class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
    >
      <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div class="relative w-full sm:w-64 group">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari judul..."
            class="w-full bg-gray-50 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ea7379] text-sm"
          />
        </div>
        <select
          v-model="statusFilter"
          class="w-full sm:w-40 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ea7379] text-sm text-gray-600"
        >
          <option value="Semua">Semua Status</option>
          <option value="approved">Telah Disetujui</option>
          <option value="pending">Menunggu (Tertunda)</option>
          <option value="rejected">Ditolak</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr
              class="bg-gray-50/80 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider"
            >
              <th class="py-4 px-6 font-semibold w-16 text-center">No</th>
              <th class="py-4 px-6 font-semibold">Detail Artikel</th>
              <th class="py-4 px-6 font-semibold text-center w-32">Status</th>
              <th class="py-4 px-6 font-semibold text-center w-40">Aksi Admin</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-if="filteredArticles.length === 0">
              <td colspan="4" class="py-16 text-center text-gray-500">Artikel tidak ditemukan.</td>
            </tr>

            <tr
              v-for="(article, index) in filteredArticles"
              :key="article.id"
              class="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td class="py-4 px-6 text-gray-500 text-center">{{ index + 1 }}</td>
              <td class="py-4 px-6">
                <p class="font-bold text-gray-800 truncate max-w-75">
                  {{ article.title }}
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  Oleh: <span class="font-semibold text-[#ea7379]">{{ article.author }}</span> •
                  {{ article.date }}
                </p>
              </td>
              <td class="py-4 px-6 text-center">
                <span
                  v-if="article.status === 'approved'"
                  class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-sm"
                >
                  <i class="fas fa-check-circle"></i> Disetujui
                </span>
                <span
                  v-else-if="article.status === 'rejected'"
                  class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-sm"
                >
                  <i class="fas fa-times-circle"></i> Ditolak
                </span>
                <span
                  v-else
                  class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-sm"
                >
                  <i class="fas fa-hourglass-half"></i> Tertunda
                </span>
              </td>
              <td class="py-4 px-6 text-center flex justify-center gap-2">
                <button
                  @click="bukaModalBaca(article)"
                  class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors tooltip"
                  title="Lihat Detail"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <template v-if="article.status === 'pending'">
                  <button
                    @click="setujuiArtikel(article)"
                    class="w-8 h-8 rounded-lg bg-green-50 text-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center transition-colors tooltip"
                    title="Sahkan"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    @click="tolakArtikel(article)"
                    class="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors tooltip"
                    title="Tolak"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </template>
                <button
                  @click="hapusArtikel(article.id)"
                  class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors tooltip"
                  title="Hapus"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="showModal && selectedArticle"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-4xl h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-[fadeIn_0.3s_ease-out]"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50"
        >
          <h2 class="text-xl font-bold text-gray-800">
            <i class="fas fa-book-open text-[#ea7379] mr-2"></i> Review Artikel
          </h2>
          <button
            @click="tutupModal"
            class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-full transition-colors flex items-center justify-center"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
          <div class="max-w-3xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedArticle.title }}</h1>
            <p class="text-gray-500 text-sm mb-6">Oleh {{ selectedArticle.author }}</p>
            <div
              class="w-full h-64 md:h-87.5 rounded-xl overflow-hidden mb-8 bg-gray-50 border border-gray-100"
            >
              <img
                v-if="selectedArticle.image"
                :src="selectedArticle.image"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-gray-700 leading-loose whitespace-pre-line text-base">
              {{ selectedArticle.excerpt }}
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button
            @click="hapusArtikel(selectedArticle.id)"
            class="px-6 py-2.5 text-red-500 bg-white border border-red-200 hover:bg-red-50 rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            <i class="fas fa-trash-alt mr-1"></i> Hapus
          </button>
          <button
            v-if="selectedArticle.status === 'pending'"
            @click="tolakArtikel(selectedArticle)"
            class="px-6 py-2.5 text-white font-bold rounded-xl text-sm bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
          >
            <i class="fas fa-times mr-1"></i> Tolak Artikel
          </button>
          <button
            v-if="selectedArticle.status === 'pending' || selectedArticle.status === 'rejected'"
            @click="setujuiArtikel(selectedArticle)"
            class="px-6 py-2.5 text-white font-bold rounded-xl text-sm bg-green-500 hover:bg-green-600 transition-colors shadow-md"
          >
            <i class="fas fa-check mr-1"></i> Sahkan
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'

const router = useRouter()
const userEmail = ref('admin@rusa.com')
const articles = ref([])
const searchQuery = ref('')
const statusFilter = ref('Semua')

const showModal = ref(false)
const selectedArticle = ref(null)

// Menu Khusus Admin
const adminMenu = [
  { label: 'Kelola Artikel', path: '/dashboard-admin', icon: 'fas fa-newspaper' },
  { label: 'Akun Pengguna', path: '/admin-akun', icon: 'fas fa-user-shield' },
]

// Tambahan fungsi tombol atas
const lihatWeb = () => {
  router.push('/')
}

const exportPDF = () => {
  alert('Fitur sedang proses pembuatan')
}

// 1. MENGAMBIL DATA ARTIKEL DARI MYSQL
const loadArticles = () => {
  fetch('http://localhost/rusa-backend/get_articles.php')
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        articles.value = result.data
      }
    })
}

onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) {
    userEmail.value = currentUser.email
  }
  loadArticles()
})

const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    const matchSearch = article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = statusFilter.value === 'Semua' || article.status === statusFilter.value
    return matchSearch && matchStatus
  })
})

const bukaModalBaca = (article) => {
  selectedArticle.value = article
  showModal.value = true
}

const tutupModal = () => {
  showModal.value = false
  selectedArticle.value = null
}

// FUNGSI BANTUAN UNTUK UPDATE STATUS KE PHP
const updateStatus = (id, statusBaru) => {
  fetch('http://localhost/rusa-backend/update_article_status.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id, status: statusBaru }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        loadArticles() // Refresh data di tabel
        tutupModal()
      } else {
        alert(result.pesan)
      }
    })
}

// 2. MENGUBAH STATUS MENJADI DISEUTJUI (APPROVED)
const setujuiArtikel = (article) => {
  if (confirm(`Sahkan artikel "${article.title}"?`)) {
    updateStatus(article.id, 'approved')
  }
}

// 3. MENGUBAH STATUS MENJADI DITOLAK (REJECTED)
const tolakArtikel = (article) => {
  if (confirm(`Tolak artikel "${article.title}"?`)) {
    updateStatus(article.id, 'rejected')
  }
}

// 4. MENGHAPUS ARTIKEL DARI MYSQL
const hapusArtikel = (id) => {
  if (confirm('Yakin hapus permanen?')) {
    fetch('http://localhost/rusa-backend/delete_article.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'sukses') {
          loadArticles() // Refresh tabel setelah dihapus
          tutupModal()
        } else {
          alert('Gagal menghapus artikel')
        }
      })
  }
}

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
