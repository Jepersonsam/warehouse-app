<template>
  <div class="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300">
    <!-- Image Container -->
    <div class="relative h-56 overflow-hidden">
      <img
        :src="displayImage"
        alt="Gudang"
        class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
      />
      <!-- Badges -->
      <div class="absolute top-4 left-4 flex gap-2">
        <span v-if="warehouse.is_rented" class="bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          Disewa
        </span>
        <span v-else class="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Tersedia
        </span>
      </div>
      
      <!-- Price Tag Overlay -->
      <div class="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50">
        <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Mulai dari</p>
        <p class="text-blue-600 font-extrabold text-lg">Rp{{ formatPrice(warehouse.price_per_month) }}<span class="text-xs text-gray-400 font-normal">/bln</span></p>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <div>
           <div class="flex items-center text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">
            <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {{ warehouse.city }}
          </div>
          <h2 class="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
            {{ warehouse.name }}
          </h2>
        </div>
      </div>
      
      <p class="text-gray-600 text-sm line-clamp-2 mb-6 h-10">
        {{ warehouse.description || 'Gudang strategis dengan fasilitas lengkap, keamanan 24 jam, dan akses mudah untuk kendaraan besar.' }}
      </p>

      <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-3 text-sm text-gray-500">
           <div class="flex items-center gap-1" title="Luas">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
             {{ warehouse.size }}m²
           </div>
           <div class="flex items-center gap-1" title="Kapasitas">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
             Large
           </div>
        </div>
        
        <router-link
          :to="`/warehouses/${warehouse.id}`"
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  warehouse: Object
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

// Fallback images if backend doesn't provide one or provides a placeholder
const randomImages = [
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'https://images.unsplash.com/photo-1595246140625-573b715d11dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565610261705-791399a02212?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
]

const displayImage = computed(() => {
  // If we have a real URL that is NOT a placeholder, use it
  if (props.warehouse.image_url && !props.warehouse.image_url.includes('placehold.co')) {
    return props.warehouse.image_url
  }
  // Otherwise pick a random one based on ID to be consistent
  const index = (props.warehouse.id || 0) % randomImages.length
  return randomImages[index]
})
</script>
