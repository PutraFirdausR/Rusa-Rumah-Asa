<template>
  <DashboardLayout
    theme="dark"
    role="superadmin"
    roleName="SUPER ADMIN"
    userEmail="Pusat Kendali"
    :menu="superAdminMenu"
    @logout="handleLogout"
  >
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Pengaturan Sekolah</h1>
      <p class="text-gray-500 mt-1 text-sm">
        Kelola periode aktif, daftar kelas, dan publikasi papan informasi/banner.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-calendar-alt text-blue-500"></i> Periode Aktif
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Tahun Ajaran</label>
            <select
              v-model="activePeriode.tahun"
              class="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="2024/2025">2024 / 2025</option>
              <option value="2025/2026">2025 / 2026</option>
            </select>
          </div>
          <button
            @click="simpanPeriode"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <i class="fas fa-save"></i> Simpan
          </button>
        </div>
      </div>

      <div
        class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center"
        >
          <h2 class="font-bold text-gray-800 flex items-center gap-2">
            <i class="fas fa-chalkboard-teacher text-green-500"></i> Kelas Aktif
          </h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead
              class="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-widest font-bold"
            >
              <tr>
                <th class="py-4 px-6">Nama Kelas</th>
                <th class="py-4 px-6">Wali Kelas</th>
                <th class="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="kelas in daftarKelas"
                :key="kelas.id"
                class="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
              >
                <td class="py-4 px-6 font-bold text-gray-700">{{ kelas.nama }}</td>
                <td class="py-4 px-6 text-gray-500">{{ kelas.waliKelas }}</td>
                <td class="py-4 px-6 text-center">
                  <button
                    @click="konfirmasiHapusKelas(kelas)"
                    class="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      <div
        class="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div>
          <h2 class="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <i class="fas fa-bullhorn text-orange-500"></i> Papan Informasi Publik
          </h2>
          <p class="text-xs text-gray-400">
            Kelola data papan informasi, ucapan, atau pengumuman di halaman depan web.
          </p>
        </div>
        <button
          @click="bukaModalTambah"
          class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-orange-500/20 flex items-center gap-2"
        >
          <i class="fas fa-plus"></i> Tambah Info
        </button>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="banner in banners"
          :key="banner.id"
          class="group border border-gray-100 rounded-2xl overflow-hidden relative bg-gray-50/30 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
        >
          <div class="h-32 bg-gray-200 flex items-center justify-center overflow-hidden">
            <div
              v-if="banner.file && banner.file.includes('drive.google.com')"
              class="text-center w-full h-full flex flex-col items-center justify-center bg-blue-50/80 cursor-pointer"
              @click="bukaFile(banner.file)"
            >
              <i
                class="fab fa-google-drive text-4xl text-blue-500 hover:scale-110 transition-transform"
              ></i>
            </div>
            <img
              v-else
              :src="banner.file"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
              @click="bukaFile(banner.file)"
            />
          </div>

          <div class="p-4">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-bold text-gray-800 text-sm truncate w-32" :title="banner.judul">
                {{ banner.judul }}
              </h3>
              <span
                :class="banner.aktif ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'"
                class="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter"
              >
                {{ banner.aktif ? 'Aktif' : 'Off' }}
              </span>
            </div>
            <p class="text-[10px] text-gray-400 mb-4">{{ banner.tipe }}</p>

            <div class="flex gap-2">
              <button
                @click="toggleBanner(banner.id)"
                :class="banner.aktif ? 'bg-gray-100 text-gray-600' : 'bg-green-500 text-white'"
                class="flex-1 py-2 rounded-lg text-[11px] font-bold transition-colors"
              >
                {{ banner.aktif ? 'Matikan' : 'Aktifkan' }}
              </button>
              <button
                @click="konfirmasiHapusBanner(banner)"
                class="px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50"
        >
          <h2 class="text-xl font-bold text-gray-800">
            <i class="fas fa-bullhorn text-orange-500 mr-2"></i> Tambah Informasi Baru
          </h2>
          <button
            @click="tutupModalTambah"
            class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-full transition-colors flex items-center justify-center"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="p-6 md:p-8 bg-white space-y-5">
          <p class="text-sm text-gray-500 mb-2">
            Lengkapi data di bawah ini untuk menampilkan informasi pada halaman utama website.
          </p>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Judul Informasi</label>
            <div class="relative">
              <i class="fas fa-heading absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="newBanner.judul"
                type="text"
                placeholder="Contoh: Ayo Sekolah, Penerimaan Murid..."
                class="w-full bg-gray-50 pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5"
              >Kategori / Sub Judul</label
            >
            <div class="relative">
              <i class="fas fa-tags absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <select
                v-model="newBanner.tipe"
                class="w-full bg-gray-50 pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-700 appearance-none"
              >
                <option value="Informasi">Informasi</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Ucapan">Ucapan</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5"
              >Pilih Foto (File Explorer)</label
            >
            <div class="relative">
              <i class="fas fa-image absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="w-full bg-gray-50 pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer"
              />
            </div>
            <input
              v-model="newBanner.file"
              type="text"
              placeholder="Atau tempel Link URL / Google Drive di sini..."
              class="w-full bg-gray-50 px-4 py-2 mt-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs"
            />
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button
            @click="tutupModalTambah"
            class="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl font-bold text-sm transition-colors"
          >
            Batal
          </button>
          <button
            @click="simpanBanner"
            class="px-5 py-2.5 text-white bg-orange-500 hover:bg-orange-600 rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            <i class="fas fa-save mr-1"></i> Simpan Info
          </button>
        </div>
      </div>
    </div>

    <ModernAlert
      :isOpen="alertState.isOpen"
      :title="alertState.title"
      :message="alertState.message"
      :type="alertState.type"
      :isConfirm="alertState.isConfirm"
      @cancel="alertState.isOpen = false"
      @confirm="executeAction"
    />
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'
import ModernAlert from '@/components/ModernAlert.vue'

const router = useRouter()
const activePeriode = ref({ tahun: '2025/2026', semester: 'Ganjil' })
const superAdminMenu = [
  { label: 'Pusat Kendali', path: '/dashboard-superadmin', icon: 'fas fa-server' },
  { label: 'Pengaturan Sekolah', path: '/superadmin-akses', icon: 'fas fa-school' },
]

const daftarKelas = ref([
  { id: 1, nama: 'Kelas Apel', waliKelas: 'Ibu Rina S.Pd' },
  { id: 2, nama: 'Kelas Mangga', waliKelas: 'Ibu Sari S.Pd' },
])

const banners = ref([])

// STATE UNTUK MODAL TAMBAH INFO
const showAddModal = ref(false)
const newBanner = ref({
  judul: '',
  tipe: 'Informasi',
  file: '',
})

const loadBanners = () => {
  fetch('http://localhost/rusa-backend/get_banners.php')
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        banners.value = result.data
      }
    })
}

onMounted(() => {
  loadBanners()
})

const bukaFile = (url) => {
  if (url) window.open(url, '_blank')
}

// STATE UNTUK MODERN ALERT
const alertState = reactive({
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
  isConfirm: false,
  actionType: null,
  targetData: null,
})

const triggerAlert = (type, title, message) => {
  alertState.type = type
  alertState.title = title
  alertState.message = message
  alertState.isConfirm = false
  alertState.isOpen = true
}

// 1. SOLUSI TOMBOL BATAL HAPUS & EKSEKUSI MODERN ALERT
const konfirmasiHapusBanner = (banner) => {
  alertState.actionType = 'delete_banner'
  alertState.targetData = banner
  alertState.isConfirm = true
  alertState.type = 'danger'
  alertState.title = 'Hapus Informasi?'
  alertState.message = `Apakah Anda yakin ingin menghapus "${banner.judul}"? Data yang dihapus tidak bisa dikembalikan.`
  alertState.isOpen = true
}

const konfirmasiHapusKelas = (kelas) => {
  alertState.actionType = 'delete_kelas'
  alertState.targetData = kelas
  alertState.isConfirm = true
  alertState.type = 'warning'
  alertState.title = 'Hapus Kelas?'
  alertState.message = `Hapus ${kelas.nama} dari daftar periode aktif?`
  alertState.isOpen = true
}

const executeAction = () => {
  if (alertState.actionType === 'delete_banner') {
    fetch('http://localhost/rusa-backend/delete_banner.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: alertState.targetData.id }),
    }).then(() => {
      loadBanners() // Refresh data setelah dihapus
    })
  } else if (alertState.actionType === 'delete_kelas') {
    daftarKelas.value = daftarKelas.value.filter((k) => k.id !== alertState.targetData.id)
  }

  alertState.isOpen = false // Tutup popup setelah sukses
}

const simpanPeriode = () => {
  triggerAlert('success', 'Berhasil', 'Tahun ajaran berhasil disimpan ke sistem.')
}

const toggleBanner = (id) => {
  const banner = banners.value.find((b) => b.id === id)
  if (banner) {
    const statusBaru = !banner.aktif
    fetch('http://localhost/rusa-backend/toggle_banner.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: banner.id, aktif: statusBaru }),
    }).then(() => {
      banner.aktif = statusBaru
    })
  }
}

// 2. SOLUSI FILE EXPLORER
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Otomatis menempatkan nama file dengan path aset lokal public/img/
    newBanner.value.file = '/img/' + file.name
  }
}

const bukaModalTambah = () => {
  newBanner.value = { judul: '', tipe: 'Informasi', file: '' } // Reset form
  showAddModal.value = true
}

const tutupModalTambah = () => {
  showAddModal.value = false
}

const simpanBanner = () => {
  if (!newBanner.value.judul || !newBanner.value.file) {
    alert('Judul Informasi dan Foto wajib diisi!')
    return
  }

  fetch('http://localhost/rusa-backend/add_banner.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBanner.value),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        loadBanners() // Refresh data otomatis
        tutupModalTambah()
        triggerAlert('success', 'Berhasil', 'Informasi baru telah ditambahkan ke sistem.')
      } else {
        alert('Gagal menambahkan banner.')
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      alert('Terjadi kesalahan pada koneksi server.')
    })
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
