<template>
  <div class="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-50">
    <div
      class="hidden md:flex w-full md:w-[55%] bg-linear-to-br from-[#f1a1a5] to-[#ea7379] p-12 flex-col justify-between relative overflow-hidden"
    >
      <div
        class="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-white/20 blur-3xl"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-80 h-80 rounded-full bg-white/20 blur-3xl"
      ></div>

      <div class="relative z-10 text-white">
        <h1 class="text-4xl font-bold mb-1 tracking-wide">RUSA</h1>
        <p class="text-white/90 text-lg font-medium">Bermain Sambil Belajar</p>
      </div>

      <div class="relative z-10 flex-1 flex items-center justify-center">
        <img
          src="/src/assets/img/undraw_family.png"
          alt="Family Illustration"
          class="w-full h-auto max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div class="relative z-10 text-white/80 text-sm font-medium">
        © 2026 Yayasan Rumah Asa Indonesia.
      </div>
    </div>

    <div
      class="w-full md:w-[45%] flex items-center justify-center bg-white p-8 sm:p-16 h-full shadow-[-10px_0_30px_rgba(0,0,0,0.03)] relative z-20"
    >
      <div class="w-full max-w-md">
        <div class="md:hidden text-center mb-8">
          <h1 class="text-4xl font-bold text-[#ea7379] mb-1">RUSA</h1>
          <p class="text-gray-500 text-sm">Bermain Sambil Belajar</p>
        </div>

        <div class="text-center md:text-left mb-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">
            {{ isLoginMode ? 'Selamat Datang!' : 'Buat Akun Baru' }}
          </h2>
          <p class="text-gray-500">
            {{
              isLoginMode
                ? 'Silakan masuk ke akun Anda untuk melanjutkan.'
                : 'Daftarkan diri Anda untuk mulai menulis artikel.'
            }}
          </p>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#ea7379]"
            >
              <i class="fas fa-envelope text-gray-400 group-focus-within:text-[#ea7379]"></i>
            </div>
            <input
              v-model="email"
              type="email"
              placeholder="Alamat Email"
              required
              class="w-full pl-11 pr-4 py-3.5 text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] focus:bg-white transition-all"
            />
          </div>

          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#ea7379]"
            >
              <i class="fas fa-lock text-gray-400 group-focus-within:text-[#ea7379]"></i>
            </div>
            <input
              v-model="password"
              type="password"
              placeholder="Kata Sandi"
              required
              class="w-full pl-11 pr-4 py-3.5 text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea7379]/20 focus:border-[#ea7379] focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#ea7379] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-[#ea7379]/30 hover:bg-[#d66268] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-2"
          >
            {{ isLoginMode ? 'Masuk' : 'Daftar Sekarang' }}
          </button>
        </form>

        <div class="text-center mt-10">
          <p class="text-gray-600">
            {{ isLoginMode ? 'Belum punya akun?' : 'Sudah punya akun?' }}
            <button
              type="button"
              @click="toggleMode"
              class="text-[#ea7379] hover:text-[#d66268] font-semibold ml-1 hover:underline transition-colors"
            >
              {{ isLoginMode ? 'Daftar di sini' : 'Masuk di sini' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoginMode = ref(true)
const email = ref('')
const password = ref('')

const defaultUsers = [
  { email: 'super@gmail', password: 'super@gmail', role: 'superadmin' },
  { email: 'admin@gmail', password: 'Admin@gmail', role: 'admin' },
  { email: 'tes@gmail', password: 'tes@gmail', role: 'user' },
]

onMounted(() => {
  let usersDb = JSON.parse(localStorage.getItem('users_db'))
  if (!usersDb) {
    localStorage.setItem('users_db', JSON.stringify(defaultUsers))
  }
})

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  email.value = ''
  password.value = ''
}

const handleSubmit = () => {
  let usersDb = JSON.parse(localStorage.getItem('users_db')) || []

  if (isLoginMode.value) {
    const user = usersDb.find((u) => u.email === email.value && u.password === password.value)

    if (user) {
      alert(`Login berhasil! Selamat datang ${user.role}.`)
      localStorage.setItem('currentUser', JSON.stringify(user))

      if (user.role === 'superadmin') {
        router.push('/dashboard-superadmin')
      } else if (user.role === 'admin') {
        router.push('/dashboard-admin')
      } else {
        router.push('/user-dashboard')
      }
    } else {
      alert('Email atau password salah!')
    }
  } else {
    const emailExists = usersDb.find((u) => u.email === email.value)
    if (emailExists) {
      alert('Email sudah terdaftar!')
      return
    }
    const newUser = { email: email.value, password: password.value, role: 'user' }
    usersDb.push(newUser)
    localStorage.setItem('users_db', JSON.stringify(usersDb))
    alert('Registrasi berhasil!')
    isLoginMode.value = true
  }
}
</script>
