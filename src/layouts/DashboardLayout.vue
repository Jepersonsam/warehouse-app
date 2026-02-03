<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div class="p-6 border-b border-gray-100">
        <h1 class="text-2xl font-extrabold text-blue-600 tracking-tight">GudangKu</h1>
      </div>

      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <template v-if="user?.role === 'admin'">
          <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Admin</p>
          <router-link to="/admin/dashboard" class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 font-medium hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1" active-class="bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:text-white hover:translate-x-0">
            <LayoutDashboardIcon class="w-5 h-5 mr-3" /> Dashboard
          </router-link>
          <router-link to="/admin/warehouses" class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 font-medium hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1" active-class="bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:text-white hover:translate-x-0">
            <Building2Icon class="w-5 h-5 mr-3" /> Kelola Gudang
          </router-link>
          <router-link to="/admin/bookings" class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 font-medium hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1" active-class="bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:text-white hover:translate-x-0">
            <ClipboardListIcon class="w-5 h-5 mr-3" /> Booking Masuk
          </router-link>
          <router-link to="/admin/payments" class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 font-medium hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1" active-class="bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:text-white hover:translate-x-0">
            <CreditCardIcon class="w-5 h-5 mr-3" /> Verifikasi Bayar
          </router-link>
          <router-link to="/admin/users" class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 font-medium hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1" active-class="bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:text-white hover:translate-x-0">
            <UsersIcon class="w-5 h-5 mr-3" /> Kelola User
          </router-link>
        </template>

        <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Menu</p>
        <router-link to="/warehouses" class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 font-medium hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1" active-class="bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:text-white hover:translate-x-0">
          <SearchIcon class="w-5 h-5 mr-3" /> Cari Gudang
        </router-link>
        <router-link to="/dashboard/bookings" class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 font-medium hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1" active-class="bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:text-white hover:translate-x-0">
          <TicketIcon class="w-5 h-5 mr-3" /> Booking Saya
        </router-link>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <div class="mb-4 px-4">
          <p class="text-sm font-bold text-gray-800">{{ user?.name }}</p>
          <p class="text-xs text-gray-500">{{ user?.email }}</p>
          <span class="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-gray-200 text-gray-700">
            {{ user?.role }}
          </span>
        </div>
        <button @click="handleLogout" class="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOutIcon class="w-5 h-5 mr-3" /> Logout
        </button>
      </div>
    </aside>

    <!-- Mobile Header (Visible only on mobile) -->
    <!-- You can add a mobile hamburger menu here later -->

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-8">
         <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  LayoutDashboard as LayoutDashboardIcon, 
  Building2 as Building2Icon, 
  ClipboardList as ClipboardListIcon,
  Search as SearchIcon,
  Ticket as TicketIcon,
  User as UserIcon,
  LogOut as LogOutIcon,
  CreditCard as CreditCardIcon,
  Users as UsersIcon
} from 'lucide-vue-next'
import api from '@/services/api'

const router = useRouter()
const user = computed(() => {
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) : null
})

const handleLogout = async () => {
  try {
    await api.post('/logout')
  } catch (e) {
    // ignore
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }
}
</script>


