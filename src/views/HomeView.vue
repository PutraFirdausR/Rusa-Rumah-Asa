<script setup>
import HomeBanner from '@/components/HomeBanner.vue'
import AboutView from './AboutView.vue'
import ContactView from './ContactView.vue'
</script>

<template>
  <div class="bg-[#fcfcfc] min-h-screen">
    <div class="relative overflow-hidden">
      <main
        class="max-w-7xl mx-auto px-4 pt-16 pb-20 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div class="w-full md:w-1/2 max-w-xl">
          <h1 class="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight mb-4">
            Selamat Datang Di RUSA
          </h1>
          <h2 class="text-2xl text-[#475569] font-medium mb-6">Rumah Asa</h2>
          <p class="text-lg text-[#64748b] leading-relaxed">
            Asa atau harapan merupakan bentuk dasar dari kepercayaan akan sesuatu yang diinginkan
            akan didapatkan atau suatu kejadian akan berbuah kebaikan di waktu yang akan datang.
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-end">
          <img
            src="/src/assets/img/back_to_scholl.png"
            alt="Ilustrasi"
            class="w-full max-w-lg object-contain drop-shadow-xl"
          />
        </div>
      </main>
    </div>
    <AboutView />
    <HomeBanner />
    <ContactView />
  </div>
</template>
