import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import WarehouseListView from '../views/warehouse/WarehouseListView.vue'
import WarehouseDetailView from '../views/warehouse/WarehouseDetailView.vue'
import BookingForm from '../views/booking/BookingForm.vue'

// Admin Views
import DashboardView from '../views/admin/DashboardView.vue'
import AdminWarehouses from '../views/admin/AdminWarehouses.vue'
import AdminBookings from '../views/admin/AdminBookings.vue'
import AdminPayments from '../views/admin/AdminPayments.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/warehouses',
      name: 'warehouses',
      component: WarehouseListView,
    },
    {
      path: '/warehouses/:id',
      name: 'warehouse-detail',
      component: WarehouseDetailView,
    },
    {
      path: '/bookings/create/:warehouseId',
      name: 'booking-create',
      component: BookingForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: () => import('../views/booking/BookingList.vue'),
      meta: { requiresAuth: true }
    },

    // Admin Routes
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/warehouses',
      name: 'admin-warehouses',
      component: AdminWarehouses,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/bookings',
      name: 'admin-bookings',
      component: AdminBookings,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/payments',
      name: 'admin-payments',
      component: AdminPayments,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUsers,
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    // User Routes
    {
      path: '/dashboard/bookings',
      name: 'user-bookings',
      component: AdminBookings, // Reusing component but it handles role check internally to show own bookings
      meta: { requiresAuth: true }
    },
    {
      path: '/bookings/:id/confirm',
      name: 'BookingConfirmation',
      component: () => import('../views/booking/BookingConfirmation.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/bookings/:id/pay',
      name: 'payment-form',
      component: () => import('../views/payment/PaymentForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'user-profile',
      component: () => import('../views/profile/UserProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/edit',
      name: 'edit-profile',
      component: () => import('../views/profile/EditProfileView.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresAdmin && user.role !== 'admin') {
    next('/') // Redirect non-admins to home
  } else {
    next()
  }
})

export default router
