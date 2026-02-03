<template>
  <div class="min-h-screen flex bg-white">
    <!-- Left Side: Image / Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-600">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-900/90 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
        class="absolute inset-0 w-full h-full object-cover"
        alt="Warehouse Background"
      />
      
      <div class="relative z-20 flex flex-col justify-between h-full p-12 text-white">
        <div class="text-2xl font-bold tracking-tight">Gudang<span class="text-blue-200">Ku</span></div>
        
        <div class="space-y-6">
          <blockquote class="text-2xl font-medium leading-relaxed">
            "Platform terbaik untuk menemukan solusi pergudangan bisnis Anda. Cepat, aman, dan terpercaya."
          </blockquote>
          <div class="flex items-center gap-4">
            <div class="flex -space-x-2">
              <img class="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=32" />
              <img class="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=12" />
              <img class="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=47" />
            </div>
            <div class="text-sm font-medium text-blue-100">Bergabung dengan 2,000+ pebisnis lainnya</div>
          </div>
        </div>
        
        <div class="text-sm text-blue-200">© 2026 GudangKu Inc.</div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">Selamat Datang Kembali</h2>
          <p class="mt-2 text-gray-600">Masuk ke akun Anda untuk mulai mengelola sewa gudang.</p>
        </div>

        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          <div class="space-y-5">
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

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="text-sm">
                  <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition">Lupa password?</a>
                </div>
              </div>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition ease-in-out duration-300 hover:border-blue-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Ingat saya selama 30 hari</label>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Memproses...' : 'Masuk Sekarang' }}
          </button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500">Belum memiliki akun?</span>
          </div>
        </div>

        <div class="mt-6 text-center">
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500 transition hover:underline">
            Daftar akun gratis ->
          </router-link>
        </div>
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
  email: '',
  password: '',
  remember: false
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

const handleLogin = async () => {
  loading.value = true

  try {
    const response = await api.post('/login', {
       email: form.value.email,
       password: form.value.password
    })
    console.log('LOGIN RESPONSE:', response) // Debug log

    const token = response.data.token
    const user = response.data.data

    if (user && token) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Toast.fire({
        icon: 'success',
        title: 'Login berhasil! Selamat datang kembali.'
      })
      
      if (user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/warehouses')
      }
    } else {
      throw new Error('Data user tidak valid')
    }
  } catch (error) {
    console.error(error)
    Toast.fire({
      icon: 'error',
      title: 'Login Gagal',
      text: error.response?.data?.message || 'Periksa email dan password Anda.'
    })
  } finally {
    loading.value = false
  }
}
</script>

