<template>
  <nav class="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- LOGO -->
        <div class="flex-shrink-0 flex items-center gap-2">
           <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200">
             G
           </div>
          <router-link to="/" class="text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition">
            Gudang<span class="text-blue-600">Ku</span>
          </router-link>
        </div>

        <!-- RIGHT MENU -->
        <div class="flex items-center space-x-6">
          <!-- BOOKING ICON -->
          <router-link
            to="/my-bookings"
            class="group relative p-2 rounded-full hover:bg-blue-50 transition duration-300"
            title="Lihat Booking"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" v-if="user"></span>
          </router-link>

          <!-- USER DROPDOWN -->
          <div class="relative" v-if="user" v-click-outside="() => (dropdownOpen = false)">
            <button
              @click="toggleDropdown"
              class="flex items-center gap-3 focus:outline-none group p-1 pr-3 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
            >
              <img
                :src="user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=2563eb`"
                alt="User Avatar"
                class="w-10 h-10 rounded-full border border-gray-200 object-cover shadow-sm group-hover:scale-105 transition"
              />
              <div class="hidden md:block text-left">
                 <p class="text-sm font-bold text-gray-900 line-clamp-1">{{ user.name }}</p>
                 <p class="text-xs text-gray-500">Member</p>
              </div>
              <svg
                class="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- DROPDOWN MENU -->
            <transition name="fade">
              <div
                v-if="dropdownOpen"
                class="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 transform origin-top-right overflow-hidden"
              >
                <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 mb-2">
                  <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                  <p class="text-sm font-bold text-gray-900 truncate">{{ user.email }}</p>
                </div>
                
                <div class="px-2 space-y-1">
                  <!-- Admin Only Link -->
                  <router-link
                    v-if="user.role === 'admin'"
                    to="/admin/dashboard"
                    class="flex items-center gap-3 px-3 py-2 text-sm text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>
                    Dashboard Admin
                  </router-link>

                  <router-link
                    to="/profile"
                    class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
                  >
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    Profil Saya
                  </router-link>
                  
                  <router-link
                    to="/my-bookings"
                    class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
                  >
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                    Booking Saya
                  </router-link>
                </div>

                <div class="h-px bg-gray-100 my-2"></div>
                
                <div class="px-2">
                   <button
                    @click="logout"
                    class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Logout
                  </button>
                </div>
              </div>
            </transition>
          </div>
          
          <!-- LOGIN BTN IF NO USER -->
          <router-link
            v-else
            to="/login"
            class="hidden sm:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
          >
            Masuk / Daftar
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dropdownOpen = ref(false)
const user = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      user.value = JSON.parse(userData)
    } catch (e) {
      console.error('User data invalid:', e)
    }
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
