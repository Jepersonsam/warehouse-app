<template>
  <DashboardLayout>
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Kelola Pengguna</h2>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-10 text-gray-500">Memuat data pengguna...</div>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th class="px-6 py-4">Nama</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4">Role</th>
            <th class="px-6 py-4">Tanggal Daftar</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 font-medium text-gray-900">{{ u.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ u.email }}</td>
            <td class="px-6 py-4">
              <span :class="u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'" class="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {{ u.role }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ formatDate(u.created_at) }}</td>
            <td class="px-6 py-4 text-right">
              <button 
                v-if="u.id !== currentUser.id"
                @click="deleteUser(u.id)" 
                class="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Hapus
              </button>
              <span v-else class="text-gray-400 text-xs italic">Anda</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import api from '@/services/api'
import Swal from 'sweetalert2'

const users = ref([])
const loading = ref(true)

const currentUser = computed(() => {
  return JSON.parse(localStorage.getItem('user') || '{}')
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await api.get('/admin/users')
    users.value = res.data.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id) => {
  const result = await Swal.fire({
    title: 'Hapus User?',
    text: "User yang dihapus tidak bisa dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    try {
      await api.delete(`/admin/users/${id}`)
      Swal.fire('Terhapus!', 'User telah dihapus.', 'success')
      fetchUsers()
    } catch (err) {
      Swal.fire('Gagal', 'Gagal menghapus user', 'error')
    }
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString('id-ID')

onMounted(fetchUsers)
</script>
