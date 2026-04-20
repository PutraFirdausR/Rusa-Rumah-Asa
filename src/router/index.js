import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/artikel',
      name: 'artikel',
      component: () => import('../views/ArtikelView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { hideNavbar: true },
    },

    // --- ROUTE UNTUK DASHBOARD (Ditambah requiresAuth) ---

    {
      path: '/dashboard-admin',
      name: 'dashboard-admin',
      component: () => import('../views/AdminView.vue'),
      meta: { hideNavbar: true, requiresAuth: true },
    },
    {
      path: '/admin-akun',
      name: 'admin-akun',
      component: () => import('../views/AdminAkunView.vue'),
      meta: { hideNavbar: true, requiresAuth: true },
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: () => import('../views/UserView.vue'),
      meta: { hideNavbar: true, requiresAuth: true },
    },
    {
      path: '/user-artikel',
      name: 'user-artikel',
      component: () => import('../views/UserArtikelView.vue'),
      meta: { hideNavbar: true, requiresAuth: true },
    },
    {
      path: '/artikel',
      name: 'artikel',
      component: () => import('../views/ArtikelView.vue'),
    },
    {
      path: '/artikel/:id', // :id berfungsi untuk menangkap ID unik dari artikel
      name: 'artikel-detail',
      component: () => import('../views/ArtikelDetailView.vue'),
    },
    {
      path: '/dashboard-superadmin',
      name: 'dashboard-superadmin',
      component: () => import('../views/SuperAdminView.vue'),
      meta: { hideNavbar: true, requiresAuth: true },
    },
    {
      path: '/superadmin-akses',
      name: 'superadmin-akses',
      component: () => import('../views/SuperAdminAksesView.vue'),
      meta: { hideNavbar: true, requiresAuth: true },
    },
  ],
})

// --- SATPAM ROUTER (Navigation Guard) ---
router.beforeEach((to, from, next) => {
  // Cek apakah ada data user yang sedang login di localStorage
  const isAuthenticated = localStorage.getItem('currentUser') !== null

  // Jika halaman yang dituju butuh login (requiresAuth) TAPI user belum login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // Tendang paksa ke halaman login
  }
  // Jika user SUDAH login, tapi iseng mau buka halaman login lagi
  else if (to.name === 'login' && isAuthenticated) {
    next('/') // Tendang ke halaman Home (atau bisa ke dashboard-nya)
  }
  // Jika semuanya aman, silakan lewat
  else {
    next()
  }
})

export default router
