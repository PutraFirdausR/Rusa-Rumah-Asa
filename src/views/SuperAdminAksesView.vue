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
            @click="
              triggerAlert(
                'success',
                'Periode Diperbarui',
                'Tahun ajaran berhasil disimpan ke sistem.',
              )
            "
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
            <i class="fas fa-bullhorn text-orange-500"></i> Papan Informasi Publik (Mode Statis)
          </h2>
          <p class="text-xs text-gray-400">
            Konten ini menggunakan data statis yang langsung diarahkan ke aset lokal.
          </p>
        </div>
        <button
          @click="tambahBanner"
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
              v-if="banner.file.includes('drive.google.com')"
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

    <ModernAlert
      :isOpen="alertState.isOpen"
      :title="alertState.title"
      :message="alertState.message"
      :type="alertState.type"
      :isConfirm="alertState.isConfirm"
      @close="alertState.isOpen = false"
      @confirm="executeAction"
    />
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'
import ModernAlert from '@/components/ModernAlert.vue'

// BRANKAS GLOBAL
import { globalBanners } from '@/store/bannerStore'

const router = useRouter()

// -- DATA STATE --
const activePeriode = ref({ tahun: '2025/2026', semester: 'Ganjil' })
const superAdminMenu = [
  { label: 'Pusat Kendali', path: '/dashboard-superadmin', icon: 'fas fa-server' },
  { label: 'Pengaturan Sekolah', path: '/superadmin-akses', icon: 'fas fa-school' },
]

const daftarKelas = ref([
  { id: 1, nama: 'Kelas Apel', waliKelas: 'Ibu Rina S.Pd' },
  { id: 2, nama: 'Kelas Mangga', waliKelas: 'Ibu Sari S.Pd' },
])

// DATA DARI BRANKAS GLOBAL
const banners = globalBanners

// Fungsi untuk mengetes link
const bukaFile = (url) => {
  window.open(url, '_blank')
}

// -- LOGIKA MODERN ALERT --
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

const executeAction = () => {
  if (alertState.actionType === 'delete_banner') {
    // Akan langsung menghapus dari brankas global
    banners.value = banners.value.filter((b) => b.id !== alertState.targetData.id)
  } else if (alertState.actionType === 'delete_kelas') {
    daftarKelas.value = daftarKelas.value.filter((k) => k.id !== alertState.targetData.id)
  }
  alertState.isOpen = false
}

const toggleBanner = (id) => {
  const banner = banners.value.find((b) => b.id === id)
  if (banner) {
    banner.aktif = !banner.aktif
  }
}

const konfirmasiHapusBanner = (banner) => {
  alertState.actionType = 'delete_banner'
  alertState.targetData = banner
  alertState.isConfirm = true
  alertState.type = 'danger'
  alertState.title = 'Hapus Informasi?'
  alertState.message = `Apakah Anda yakin ingin menghapus "${banner.judul}"?`
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

const tambahBanner = () => {
  const judul = prompt('Masukkan Judul Informasi:')
  if (!judul) return
  const file = prompt('Masukkan Link Gambar (URL) atau Link Google Drive:')
  if (!file) return

  banners.value.push({
    id: Date.now(),
    judul: judul,
    file: file,
    tipe: file.includes('drive.google.com') ? 'Google Drive' : 'External Link',
    aktif: true,
  })
}

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>
