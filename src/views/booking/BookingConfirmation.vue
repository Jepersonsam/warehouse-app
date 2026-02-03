<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto" v-if="booking">
      
      <!-- Status Banner -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center mb-8 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-6">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Booking Berhasil Dibuat!</h1>
        <p class="text-gray-500 text-lg max-w-xl mx-auto">
          Terima kasih telah memesan gudang kami. Silakan selesaikan pembayaran untuk memulai masa sewa Anda.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Warehouse Info -->
        <div class="lg:col-span-2 space-y-6">
           <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <!-- Warehouse Image -->
             <div class="h-64 relative">
                <img :src="booking.warehouse?.image_url || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-6 left-6 text-white">
                   <h2 class="text-2xl font-bold">{{ booking.warehouse?.name }}</h2>
                   <p class="opacity-90 flex items-center mt-1">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      {{ booking.warehouse?.location }}
                   </p>
                </div>
             </div>
             
             <!-- Specs -->
             <div class="p-8">
                <h3 class="font-bold text-gray-800 mb-4">Spesifikasi Booking</h3>
                <div class="grid grid-cols-2 gap-6">
                   <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p class="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">Durasi</p>
                      <p class="font-semibold text-gray-900 flex items-center">
                         <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                         {{ calculateDuration }} Bulan
                      </p>
                   </div>
                   <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p class="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">Luas Gudang</p>
                      <p class="font-semibold text-gray-900 flex items-center">
                         <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                         {{ booking.warehouse?.size || '-' }} m²
                      </p>
                   </div>
                </div>

                <div class="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                   <div>
                      <p class="text-sm text-gray-500">Tanggal Mulai</p>
                      <p class="font-bold text-gray-900">{{ formatDate(booking.start_date) }}</p>
                   </div>
                   <div class="flex-1 h-0.5 bg-gray-200 mx-6 relative">
                      <div class="absolute -top-1.5 -right-1 w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div class="absolute -top-1.5 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                   </div>
                   <div class="text-right">
                      <p class="text-sm text-gray-500">Tanggal Selesai</p>
                      <p class="font-bold text-gray-900">{{ formatDate(booking.end_date) }}</p>
                   </div>
                </div>
             </div>
           </div>
        </div>

        <!-- Right: Payment Action -->
        <div class="lg:col-span-1">
           <div class="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h3 class="font-bold text-gray-800 mb-6">Rincian Pembayaran</h3>
              
              <div class="space-y-4 mb-8">
                 <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Kode Booking</span>
                    <span class="font-mono font-medium text-gray-900">#BK-{{ booking.id }}</span>
                 </div>
                 <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Status</span>
                    <span class="px-2 py-0.5 rounded-md text-xs font-bold uppercase"
                          :class="{
                            'bg-yellow-100 text-yellow-700': booking.status === 'pending',
                            'bg-green-100 text-green-700': booking.status === 'confirmed',
                            'bg-red-100 text-red-700': booking.status === 'cancelled'
                          }">
                       {{ booking.status }}
                    </span>
                 </div>
                 <div class="h-px bg-gray-100 my-2"></div>
                 <div class="flex justify-between items-end">
                    <span class="font-bold text-gray-800">Total Tagihan</span>
                    <span class="text-2xl font-extrabold text-blue-600">Rp{{ formatPrice(booking.total_price) }}</span>
                 </div>
              </div>

              <div class="space-y-3">
                 <router-link
                    :to="`/bookings/${booking.id}/pay`"
                    class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-200 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                 >
                    Lanjut ke Pembayaran ->
                 </router-link>
                 
                 <router-link
                    to="/my-bookings"
                    class="w-full flex justify-center py-3.5 px-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition"
                 >
                    Lihat List Booking
                 </router-link>
              </div>

              <div class="mt-6 text-center">
                 <p class="text-xs text-gray-400">Butuh bantuan? <a href="#" class="text-blue-500 hover:underline">Hubungi CS</a></p>
              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-else class="flex justify-center items-center h-96">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const booking = ref(null);

const formatPrice = (val) => {
  return new Intl.NumberFormat("id-ID").format(val);
};

const formatDate = (dateStr) => {
   if(!dateStr) return '-'
   return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const calculateDuration = computed(() => {
   if (!booking.value?.start_date || !booking.value?.end_date) return 0;
   const start = new Date(booking.value.start_date);
   const end = new Date(booking.value.end_date);
   // Rough estimation
   return Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
})

const fetchBooking = async () => {
  try {
    const res = await api.get(`/bookings/${route.params.id}`);
    booking.value = res.data;
  } catch (err) {
    console.error("Gagal mengambil data booking:", err);
  }
};

onMounted(fetchBooking);
</script>
