<template>
  <DashboardLayout>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Kelola Gudang</h2>
      <button @click="openModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
        <PlusIcon class="w-5 h-5 mr-2" /> Tambah Gudang
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-10 text-gray-500">Memuat data...</div>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th class="px-6 py-4">Nama</th>
            <th class="px-6 py-4">Lokasi</th>
            <th class="px-6 py-4">Harga / Bulan</th>
            <th class="px-6 py-4">Ukuran</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="w in warehouses" :key="w.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 font-medium text-gray-900">{{ w.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ w.location }}</td>
            <td class="px-6 py-4 font-medium text-green-600">Rp{{ formatPrice(w.price_per_month) }}</td>
            <td class="px-6 py-4 text-gray-600">{{ w.size }} m²</td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openModal(w)" class="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
              <button @click="deleteWarehouse(w.id)" class="text-red-600 hover:text-red-800 font-medium text-sm">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Edit Gudang' : 'Tambah Gudang' }}</h3>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Gudang</label>
            <input v-model="form.name" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Gudang Pusat..." />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <input v-model="form.location" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Jakarta Selatan..." />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
              <input v-model="form.price_per_month" type="number" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ukuran (m²)</label>
              <input v-model="form.size" type="number" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea v-model="form.description" rows="3" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
            <input v-model="form.image_url" type="url" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="https://..." />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false" class="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium">Batal</button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">
              {{ isEditing ? 'Simpan Perubahan' : 'Buat Gudang' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { Plus as PlusIcon } from 'lucide-vue-next'
import api from '@/services/api'
import Swal from 'sweetalert2'

const warehouses = ref([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const currentId = ref(null)

const form = ref({
  name: '',
  location: '',
  price_per_month: '',
  size: '',
  description: '',
  image_url: 'https://placehold.co/600x400'
})

const fetchWarehouses = async () => {
  loading.value = true
  try {
    const res = await api.get('/public-warehouses') // Admin uses same endpoint for list usually, or dedicated
    warehouses.value = res.data.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const openModal = (w = null) => {
  if (w) {
    isEditing.value = true
    currentId.value = w.id
    form.value = { ...w }
  } else {
    isEditing.value = false
    currentId.value = null
    form.value = {
      name: '',
      location: '',
      price_per_month: '',
      size: '',
      description: '',
      image_url: 'https://placehold.co/600x400'
    }
  }
  showModal.value = true
}

const submitForm = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/warehouses/${currentId.value}`, form.value)
      Swal.fire('Sukses', 'Data gudang diperbarui', 'success')
    } else {
      await api.post('/warehouses', form.value)
      Swal.fire('Sukses', 'Gudang berhasil ditambahkan', 'success')
    }
    showModal.value = false
    fetchWarehouses()
  } catch (err) {
    Swal.fire('Error', 'Gagal menyimpan data', 'error')
  }
}

const deleteWarehouse = async (id) => {
  const result = await Swal.fire({
    title: 'Yakin hapus?',
    text: "Data tidak bisa dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    try {
      await api.delete(`/warehouses/${id}`)
      Swal.fire('Terhapus!', 'Gudang telah dihapus.', 'success')
      fetchWarehouses()
    } catch (err) {
      Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus', 'error')
    }
  }
}

const formatPrice = (v) => new Intl.NumberFormat('id-ID').format(v)

onMounted(fetchWarehouses)
</script>


