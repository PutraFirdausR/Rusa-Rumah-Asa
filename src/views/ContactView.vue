<template>
  <div
    class="h-[calc(100vh-65px)] flex flex-col font-sans border-t border-gray-100 overflow-hidden"
  >
    <main class="flex-1 max-w-285 w-full mx-auto px-4 py-4 flex flex-col min-h-0">
      <h1
        class="shrink-0 text-[28px] md:text-[32px] font-medium text-[#222] text-center mb-3 flex items-center justify-center gap-3"
      >
        <i class="far fa-envelope text-2xl"></i>
        Hubungi Kami
      </h1>

      <div
        class="flex-1 bg-white rounded-lg border border-gray-300 flex flex-col md:flex-row overflow-hidden min-h-0"
      >
        <div class="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center overflow-y-auto">
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label class="block text-[#444] text-[14px] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama"
                  class="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label class="block text-[#444] text-[14px] mb-1">Alamat Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  class="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div class="mb-3">
              <label class="block text-[#444] text-[14px] mb-1">Subjek</label>
              <input
                type="text"
                placeholder="Subjek"
                class="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <div class="mb-4">
              <label class="block text-[#444] text-[14px] mb-1">Pesan</label>
              <textarea
                rows="3"
                placeholder="Pesan"
                class="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-[#007bff] hover:bg-[#0069d9] text-white font-medium py-2 rounded transition duration-200 text-[15px]"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        <div
          class="w-full md:w-1/2 bg-gray-200 relative border-t md:border-t-0 md:border-l border-gray-300 min-h-50 md:min-h-0 h-full"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.561520817491!2d110.4080523!3d-7.0606941999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7089425c802481%3A0x745e54e4b1f6f7b1!2sPAUD%20RUSA%20DAN%20BIMBEL%20BANYUMANIK%20SEMARANG!5e0!3m2!1sen!2sid!4v1776395006198!5m2!1sen!2sid"
            class="absolute inset-0 w-full h-full border-0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </div>
    </main>

    <footer class="shrink-0 bg-[#d9534f] py-4 w-full">
      <div class="max-w-285 mx-auto px-4 flex flex-wrap justify-center gap-3">
        <a
          href="https://www.instagram.com/rumahasaindonesia?igsh=MW03Zm93dG93Z3I5aQ=="
          class="flex flex-col items-center justify-center w-22.5 h-18.75 bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
        >
          <i class="fab fa-instagram text-2xl mb-1"></i>
          <span class="text-[13px] font-medium">Instagram</span>
        </a>

        <a
          href="https://web.facebook.com/rumahasaindonesia/?_rdc=1&_rdr#"
          class="flex flex-col items-center justify-center w-22.5 h-18.75 bg-[#1877f2] text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
        >
          <i class="fab fa-facebook-f text-2xl mb-1"></i>
          <span class="text-[13px] font-medium">Facebook</span>
        </a>

        <a
          href="#"
          class="flex flex-col items-center justify-center w-22.5 h-18.75 bg-[#ff0000] text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
        >
          <i class="fab fa-youtube text-2xl mb-1"></i>
          <span class="text-[13px] font-medium">Youtube</span>
        </a>

        <a
          href="#"
          class="flex flex-col items-center justify-center w-22.5 h-18.75 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors duration-200"
        >
          <i class="fab fa-tiktok text-2xl mb-1"></i>
          <span class="text-[13px] font-bold tracking-tight">TikTok</span>
        </a>

        <a
          href="https://api.whatsapp.com/send/?phone=6285225014202&text&type=phone_number&app_absent=0"
          class="flex flex-col items-center justify-center w-22.5 h-18.75 bg-[#25d366] text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
        >
          <i class="fab fa-whatsapp text-2xl mb-1"></i>
          <span class="text-[13px] font-medium">Whatsapp</span>
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
const submitForm = () => {
  alert('Pesan berhasil dikirim!')
}
</script>
