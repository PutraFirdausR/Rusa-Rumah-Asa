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
      <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Pusat Kendali</h1>
      <p class="text-gray-500 mt-1 text-sm">
        Kelola pengaturan inti, pantau server, dan atur tema website.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl"
        >
          <i class="fas fa-users"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Total Pengguna</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.users }}</p>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-xl"
        >
          <i class="fas fa-file-alt"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Total Artikel</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.articles }}</p>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-xl"
        >
          <i class="fas fa-microchip"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Beban Server</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.serverLoad }}</p>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center text-xl"
        >
          <i class="fas fa-satellite-dish"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Uptime Sistem</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.uptime }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-palette text-[#ea7379]"></i> Pengaturan Tema Web
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Pilih Tema Utama</label>
            <select
              v-model="selectedTheme"
              class="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] transition-all text-sm text-gray-700"
            >
              <option value="merah">Merah Muda (Default RUSA)</option>
              <option value="biru">Biru Samudra</option>
              <option value="hijau">Hijau Alam</option>
            </select>
          </div>
          <div class="flex gap-3 pt-2">
            <button
              @click="terapkanTema"
              class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <i class="fas fa-check"></i> Terapkan Tema
            </button>
            <button
              @click="goToWeb"
              class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm shadow-yellow-400/30 flex items-center justify-center gap-2"
            >
              <i class="fas fa-globe"></i> Lihat Web
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-bolt text-yellow-500"></i> Aksi Super Cepat
        </h2>
        <div class="space-y-4">
          <div class="flex gap-3">
            <button
              @click="backupDatabase"
              class="flex-1 flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 p-4 rounded-xl transition-colors"
            >
              <i class="fas fa-database text-2xl"></i>
              <span class="text-xs font-bold uppercase tracking-wide">Backup DB</span>
            </button>
            <button
              @click="clearCache"
              class="flex-1 flex flex-col items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 p-4 rounded-xl transition-colors"
            >
              <i class="fas fa-broom text-2xl"></i>
              <span class="text-xs font-bold uppercase tracking-wide">Clear Cache</span>
            </button>
          </div>

          <div
            class="p-4 rounded-xl border flex items-center justify-between transition-colors"
            :class="maintenanceMode ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'"
          >
            <div>
              <p
                class="font-bold text-sm"
                :class="maintenanceMode ? 'text-red-700' : 'text-gray-700'"
              >
                Mode Perbaikan (Maintenance)
              </p>
              <p class="text-xs text-gray-500 mt-0.5">Tutup akses web untuk umum sementara.</p>
            </div>
            <button
              @click="toggleMaintenance"
              :class="maintenanceMode ? 'bg-red-500' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
            >
              <span
                :class="maintenanceMode ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        class="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center"
      >
        <h2 class="font-bold text-gray-800">
          <i class="fas fa-history mr-2 text-gray-400"></i>Log Aktivitas Terakhir
        </h2>
        <span class="text-xs text-gray-500">Otomatis diperbarui</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
              <th class="py-3 px-6 font-semibold">Waktu</th>
              <th class="py-3 px-6 font-semibold">Pengguna / Sistem</th>
              <th class="py-3 px-6 font-semibold">Aktivitas</th>
              <th class="py-3 px-6 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="log in logs" :key="log.id" class="border-b border-gray-50 hover:bg-gray-50">
              <td class="py-3 px-6 text-gray-500 whitespace-nowrap">{{ log.time }}</td>
              <td class="py-3 px-6 font-medium text-gray-700">{{ log.user }}</td>
              <td class="py-3 px-6 text-gray-600">{{ log.action }}</td>
              <td class="py-3 px-6 text-center">
                <span
                  v-if="log.status === 'success'"
                  class="w-2 h-2 rounded-full bg-green-500 inline-block"
                ></span>
                <span
                  v-else-if="log.status === 'warning'"
                  class="w-2 h-2 rounded-full bg-yellow-400 inline-block"
                ></span>
                <span v-else class="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'

const router = useRouter()
const selectedTheme = ref('merah')
const maintenanceMode = ref(false)

const superAdminMenu = [
  { label: 'Pusat Kendali', path: '/dashboard-superadmin', icon: 'fas fa-server' },
  { label: 'Pengaturan Sekolah', path: '/superadmin-akses', icon: 'fas fa-school' },
]

const stats = ref({
  users: 142,
  articles: 38,
  serverLoad: '12%',
  uptime: '99.9%',
})

const logs = ref([
  {
    id: 1,
    user: 'Sistem',
    action: 'Auto-Backup Database Selesai',
    time: '10 menit yang lalu',
    status: 'success',
  },
  {
    id: 2,
    user: 'admin@rusa.com',
    action: 'Mengesahkan Artikel "All About Naruto"',
    time: '1 jam yang lalu',
    status: 'success',
  },
  {
    id: 3,
    user: 'Sistem',
    action: 'Peringatan: Upaya login gagal 3x (IP: 192.168.x.x)',
    time: '3 jam yang lalu',
    status: 'danger',
  },
  {
    id: 4,
    user: 'superadmin@rusa.com',
    action: 'Membersihkan Cache Sistem',
    time: '1 hari yang lalu',
    status: 'success',
  },
])

// 1. SAAT HALAMAN DIMUAT: Cek tema
onMounted(() => {
  let savedTheme = localStorage.getItem('app_theme') || 'merah'

  // Keamanan: Jika sebelumnya terlanjur pakai tema 'gelap', paksa reset ke 'merah'
  if (savedTheme === 'gelap') {
    savedTheme = 'merah'
    localStorage.setItem('app_theme', 'merah')
    document.documentElement.setAttribute('data-theme', 'merah')
  }

  selectedTheme.value = savedTheme
})

// FUNGSI TERAPKAN TEMA KE DATABASE
// FUNGSI TERAPKAN TEMA KE DATABASE
const terapkanTema = () => {
  fetch('http://localhost/rusa-backend/update_theme.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tema: selectedTheme.value }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        // Terapkan ke HTML
        document.documentElement.setAttribute('data-theme', selectedTheme.value)
        localStorage.setItem('app_theme', selectedTheme.value)

        // BERTERIAK KE KOMPONEN LAIN BAHWA TEMA GANTI (Ini Kuncinya!)
        window.dispatchEvent(new Event('theme-changed'))

        alert(result.pesan)
      } else {
        alert('Gagal mengubah tema: ' + result.pesan)
      }
    })
}

const goToWeb = () => router.push('/')
const backupDatabase = () =>
  alert('Memulai kompresi database... File SQL akan diunduh secara otomatis dalam beberapa detik.')
const clearCache = () =>
  alert('Swoosh! Cache sistem berhasil dibersihkan. Website sekarang berjalan lebih ringan.')
// 1. Modifikasi onMounted untuk memuat status maintenance sebelumnya
onMounted(() => {
  let savedTheme = localStorage.getItem('app_theme') || 'merah'

  if (savedTheme === 'gelap') {
    savedTheme = 'merah'
    localStorage.setItem('app_theme', 'merah')
    document.documentElement.setAttribute('data-theme', 'merah')
  }

  selectedTheme.value = savedTheme

  // TAMBAHAN: Cek status maintenance dari localStorage saat halaman dimuat
  maintenanceMode.value = localStorage.getItem('maintenance_mode') === 'true'
})

// 2. Modifikasi fungsi toggleMaintenance
const toggleMaintenance = () => {
  // Ubah nilainya
  maintenanceMode.value = !maintenanceMode.value

  // Simpan ke localStorage agar tidak hilang saat di-refresh
  localStorage.setItem('maintenance_mode', maintenanceMode.value)

  // Pancarkan event global agar App.vue langsung memunculkan/menutup halaman perbaikan
  window.dispatchEvent(new Event('maintenance-changed'))

  alert(`Mode Perbaikan telah ${maintenanceMode.value ? 'DIAKTIFKAN' : 'DIMATIKAN'}.`)
}
const handleLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>
