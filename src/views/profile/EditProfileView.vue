<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-xl w-full">
      <!-- Back Link -->
      <router-link to="/profile" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition mb-8">
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Kembali ke Profil
      </router-link>

      <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
           <h1 class="text-2xl font-extrabold text-gray-900">Edit Profil</h1>
           <p class="text-gray-500 mt-1 text-sm">Perbarui informasi pribadi Anda.</p>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
              <div class="relative">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                 </div>
                 <input
                   type="text"
                   v-model="form.name"
                   placeholder="Masukkan nama Anda"
                   class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition sm:text-sm"
                 />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp / HP</label>
              <div class="relative">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                 </div>
                 <input
                   type="text"
                   v-model="form.phone"
                   placeholder="0812..."
                   class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition sm:text-sm"
                 />
              </div>
            </div>
          </div>

          <div class="pt-4 flex items-center gap-4">
            <button
              type="submit"
              class="flex-1 flex justify-center items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
            >
              Simpan Perubahan
            </button>
            <router-link
               to="/profile"
               class="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition"
            >
               Batal
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/services/api'
import Swal from 'sweetalert2'

const router = useRouter()
const form = ref({
  name: '',
  phone: '',
})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    const user = JSON.parse(userData)
    form.value = {
      name: user.name,
      phone: user.phone || '',
    }
  }
})

const handleSubmit = async () => {
  try {
    // Note: Assuming axios service handles BaseURL
    const response = await axios.put('/profile', form.value) // Ensure backend route matches (likely /profile or /user/profile)

    // Update localStorage with new data
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const updatedUser = { ...currentUser, ...form.value }
    localStorage.setItem('user', JSON.stringify(updatedUser))

    // Optional: Also rely on response data if backend returns full user
    if (response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
    }

    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Profil Anda telah diperbarui.',
      timer: 1500,
      showConfirmButton: false,
    })

    router.push('/profile')
  } catch (error) {
    console.error(error)
     // Fallback if route fails (e.g. backend not implemented yet), just simulate success for UI demo if needed, but better show error.
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan profil.',
    })
  }
}
</script>
