<template>
  <div class="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
    <aside
      :class="[
        'flex flex-col shrink-0 shadow-xl z-20 transition-all duration-300 ease-in-out relative overflow-hidden',
        isCollapsed ? 'w-20' : 'w-64',
        theme === 'dark'
          ? 'bg-linear-to-b from-gray-800 to-gray-900 text-white'
          : 'bg-linear-to-b from-[#ea7379] to-[#d9656b] text-white',
      ]"
    >
      <div
        v-if="theme === 'dark'"
        class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl z-0"
      ></div>

      <div
        :class="[
          'flex items-center border-b border-white/10 transition-all duration-300 h-20 relative z-10',
          isCollapsed ? 'justify-center px-0' : 'gap-3 px-6',
        ]"
      >
        <div
          v-if="role === 'superadmin'"
          class="shrink-0 w-11 h-11 bg-linear-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg shadow-yellow-500/30"
        >
          <i class="fas fa-crown text-white text-sm"></i>
        </div>
        <div
          v-else-if="role === 'admin'"
          class="shrink-0 w-11 h-11 bg-white rounded-full flex items-center justify-center border border-white/30 shadow-inner p-0.5"
        >
          <img
            src="/src/assets/img/logorusa1.gif"
            alt="Admin Logo"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <div
          v-else
          class="shrink-0 w-11 h-11 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold backdrop-blur-sm shadow-inner"
        >
          {{ userEmail.charAt(0).toUpperCase() }}
        </div>

        <div
          v-if="!isCollapsed"
          class="flex flex-col overflow-hidden whitespace-nowrap transition-opacity duration-300"
        >
          <span
            :class="[
              'font-bold text-sm tracking-wide',
              role === 'superadmin' ? 'text-yellow-400' : '',
            ]"
          >
            {{ roleName }}
          </span>
          <span class="text-xs text-white/80 truncate">{{ userEmail }}</span>
        </div>
      </div>

      <nav class="flex-1 py-6 overflow-y-auto overflow-x-hidden relative z-10">
        <ul class="space-y-2">
          <li v-for="(menu, index) in menus" :key="index">
            <router-link
              :to="menu.path"
              :class="[
                'transition-all group relative rounded-xl flex',
                // Mode Kecil: Susun ke bawah
                isCollapsed
                  ? 'flex-col items-center justify-center py-3 px-1 mx-2 gap-1.5'
                  : 'items-center gap-3 py-3 px-4 mx-4',
                // Default Class (Tidak Aktif) - Efek hover normal
                theme === 'dark'
                  ? 'text-gray-400 hover:bg-white/10 hover:text-white'
                  : 'text-white/80 hover:bg-white/20 hover:text-white',
              ]"
              :exact-active-class="
                // KUNCI JAWABAN: Tambahkan hover:!bg-white agar saat aktif kebal di-hover
                theme === 'dark'
                  ? '!bg-linear-to-r from-yellow-400 to-orange-500 !text-white font-bold shadow-lg shadow-orange-500/20 hover:!text-white'
                  : '!bg-white !text-[#ea7379] font-bold shadow-md hover:!bg-white hover:!text-[#ea7379]'
              "
            >
              <i :class="[menu.icon, 'text-lg', isCollapsed ? '' : 'w-5 text-center']"></i>

              <span v-if="!isCollapsed" class="whitespace-nowrap">{{ menu.label }}</span>
              <span
                v-else
                class="text-[10px] leading-tight text-center w-full truncate font-medium tracking-wide"
              >
                {{ menu.label }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>

      <div :class="['border-t border-white/10 relative z-10', isCollapsed ? 'p-3' : 'p-6']">
        <button
          @click="$emit('logout')"
          :class="[
            'text-white/90 hover:text-white hover:bg-white/20 font-medium rounded-xl transition-colors shadow-sm w-full flex',
            isCollapsed
              ? 'flex-col items-center justify-center py-3 px-1 gap-1.5'
              : 'items-center justify-center gap-2 px-4 py-2.5',
          ]"
        >
          <i class="fas fa-sign-out-alt text-lg"></i>
          <span v-if="!isCollapsed">Keluar</span>
          <span v-else class="text-[10px] leading-tight text-center font-medium tracking-wide"
            >Keluar</span
          >
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 relative z-10">
      <header
        class="bg-white/80 backdrop-blur-md h-16 flex items-center px-6 border-b border-gray-100 shrink-0 sticky top-0 z-10"
      >
        <div class="flex items-center gap-4 w-full">
          <button
            @click="isCollapsed = !isCollapsed"
            class="text-gray-400 hover:text-[#ea7379] focus:outline-none transition-transform hover:scale-110"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>

          <div class="font-bold text-[#ea7379] tracking-widest uppercase text-sm">
            RUSA <span class="text-gray-300 mx-2">|</span>
            <span class="text-gray-500 font-medium tracking-normal capitalize"
              >Bermain Sambil Belajar</span
            >
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 md:p-10 overflow-y-auto">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  theme: { type: String, default: 'pink' },
  role: { type: String, default: 'user' },
  roleName: { type: String, default: 'Penulis' },
  userEmail: { type: String, required: true },
  menus: { type: Array, required: true },
})

defineEmits(['logout'])
const isCollapsed = ref(false)
</script>
