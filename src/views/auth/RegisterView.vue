<template>
  <div class="min-h-screen flex bg-white">
    <!-- Left Side: Image / Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-900">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-blue-800/90 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
        class="absolute inset-0 w-full h-full object-cover"
        alt="Warehouse Background"
      />
      
      <div class="relative z-20 flex flex-col justify-between h-full p-12 text-white">
        <div class="text-2xl font-bold tracking-tight">Gudang<span class="text-blue-200">Ku</span></div>
        
        <div class="space-y-6">
          <h2 class="text-4xl font-bold leading-tight">Mulai Bisnis Logistik Anda Bersama Kami</h2>
          <p class="text-lg text-indigo-100">
            Daftar sekarang untuk akses ke ribuan gudang strategis di seluruh Indonesia.
          </p>
        </div>
        
        <div class="text-sm text-indigo-200">© 2026 GudangKu Inc.</div>
      </div>
    </div>

    <!-- Right Side: Register Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">Buat Akun Baru</h2>
          <p class="mt-2 text-gray-600">Lengkapi data diri Anda untuk memulai.</p>
        </div>

        <form @submit.prevent="handleRegister" class="mt-8 space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition ease-in-out duration-300 hover:border-blue-400"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition ease-in-out duration-300 hover:border-blue-400"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition ease-in-out duration-300 hover:border-blue-400"
                  placeholder="Min 6 karakter"
                />
              </div>
            </div>
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Ulangi Password</label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  required
                  class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition ease-in-out duration-300 hover:border-blue-400"
                  placeholder="Ulangi password"
                />
              </div>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Mendaftarkan akun...' : 'Buat Akun Sekarang' }}
            </button>
          </div>
        </form>

        <p class="text-center text-sm text-gray-600">
          Sudah memiliki akun?
          <router-link to="/login" class="font-bold text-blue-600 hover:text-blue-500 transition hover:underline">Masuk disini</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)

// Toast Configuration
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    Toast.fire({
      icon: 'warning',
      title: 'Password tidak cocok',
      text: 'Pastikan konfirmasi password sama dengan password.'
    })
    return
  }

  loading.value = true

  try {
    await api.post('/register', {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    })

    Toast.fire({
      icon: 'success',
      title: 'Registrasi Berhasil!',
      text: 'Silakan login dengan akun yang baru dibuat.'
    })
    router.push('/login')
  } catch (error) {
    console.error(error)
     Toast.fire({
      icon: 'error',
      title: 'Registrasi Gagal',
      text: error.response?.data?.message || 'Terjadi kesalahan saat mendaftar.'
    })
  } finally {
    loading.value = false
  }
}
</script>

