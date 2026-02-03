]<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Tombol Kembali -->
      <div class="mb-6">
        <router-link
          to="/warehouses"
          class="inline-flex items-center text-blue-600 hover:underline font-medium text-sm"
        >
          ← Kembali ke Daftar Gudang
        </router-link>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500 text-lg">Memuat detail gudang...</div>

      <!-- Konten Gudang -->
      <div
        v-else-if="warehouse"
        class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
      >
        <!-- Gambar -->
        <img
          src="@/assets/landing-page.png"
          alt="Warehouse Image"
          class="w-full h-[300px] md:h-[400px] object-cover"
        />

        <!-- Info Gudang -->
        <div class="p-6 md:p-8 space-y-4">
          <h2 class="text-3xl font-bold text-gray-800">{{ warehouse.name }}</h2>
          <p class="text-gray-500 text-lg">
            <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>{{ warehouse.location }}
          </p>

          <div class="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
            <div class="space-y-2">
              <p class="text-xl font-bold text-blue-600">
               Rp{{ formatPrice(warehouse.price_per_month) }}<span class="text-sm font-normal text-gray-500"> /bulan</span>
              </p>
              <p class="text-gray-700"><strong>Luas:</strong> {{ warehouse.size }} m²</p>
            </div>

            <button
              @click="handleBooking"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow transition"
            >
              Sewa Gudang Ini
            </button>
          </div>

          <!-- Deskripsi -->
          <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Deskripsi</h3>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ warehouse.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else class="text-center text-red-500 text-lg">Gudang tidak ditemukan.</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const warehouse = ref(null)
const loading = ref(true)

const fetchWarehouse = async () => {
  try {
    const res = await api.get(`/warehouses/${route.params.id}`)
    warehouse.value = res.data.data || res.data
  } catch (err) {
    console.error('Gagal mengambil data gudang:', err)
  } finally {
    loading.value = false
  }
}

const handleBooking = () => {
  router.push(`/bookings/create/${route.params.id}`)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

onMounted(fetchWarehouse)
</script>
