import { ref } from 'vue'

export const globalBanners = ref([
  {
    id: 1,
    judul: 'Pendaftaran Murid Baru',
    file: new URL('@/assets/img/Iklan pendaftaran.jpeg', import.meta.url).href,
    tipe: 'Pengumuman',
    aktif: true,
  },
  {
    id: 2,
    judul: 'Buku Informasi & Rincian Biaya',
    file: 'https://drive.google.com/file/d/18ZALzgXlwr2oHEO5c-M3kYfcuKUIf_ok/view?usp=drivesdk',
    tipe: 'Informasi',
    aktif: true,
  },
  {
    id: 3,
    judul: 'Selamat Hari Anak Nasional',
    file: new URL('@/assets/img/salam1.jpeg', import.meta.url).href,
    tipe: 'Ucapan',
    aktif: true,
  },
  {
    id: 4,
    judul: 'Ayo Sekolah',
    file: new URL('@/assets/img/salam2.jpeg', import.meta.url).href,
    tipe: 'Ucapan',
    aktif: true,
  },
  {
    id: 5,
    judul: 'Kegiatan Sekolah',
    file: new URL('@/assets/img/aset1.jpeg', import.meta.url).href,
    tipe: 'Informasi',
    aktif: true,
  },
  {
    id: 6,
    judul: 'Penerimaan Murid Baru',
    file: new URL('@/assets/img/aset2.jpeg', import.meta.url).href,
    tipe: 'Informasi',
    aktif: true,
  },
  {
    id: 7,
    judul: 'Bermain dan Belajar',
    file: new URL('@/assets/img/aset4.jpeg', import.meta.url).href,
    tipe: 'Informasi',
    aktif: true,
  },
  {
    id: 8,
    judul: 'Belajar dan Berteman',
    file: new URL('@/assets/img/aset3.jpeg', import.meta.url).href,
    tipe: 'Informasi',
    aktif: true,
  },
])
