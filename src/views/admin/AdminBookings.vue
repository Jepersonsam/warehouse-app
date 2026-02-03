<template>
  <DashboardLayout>
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Booking Masuk</h2>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-10 text-gray-500">Memuat data booking...</div>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th class="px-6 py-4">Customer</th>
            <th class="px-6 py-4">Gudang</th>
            <th class="px-6 py-4">Tanggal Sewa</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ booking.user?.name }}</div>
              <div class="text-xs text-gray-500">{{ booking.user?.email }}</div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ booking.warehouse?.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ formatDate(booking.start_date) }} <br> s/d <br> {{ formatDate(booking.end_date) }}
            </td>
            <td class="px-6 py-4">
              <span :class="statusClass(booking.status)" class="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {{ booking.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <template v-if="booking.status === 'pending' && isAdmin">
                <button @click="updateStatus(booking.id, 'approved')" class="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-sm font-medium transition">
                  Setujui
                </button>
                <button @click="updateStatus(booking.id, 'rejected')" class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium transition">
                  Tolak
                </button>
              </template>
              <span v-else class="text-gray-400 text-sm italic">
                {{ booking.status === 'pending' ? 'Menunggu Konfirmasi' : 'Selesai' }}
              </span>
            </td>
          </tr>
          <tr v-if="bookings.length === 0">
            <td colspan="5" class="px-6 py-10 text-center text-gray-500">Tidak ada data booking.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import api from '@/services/api'
import Swal from 'sweetalert2'

const bookings = ref([])
const loading = ref(true)
const isAdmin = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.role === 'admin'
})

const fetchBookings = async () => {
  loading.value = true
  try {
    const res = await api.get('/bookings') // Admin gets all because of backend logic
    bookings.value = res.data.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (id, status) => {
  const result = await Swal.fire({
    title: status === 'approved' ? 'Setujui Booking?' : 'Tolak Booking?',
    text: `Status akan diubah menjadi ${status}.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Lanjutkan',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    try {
      await api.put(`/bookings/${id}/status`, { status })
      Swal.fire('Sukses', `Booking berhasil di-${status}`, 'success')
      fetchBookings()
    } catch (err) {
      Swal.fire('Error', 'Gagal update status', 'error')
    }
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString('id-ID')
const statusClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700'
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'rejected': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

onMounted(fetchBookings)
</script>
