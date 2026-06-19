<template>
  <DashboardLayout
    theme="pink"
    role="admin"
    roleName="Administrator"
    :userEmail="currentAdminEmail"
    :menu="adminMenu"
    title="RUSA ADMIN | Panel Kontrol"
    @logout="handleLogout"
  >
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Manajemen Akun</h1>
        <p class="text-gray-500 mt-1 text-sm">
          Kelola daftar pengguna, penulis, dan admin di sistem RUSA.
        </p>
      </div>
      <button
        @click="bukaModal"
        class="bg-[#ea7379] hover:bg-[#d9656b] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#ea7379]/30 hover:-translate-y-0.5 flex items-center gap-2"
      >
        <i class="fas fa-user-plus"></i> Tambah Pengguna
      </button>
    </div>

    <div
      class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
    >
      <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div class="relative w-full sm:w-64 group">
          <i
            class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ea7379] transition-colors"
          ></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari email pengguna..."
            class="w-full bg-gray-50 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] focus:bg-white transition-all text-sm"
          />
        </div>

        <select
          v-model="roleFilter"
          class="w-full sm:w-40 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] focus:bg-white transition-all text-sm text-gray-600"
        >
          <option value="Semua">Semua Role</option>
          <option value="superadmin">Superadmin</option>
          <option value="admin">Admin</option>
          <option value="user">User (Penulis)</option>
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
              <th class="py-4 px-6 font-semibold">Alamat Email</th>
              <th class="py-4 px-6 font-semibold text-center w-40">Role / Peran</th>
              <th class="py-4 px-6 font-semibold text-center w-32">Status</th>
              <th class="py-4 px-6 font-semibold text-center w-32">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-if="filteredUsers.length === 0">
              <td colspan="5" class="py-16 text-center">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-gray-400 mb-4 border border-gray-100"
                >
                  <i class="fas fa-users-slash text-2xl"></i>
                </div>
                <h3 class="text-gray-800 font-bold text-lg mb-1">Pengguna Tidak Ditemukan</h3>
                <p class="text-gray-500 text-sm">Coba sesuaikan kata pencarian atau filter role.</p>
              </td>
            </tr>

            <tr
              v-for="(user, index) in filteredUsers"
              :key="index"
              class="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td class="py-4 px-6 text-gray-500 text-center">{{ index + 1 }}</td>
              <td class="py-4 px-6 font-medium text-gray-800 flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs uppercase"
                >
                  {{ user.email.charAt(0) }}
                </div>
                {{ user.email }}
              </td>
              <td class="py-4 px-6 text-center">
                <span
                  :class="{
                    'bg-purple-100 text-purple-700': user.role === 'superadmin',
                    'bg-blue-100 text-blue-700': user.role === 'admin',
                    'bg-green-100 text-green-700': user.role === 'user',
                  }"
                  class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <span
                  class="text-green-500 flex items-center justify-center gap-1.5 text-xs font-medium"
                >
                  <span class="w-2 h-2 rounded-full bg-green-500"></span> Aktif
                </span>
              </td>
              <td class="py-4 px-6 text-center flex justify-center gap-2">
                <button
                  @click="hapusPengguna(user.email)"
                  class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors tooltip"
                  title="Hapus Pengguna"
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
            <i class="fas fa-user-plus text-[#ea7379] mr-2"></i> Tambah Pengguna Baru
          </h2>
          <button
            @click="tutupModal"
            class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-full transition-colors flex items-center justify-center"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="p-6 md:p-8 bg-white space-y-5">
          <p class="text-sm text-gray-500">Tambahkan akses untuk pengguna baru di platform RUSA.</p>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Alamat Email</label>
            <div class="relative">
              <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="newUser.email"
                type="email"
                placeholder="penulis@rusa.com"
                class="w-full bg-gray-50 pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Kata Sandi</label>
            <div class="relative">
              <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="newUser.password"
                type="password"
                placeholder="••••••••"
                class="w-full bg-gray-50 pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Peran (Role)</label>
            <div class="relative">
              <i class="fas fa-user-tag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <select
                v-model="newUser.role"
                class="w-full bg-gray-50 pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] focus:bg-white transition-all text-sm text-gray-700 appearance-none"
              >
                <option value="user">User (Penulis)</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button
            @click="tutupModal"
            class="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl font-bold text-sm transition-colors"
          >
            Batal
          </button>
          <button
            @click="simpanPengguna"
            class="px-5 py-2.5 text-white bg-[#ea7379] hover:bg-[#d9656b] rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            Simpan & Tambahkan
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
const usersList = ref([])
const searchQuery = ref('')
const roleFilter = ref('Semua')
const currentAdminEmail = ref('admin@rusa.com')

// State untuk Modal Tambah Pengguna
const showAddModal = ref(false)
const newUser = ref({
  email: '',
  password: '',
  role: 'user',
})

// Definisi Menu Khusus Admin
const adminMenu = [
  { label: 'Kelola Artikel', path: '/dashboard-admin', icon: 'fas fa-newspaper' },
  { label: 'Akun Pengguna', path: '/admin-akun', icon: 'fas fa-user-shield' },
]

onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) {
    currentAdminEmail.value = currentUser.email
  }
  loadUsers()
})

// 1. FUNGSI AMBIL DATA PENGGUNA DARI DATABASE MYSQL
const loadUsers = () => {
  fetch('http://localhost/rusa-backend/get_users.php')
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        usersList.value = result.data
      }
    })
}

// Fitur Pencarian & Filter
const filteredUsers = computed(() => {
  return usersList.value.filter((u) => {
    const matchSearch = u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchRole = roleFilter.value === 'Semua' || u.role === roleFilter.value
    return matchSearch && matchRole
  })
})

const bukaModal = () => {
  newUser.value = { email: '', password: '', role: 'user' }
  showAddModal.value = true
}

const tutupModal = () => {
  showAddModal.value = false
}

// 2. FUNGSI TAMBAH PENGGUNA KE DATABASE MYSQL
const simpanPengguna = () => {
  if (!newUser.value.email || !newUser.value.password) {
    alert('Email dan Kata Sandi wajib diisi!')
    return
  }

  fetch('http://localhost/rusa-backend/add_user.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser.value),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'sukses') {
        alert(result.pesan)
        tutupModal()
        loadUsers() // Refresh tabel agar data baru langsung muncul
      } else {
        alert(result.pesan)
      }
    })
}

// 3. FUNGSI HAPUS PENGGUNA DARI DATABASE MYSQL
const hapusPengguna = (email) => {
  if (email === currentAdminEmail.value) {
    alert('Anda tidak dapat menghapus akun Anda sendiri!')
    return
  }

  const superadminCheck = usersList.value.find((u) => u.email === email)
  if (superadminCheck && superadminCheck.role === 'superadmin') {
    alert('Akun Superadmin tidak dapat dihapus!')
    return
  }

  if (
    confirm(`Yakin ingin menghapus pengguna ${email}? Data yang terhapus tidak bisa dikembalikan.`)
  ) {
    fetch('http://localhost/rusa-backend/delete_user.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'sukses') {
          alert(result.pesan)
          loadUsers() // Refresh tabel agar akun yang dihapus menghilang
        } else {
          alert(result.pesan)
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
