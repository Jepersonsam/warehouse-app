<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      <!-- Back Button -->
      <div class="mb-6">
         <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Kembali ke Beranda
         </router-link>
      </div>

      <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
         <!-- Header / Cover -->
         <div class="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
             <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <!-- Decor -->
             <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
         </div>
         
         <!-- Body -->
         <div class="px-8 pb-8">
            <!-- Profile Picture (Floating) -->
            <div class="relative -mt-20 mb-6 flex justify-between items-end">
               <div class="relative">
                  <div class="w-40 h-40 rounded-full p-1.5 bg-white shadow-lg">
                     <img 
                        :src="user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=2563eb&size=200`" 
                        class="w-full h-full rounded-full object-cover border-4 border-gray-50"
                     />
                  </div>
                  <div class="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
               </div>
               
               <router-link 
                  to="/profile/edit"
                  class="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2"
               >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  Edit Profil
               </router-link>
            </div>
            
            <!-- Info -->
            <div class="mb-8">
               <h1 class="text-3xl font-extrabold text-gray-900">{{ user.name }}</h1>
               <p class="text-gray-500 font-medium">@{{ user.email?.split('@')[0] }}</p>
               
               <div class="mt-6 flex flex-wrap gap-4">
                  <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                     <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                     <span class="text-gray-700 font-medium">{{ user.email }}</span>
                  </div>
                  <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100" v-if="user.phone">
                     <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                     <span class="text-gray-700 font-medium">{{ user.phone }}</span>
                  </div>
               </div>
            </div>

            <!-- Stats or Attributes -->
            <div class="grid grid-cols-2 gap-4 mb-8">
               <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <p class="text-xs font-bold text-blue-500 uppercase tracking-wide mb-1">Status Member</p>
                  <p class="text-lg font-bold text-gray-900 flex items-center gap-2">
                     Verified
                     <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  </p>
               </div>
               <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <p class="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-1">Bergabung Sejak</p>
                  <p class="text-lg font-bold text-gray-900">{{ formatDate(user.created_at) }}</p>
               </div>
            </div>

            <!-- Menu -->
            <div class="space-y-3">
               <router-link to="/my-bookings" class="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition cursor-pointer group">
                  <div class="flex items-center gap-4">
                     <span class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                     </span>
                     <span class="font-bold text-gray-700 group-hover:text-blue-700">Riwayat Booking</span>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
               </router-link>

               <button @click="logout" class="w-full flex items-center justify-between p-4 rounded-2xl border border-red-100 hover:bg-red-50 transition cursor-pointer group text-left">
                  <div class="flex items-center gap-4">
                     <span class="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                     </span>
                     <span class="font-bold text-red-600">Keluar Aplikasi</span>
                  </div>
               </button>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const user = ref({ name: '', email: '' })
const router = useRouter()

const formatDate = (dateStr) => {
   if (!dateStr) return 'Baru Saja'
   return new Date(dateStr).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
}

const fetchProfile = async () => {
  try {
    const res = await api.get('/profile')
    user.value = res.data.data || res.data
  } catch (err) {
    console.error('Gagal mengambil data profil:', err)
  }
}

const logout = async () => {
  try {
    await api.post('/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Reset Default Headers potentially
    router.push('/login')
  } catch (err) {
    console.error('Gagal logout:', err)
  }
}

onMounted(fetchProfile)
</script>
