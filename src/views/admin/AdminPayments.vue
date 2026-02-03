<template>
  <DashboardLayout>
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Verifikasi Pembayaran</h2>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-10 text-gray-500">Memuat data pembayaran...</div>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th class="px-6 py-4">Customer</th>
            <th class="px-6 py-4">Booking</th>
            <th class="px-6 py-4">Metode</th>
            <th class="px-6 py-4">Total</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ payment.booking?.user?.name }}</div>
              <div class="text-xs text-gray-500">{{ payment.booking?.user?.email }}</div>
            </td>
            <td class="px-6 py-4 text-gray-600">
              {{ payment.booking?.warehouse?.name }} <br>
              <span class="text-xs text-gray-500">{{ formatDate(payment.booking?.start_date) }}</span>
            </td>
            <td class="px-6 py-4 text-gray-600 uppercase">{{ payment.payment_method }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">Rp{{ formatPrice(payment.booking?.total_price) }}</td>
            <td class="px-6 py-4">
              <span :class="statusClass(payment.status)" class="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {{ payment.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="viewProof(payment)" class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium transition">
                Bukti
              </button>
              <template v-if="payment.status === 'pending'">
                <button @click="updateStatus(payment.id, 'approved')" class="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-sm font-medium transition">
                  Setujui
                </button>
                <button @click="updateStatus(payment.id, 'rejected')" class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium transition">
                  Tolak
                </button>
              </template>
            </td>
          </tr>
          <tr v-if="payments.length === 0">
            <td colspan="6" class="px-6 py-10 text-center text-gray-500">Tidak ada data pembayaran.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Proof -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" @click="showModal = false">
      <div class="bg-white rounded-xl p-4 max-w-2xl max-h-[90vh] overflow-auto" @click.stop>
        <h3 class="text-lg font-bold mb-4">Bukti Pembayaran</h3>
        <img :src="selectedProof" alt="Bukti Transfer" class="w-full rounded-lg shadow-sm" />
        <div class="mt-4 flex justify-end">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium">Tutup</button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import api from '@/services/api'
import Swal from 'sweetalert2'

const payments = ref([])
const loading = ref(true)
const showModal = ref(false)
const selectedProof = ref('')

const fetchPayments = async () => {
  loading.value = true
  try {
    const res = await api.get('/admin/payments')
    payments.value = res.data.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const viewProof = (payment) => {
  if (payment.payment_proof) {
    selectedProof.value = payment.payment_proof
    showModal.value = true
  } else {
    Swal.fire('Info', 'Tidak ada bukti upload', 'info')
  }
}

const updateStatus = async (id, status) => {
  const result = await Swal.fire({
    title: status === 'approved' ? 'Setujui Pembayaran?' : 'Tolak Pembayaran?',
    text: `Status akan diubah menjadi ${status} dan booking ${status === 'approved' ? 'dikonfirmasi' : 'dibatalkan'}.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Lanjutkan',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    try {
      await api.put(`/payments/${id}/status`, { status })
      Swal.fire('Sukses', `Pembayaran berhasil di-${status}`, 'success')
      fetchPayments()
    } catch (err) {
      Swal.fire('Error', 'Gagal update status', 'error')
    }
  }
}

const formatPrice = (v) => new Intl.NumberFormat('id-ID').format(v)
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID')
const statusClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700'
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'rejected': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

onMounted(fetchPayments)
</script>
