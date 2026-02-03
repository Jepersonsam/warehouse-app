<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Riwayat Booking</h1>
          <p class="text-gray-500 mt-1">Kelola semua penyewaan gudang Anda di sini.</p>
        </div>
        <router-link to="/warehouses" class="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition">
          + Sewa Baru
        </router-link>
      </div>

      <!-- Booking List -->
      <div v-if="loading" class="flex justify-center py-12">
         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="bookings.length" class="grid gap-6">
        <div
          v-for="(booking, index) in bookings"
          :key="booking.id"
          class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Warehouse Image (Placeholder for now if not available) -->
          <div class="w-full md:w-32 h-32 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden relative">
             <img :src="booking.warehouse?.image_url || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
             <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
          </div>

          <!-- Info -->
          <div class="flex-1 space-y-2">
            <div class="flex justify-between items-start">
               <div>
                  <h2 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {{ booking.warehouse?.name || 'Gudang Tidak Ditemukan' }}
                  </h2>
                  <p class="text-sm text-gray-500 flex items-center mt-1">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {{ booking.warehouse?.location || 'Lokasi tidak tersedia' }}
                  </p>
               </div>
               <span
                class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                :class="{
                  'bg-yellow-100 text-yellow-700 border border-yellow-200': booking.status === 'pending',
                  'bg-green-100 text-green-700 border border-green-200': booking.status === 'confirmed',
                  'bg-red-100 text-red-700 border border-red-200': booking.status === 'cancelled',
                  'bg-blue-100 text-blue-700 border border-blue-200': booking.status === 'approved',
                }"
              >
                {{ booking.status }}
              </span>
            </div>

            <div class="flex flex-wrap gap-4 pt-2 text-sm text-gray-600">
               <div class="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span>{{ booking.start_date }} - {{ booking.end_date }}</span>
               </div>
               <div class="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span class="font-bold text-gray-900">Rp{{ formatPrice(booking.total_price) }}</span>
               </div>
            </div>
          </div>

          <!-- Action -->
          <div class="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
             <router-link
              :to="`/bookings/${booking.id}/confirm`"
              class="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-blue-200 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
            >
              Detail & Bayar
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
        <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
           <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">Belum ada booking</h3>
        <p class="text-gray-500 mt-1 mb-6">Mulai sewa gudang pertamamu sekarang!</p>
        <router-link to="/warehouses" class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
          Cari Gudang
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const bookings = ref([]);
const loading = ref(true);

const formatPrice = (val) => {
  return new Intl.NumberFormat("id-ID").format(val);
};

const fetchBookings = async () => {
  loading.value = true;
  try {
    const res = await api.get("/bookings");
    // Handle both wrapped and unwrapped response structures
    bookings.value = Array.isArray(res.data) ? res.data : (res.data.data || []);
  } catch (err) {
    console.error("Gagal mengambil data bookings:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBookings);
</script>
