<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Checkout Sewa Gudang</h1>
      
      <div v-if="warehouse" class="flex flex-col lg:flex-row gap-10">
        <!-- LEFT: FORM -->
        <div class="flex-1">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">1</span>
              Detail Penyewaan
            </h2>
            
            <form @submit.prevent="submitBooking" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai Sewa</label>
                <div class="relative">
                  <input
                    v-model="startDate"
                    type="date"
                    required
                    class="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                  />
                </div>
                <p class="text-xs text-gray-500 mt-2">Pilih tanggal kapan Anda ingin mulai menempati gudang.</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Durasi Sewa (Bulan)</label>
                <div class="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                  <button type="button" @click="duration > 1 ? duration-- : null" class="px-4 py-3 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 font-bold text-gray-600 bg-gray-50">-</button>
                  <input
                    v-model.number="duration"
                    type="number"
                    min="1"
                    class="flex-1 text-center py-3 border-none focus:ring-0"
                  />
                  <button type="button" @click="duration++" class="px-4 py-3 bg-gray-50 hover:bg-gray-100 border-l border-gray-300 font-bold text-gray-600 bg-gray-50">+</button>
                </div>
              </div>
              
              <!-- User Info Preview (from LocalStorage) -->
              <div class="pt-6 border-t border-gray-100">
                <h3 class="text-sm font-medium text-gray-900 mb-4">Informasi Penyewa</h3>
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    User
                  </div>
                  <div>
                    <p class="text-sm font-bold text-gray-900">Anda (Customer)</p>
                    <p class="text-xs text-gray-500">Log in sebagai user terdaftar</p>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <button
                  type="submit"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition transform hover:-translate-y-0.5 flex justify-center items-center"
                >
                  Lanjut Pembayaran
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- RIGHT: SUMMARY (STICKY) -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <h2 class="text-lg font-bold text-gray-800 mb-6">Ringkasan Pesanan</h2>
            
            <!-- Warehouse Info Card -->
            <div class="flex gap-4 mb-6 pb-6 border-b border-gray-100">
              <img :src="warehouse.image_url || 'https://placehold.co/100'" class="w-20 h-20 rounded-lg object-cover bg-gray-100" />
              <div>
                <h3 class="font-bold text-gray-900 text-sm line-clamp-2">{{ warehouse.name }}</h3>
                <div class="flex items-center text-xs text-gray-500 mt-1">
                   <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                   {{ warehouse.location }}
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-3 text-sm mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Harga Sewa</span>
                <span class="font-medium">Rp{{ formatPrice(warehouse.price_per_month) }} /bln</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Durasi</span>
                <span class="font-medium">{{ duration }} Bulan</span>
              </div>
              <div class="flex justify-between text-green-600">
                <span>Biaya Layanan</span>
                <span>Gratis</span>
              </div>
              <div class="h-px bg-gray-100 my-2"></div>
              <div class="flex justify-between items-end">
                <span class="font-bold text-gray-800">Total Pembayaran</span>
                <span class="text-xl font-extrabold text-blue-600">Rp{{ formatPrice(totalPrice) }}</span>
              </div>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-3 text-xs text-blue-700 leading-relaxed flex gap-2">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Pembayaran Anda aman dan dilindungi oleh garansi uang kembali GudangKu.
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex justify-center py-20">
         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const warehouse = ref(null)
const startDate = ref('')
const duration = ref(1)

const totalPrice = computed(() => {
  if (!warehouse.value || !warehouse.value.price_per_month || !duration.value) return 0
  return warehouse.value.price_per_month * duration.value
})

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID').format(value)
}

const fetchWarehouse = async () => {
  try {
    const res = await api.get(`/warehouses/${route.params.warehouseId}`)
    warehouse.value = res.data.data || res.data
  } catch (err) {
    console.error('Gagal mengambil data gudang:', err)
  }
}

const submitBooking = async () => {
  try {
    const endDate = new Date(startDate.value)
    endDate.setMonth(endDate.getMonth() + duration.value)

    const payload = {
      warehouse_id: route.params.warehouseId,
      start_date: startDate.value,
      end_date: endDate.toISOString().split('T')[0],
      total_price: totalPrice.value,
      status: 'pending',
    }

    const res = await api.post('/bookings', payload)

    router.push({ name: 'BookingConfirmation', params: { id: res.data.id } })
  } catch (error) {
    console.error('Gagal booking:', error)
  }
}

onMounted(fetchWarehouse)
</script>
