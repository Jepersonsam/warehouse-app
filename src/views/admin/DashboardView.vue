<template>
  <DashboardLayout>
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
      <p class="text-gray-500">Selamat datang kembali, Admin.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div class="p-4 bg-blue-50 rounded-xl text-blue-600 mr-4">
          <Building2Icon class="w-8 h-8" />
        </div>
        <div>
          <p class="text-gray-500 text-sm font-medium">Total Gudang</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.total_warehouses ?? 0 }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div class="p-4 bg-green-50 rounded-xl text-green-600 mr-4">
          <ClipboardListIcon class="w-8 h-8" />
        </div>
        <div>
          <p class="text-gray-500 text-sm font-medium">Total Booking</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.total_bookings ?? 0 }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div class="p-4 bg-purple-50 rounded-xl text-purple-600 mr-4">
          <BanknoteIcon class="w-8 h-8" />
        </div>
        <div>
          <p class="text-gray-500 text-sm font-medium">Pendapatan</p>
          <p class="text-2xl font-bold text-gray-800">Rp{{ formatPrice(stats.revenue ?? 0) }}</p>
        </div>
      </div>
    </div>

    <!-- Recent Bookings -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">Booking Terbaru</h3>
        <router-link to="/admin/bookings" class="text-blue-600 hover:text-blue-700 text-sm font-medium">Lihat Semua</router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Gudang</th>
              <th class="px-6 py-4">Tanggal</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="booking in stats.recent_bookings" :key="booking.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ booking.user?.name }}</div>
                <div class="text-sm text-gray-500">{{ booking.user?.email }}</div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ booking.warehouse?.name }}</td>
              <td class="px-6 py-4 text-gray-600">
                {{ formatDate(booking.start_date) }} - {{ formatDate(booking.end_date) }}
              </td>
              <td class="px-6 py-4">
                <span :class="statusClass(booking.status)" class="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">Rp{{ formatPrice(booking.total_price) }}</td>
            </tr>
            <tr v-if="!stats.recent_bookings?.length">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">Belum ada booking terbaru.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { Building2 as Building2Icon, ClipboardList as ClipboardListIcon, Banknote as BanknoteIcon } from 'lucide-vue-next'
import api from '@/services/api'

const stats = ref({})

const fetchStats = async () => {
  try {
    const res = await api.get('/dashboard/stats')
    stats.value = res.data
  } catch (err) {
    console.error('Gagal memuat statistik:', err)
  }
}

const formatPrice = (value) => new Intl.NumberFormat('id-ID').format(value)
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID')
const statusClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700'
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'rejected': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

onMounted(fetchStats)
</script>
