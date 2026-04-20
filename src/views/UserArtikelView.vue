<template>
  <DashboardLayout
    theme="pink"
    role="user"
    roleName="Penulis"
    :userEmail="userEmail"
    :menus="userMenus"
    @logout="handleLogout"
  >
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Karya Tulis Saya</h1>
        <p class="text-gray-500 mt-1 text-sm">Kelola artikel yang telah Anda tulis di sini.</p>
      </div>
      <button
        @click="bukaModalBuat"
        class="bg-[#ea7379] hover:bg-[#d66268] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-[#ea7379]/30 transition-all flex items-center gap-2 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus"></i> Buat Artikel Baru
      </button>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div v-if="myArticles.length === 0" class="p-16 text-center">
        <div
          class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ea7379]/10 text-[#ea7379] mb-4"
        >
          <i class="fas fa-pen-nib text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800">Belum Ada Artikel</h3>
        <p class="text-gray-500 mt-2">Anda belum menulis artikel apapun.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr
              class="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider"
            >
              <th class="py-4 px-6 font-semibold w-16 text-center">No</th>
              <th class="py-4 px-6 font-semibold">Judul Artikel</th>
              <th class="py-4 px-6 font-semibold text-center w-32">Status</th>
              <th class="py-4 px-6 font-semibold w-40">Tanggal Dibuat</th>
              <th class="py-4 px-6 font-semibold text-center w-32">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr
              v-for="(article, index) in myArticles"
              :key="article.id"
              class="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td class="py-4 px-6 text-gray-500 text-center">{{ index + 1 }}</td>
              <td class="py-4 px-6">
                <p class="font-bold text-gray-800 truncate max-w-62.5">{{ article.title }}</p>
                <p class="text-xs text-gray-500 mt-0.5 truncate max-w-62.5">
                  {{ article.subtitle || 'Tanpa subjudul' }}
                </p>
              </td>
              <td class="py-4 px-6 text-center">
                <span
                  v-if="article.status === 'pending'"
                  class="bg-yellow-100 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1 shadow-sm"
                >
                  <i class="fas fa-clock"></i> Pending
                </span>
                <span
                  v-else-if="article.status === 'rejected'"
                  class="bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1 shadow-sm"
                >
                  <i class="fas fa-times-circle"></i> Ditolak
                </span>
                <span
                  v-else
                  class="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1 shadow-sm"
                >
                  <i class="fas fa-check"></i> Approved
                </span>
              </td>
              <td class="py-4 px-6 text-gray-600">
                <i class="far fa-calendar-alt text-gray-400 mr-1"></i> {{ article.date }}
              </td>
              <td class="py-4 px-6 text-center flex justify-center gap-2">
                <button
                  @click="bukaModalEdit(article)"
                  class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors"
                  title="Tinjau / Edit"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="hapusArtikel(article.id)"
                  class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
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

    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4 sm:p-6"
      >
        <div
          class="bg-white rounded-2xl w-full max-w-7xl h-[95vh] shadow-2xl overflow-hidden flex flex-col transform transition-all animate-[fadeIn_0.3s_ease-out]"
        >
          <div
            class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0"
          >
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i
                :class="isEditing ? 'fas fa-edit text-blue-500' : 'fas fa-pen-nib text-[#ea7379]'"
              ></i>
              {{ isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru' }}
            </h2>
            <button
              @click="tutupModal"
              class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 bg-gray-50/50">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-start">
              <div
                class="lg:col-span-5 space-y-5 bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-0"
              >
                <h3 class="font-bold text-gray-700 border-b border-gray-100 pb-2 mb-4">
                  Detail Artikel
                </h3>

                <div
                  v-if="isEditing && formData.status === 'rejected'"
                  class="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-3"
                >
                  <i class="fas fa-exclamation-triangle mt-0.5 text-red-500 text-lg"></i>
                  <p>
                    <strong>Artikel Ditolak:</strong> Tulisan Anda dikembalikan oleh Admin. Silakan
                    perbaiki isi artikel Anda dan simpan ulang untuk mengajukannya kembali.
                  </p>
                </div>
                <div
                  v-else-if="isEditing && formData.status === 'approved'"
                  class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700 flex items-start gap-2"
                >
                  <i class="fas fa-exclamation-triangle mt-0.5"></i>
                  <p>
                    <strong>Perhatian:</strong> Artikel ini sudah <em>Approved</em>. Jika diedit,
                    status akan kembali <strong>Pending</strong>.
                  </p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-2 sm:col-span-1">
                    <label
                      class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide"
                      >Kategori</label
                    >
                    <input
                      v-model="formData.header"
                      type="text"
                      class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#ea7379]/30 text-sm"
                    />
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <label
                      class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide"
                      >Link Sumber</label
                    >
                    <input
                      v-model="formData.link"
                      type="text"
                      class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#ea7379]/30 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide"
                    >Judul <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="formData.title"
                    type="text"
                    class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#ea7379]/30 text-sm font-medium"
                  />
                </div>

                <div>
                  <label
                    class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide"
                    >Subjudul</label
                  >
                  <input
                    v-model="formData.subtitle"
                    type="text"
                    class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#ea7379]/30 text-sm"
                  />
                </div>

                <div>
                  <label
                    class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide"
                    >Gambar Utama <span class="text-red-500">*</span></label
                  >
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#ea7379]/10 file:text-[#ea7379] cursor-pointer"
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide"
                    >Isi <span class="text-red-500">*</span></label
                  >
                  <textarea
                    v-model="formData.excerpt"
                    rows="8"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#ea7379]/30 text-sm resize-y"
                  ></textarea>
                </div>
              </div>

              <div
                class="lg:col-span-7 flex flex-col bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden h-full min-h-150"
              >
                <div
                  class="bg-gray-800 px-4 py-2 flex justify-between items-center text-white text-xs font-bold uppercase tracking-wider shrink-0"
                >
                  <span class="flex items-center gap-2"
                    ><i class="fas fa-desktop"></i> Live Preview</span
                  >
                </div>
                <div class="flex-1 overflow-y-auto p-6 md:p-10 bg-[#f8fafc]">
                  <div
                    class="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 mx-auto max-w-4xl"
                  >
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                      {{ formData.title || 'Judul Artikel' }}
                    </h1>
                    <h2 v-if="formData.subtitle" class="text-lg text-gray-600 font-medium mb-4">
                      {{ formData.subtitle }}
                    </h2>
                    <p class="text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                      Oleh <span class="font-semibold text-gray-700">{{ userEmail }}</span>
                    </p>

                    <div
                      class="w-full h-64 md:h-100 rounded-xl overflow-hidden mb-8 border border-gray-200 bg-gray-100 relative"
                    >
                      <img
                        v-if="formData.image"
                        :src="formData.image"
                        class="w-full h-full object-cover"
                      />
                      <div
                        v-else
                        class="w-full h-full flex flex-col items-center justify-center text-gray-400"
                      >
                        <i class="far fa-image text-5xl mb-3"></i>
                      </div>
                      <div
                        v-if="formData.header"
                        class="absolute top-4 left-4 bg-white/95 px-4 py-1.5 rounded-full text-xs font-bold text-[#ea7379] shadow-md uppercase"
                      >
                        {{ formData.header }}
                      </div>
                    </div>

                    <div
                      class="text-gray-700 leading-loose whitespace-pre-line text-base md:text-lg"
                    >
                      {{ formData.excerpt || 'Isi tulisan.' }}
                      <br /><br />
                      <p
                        v-if="formData.link"
                        class="text-sm mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <strong class="text-gray-900"
                          ><i class="fas fa-link mr-1"></i> Sumber Refrensi:</strong
                        >
                        <a
                          :href="formData.link"
                          target="_blank"
                          class="text-blue-500 hover:underline break-all ml-1"
                          >{{ formData.link }}</a
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white shrink-0">
            <button
              @click="tutupModal"
              class="px-6 py-2.5 text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl font-bold text-sm"
            >
              Batalkan
            </button>
            <button
              @click="simpanArtikel"
              class="px-6 py-2.5 text-white font-bold rounded-xl text-sm shadow-lg flex items-center gap-2 bg-[#ea7379] hover:bg-[#d66268]"
            >
              <i class="fas fa-paper-plane"></i>
              {{ isEditing ? 'Simpan Revisi' : 'Ajukan Artikel' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'

const router = useRouter()
const userEmail = ref('Penulis')
const myArticles = ref([])

const showModal = ref(false)
const isEditing = ref(false)
const formData = ref({
  id: null,
  title: '',
  subtitle: '',
  header: '',
  image: '',
  link: '',
  excerpt: '',
  status: 'pending',
})

const userMenus = [
  { label: 'Dashboard', path: '/user-dashboard', icon: 'fas fa-tachometer-alt' },
  { label: 'Artikel Saya', path: '/user-artikel', icon: 'fas fa-file-alt' },
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
        excerpt: 'LeBron James adalah pemain bola basket...',
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
        excerpt: 'Indonesia menawarkan pemandangan...',
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

const loadMyArticles = () => {
  const articlesDb = seedDatabase()
  myArticles.value = articlesDb.filter((a) => a.author === userEmail.value)
}

onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) userEmail.value = currentUser.email
  loadMyArticles()
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => (formData.value.image = e.target.result)
    reader.readAsDataURL(file)
  }
}

const bukaModalBuat = () => {
  isEditing.value = false
  formData.value = {
    id: null,
    title: '',
    subtitle: '',
    header: '',
    image: '',
    link: '',
    excerpt: '',
    status: 'pending',
  }
  showModal.value = true
}

const bukaModalEdit = (article) => {
  isEditing.value = true
  formData.value = { ...article }
  showModal.value = true
}

const tutupModal = () => (showModal.value = false)

const simpanArtikel = () => {
  if (!formData.value.title || !formData.value.excerpt || !formData.value.image) {
    alert('Lengkapi Judul, Gambar, dan Isi!')
    return
  }
  let articlesDb = JSON.parse(localStorage.getItem('articles_db')) || []

  if (isEditing.value) {
    const index = articlesDb.findIndex((a) => a.id === formData.value.id)
    if (index !== -1) {
      formData.value.status = 'pending'
      articlesDb[index] = { ...formData.value }
    }
  } else {
    const tgl = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    // PERBAIKAN URUTAN DI SINI 👇
    articlesDb.unshift({
      ...formData.value, // Bongkar form lebih dulu (id masih null di sini)
      id: Date.now(), // Buat ID unik setelahnya (null tertimpa jadi angka unik!)
      author: userEmail.value,
      date: tgl,
      status: 'pending',
    })
  }

  localStorage.setItem('articles_db', JSON.stringify(articlesDb))
  loadMyArticles()
  tutupModal()
  alert(isEditing.value ? 'Revisi diajukan ulang!' : 'Artikel berhasil dibuat!')
}

const hapusArtikel = (id) => {
  if (confirm('Yakin ingin menghapus artikel ini?')) {
    let articlesDb = JSON.parse(localStorage.getItem('articles_db')) || []
    articlesDb = articlesDb.filter((a) => a.id !== id)
    localStorage.setItem('articles_db', JSON.stringify(articlesDb))
    loadMyArticles()
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
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ea7379;
}
</style>
