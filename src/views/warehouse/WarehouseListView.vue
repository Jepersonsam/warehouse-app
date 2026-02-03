<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Header -->
    <!-- Hero Section -->
    <div class="relative bg-blue-900 py-20 overflow-hidden">
      <!-- Background pattern/image -->
      <div class="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="w-full h-full object-cover" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Temukan Gudang <span class="text-blue-400">Idealmu</span>
        </h1>
        <p class="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Platform penyewaan gudang terpercaya dengan ribuan pilihan lokasi strategis untuk mendukung pertumbuhan bisnis Anda.
        </p>

        <!-- Search Bar -->
        <div class="max-w-3xl mx-auto">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl ring-1 ring-gray-900/5">
               <div class="flex-shrink-0 pl-4 text-gray-400">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
               </div>
               <input
                v-model="search"
                type="text"
                placeholder="Cari lokasi gudang (misal: Jakarta, Surabaya)..."
                class="block w-full border-0 bg-transparent py-4 pl-4 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg"
               />
               <button class="hidden sm:inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition">
                 Cari
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500 text-lg">Memuat gudang...</div>

      <!-- Warehouse List -->
      <div
        v-else-if="filteredWarehouses.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <WarehouseCard
          v-for="(warehouse, index) in filteredWarehouses"
          :key="warehouse.id"
          :warehouse="warehouse"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center text-gray-600 text-lg mt-10"
      >
        Tidak ada gudang yang cocok dengan pencarian Anda.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchWarehouses } from '@/services/warehouseService'
import WarehouseCard from '@/components/warehouse/WarehouseCard.vue'
import Navbar from '@/components/common/Navbar.vue'

const warehouses = ref([])
const loading = ref(true)
const search = ref('')

onMounted(async () => {
  try {
    const res = await fetchWarehouses()
    warehouses.value = res.data.data || res.data
  } catch (error) {
    console.error('Gagal memuat data gudang:', error)
  } finally {
    loading.value = false
  }
})

const filteredWarehouses = computed(() => {
  return warehouses.value.filter(w =>
    `${w.name} ${w.location}`.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>
