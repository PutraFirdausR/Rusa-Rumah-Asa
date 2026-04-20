<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
    >
      <div
        class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all"
      >
        <div class="p-6 text-center">
          <div
            class="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
            :class="iconBgColor"
          >
            <i :class="[iconClass, iconTextColor, 'text-4xl']"></i>
          </div>

          <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ title }}</h3>
          <p class="text-gray-500 text-sm whitespace-pre-line">{{ message }}</p>
        </div>

        <div class="bg-gray-50 px-6 py-4 flex gap-3 justify-center">
          <button
            v-if="isConfirm"
            @click="cancel"
            class="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>

          <button
            @click="confirm"
            class="flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition-colors shadow-sm"
            :class="buttonColor"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  type: { type: String, default: 'info' }, // 'success', 'warning', 'danger', 'info'
  title: { type: String, default: 'Pemberitahuan' },
  message: { type: String, default: '' },
  isConfirm: { type: Boolean, default: false },
  confirmText: { type: String, default: 'Oke, Mengerti' },
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => emit('confirm')
const cancel = () => emit('cancel')

// Logika Warna dan Ikon berdasarkan Tipe Pop-up
const iconClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'fas fa-check-circle'
    case 'warning':
      return 'fas fa-exclamation-triangle'
    case 'danger':
      return 'fas fa-times-circle'
    default:
      return 'fas fa-info-circle'
  }
})

const iconBgColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100'
    case 'warning':
      return 'bg-yellow-100'
    case 'danger':
      return 'bg-red-100'
    default:
      return 'bg-blue-100'
  }
})

const iconTextColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-500'
    case 'warning':
      return 'text-yellow-500'
    case 'danger':
      return 'text-red-500'
    default:
      return 'text-blue-500'
  }
})

const buttonColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500 hover:bg-green-600'
    case 'warning':
      return 'bg-yellow-500 hover:bg-yellow-600'
    case 'danger':
      return 'bg-red-500 hover:bg-red-600'
    default:
      return 'bg-blue-500 hover:bg-blue-600'
  }
})
</script>

<style scoped>
/* Animasi Pop-up Masuk & Keluar */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .transform,
.modal-leave-active .transform {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from .transform,
.modal-leave-to .transform {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
