<template>
  <div class="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
      Form Pembayaran
    </h2>

    <form @submit.prevent="submitPayment">
      <!-- Pilih Metode Pembayaran -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Metode Pembayaran</label>
        <select v-model="payment.payment_method" class="w-full px-4 py-2 border rounded focus:outline-none">
          <option value="">Pilih Metode</option>
          <option value="bank_transfer">Transfer Bank</option>
          <option value="ewallet">E-Wallet</option>
          <option value="qris">QRIS</option>
        </select>
      </div>

      <!-- Info Transfer Bank -->
      <div v-if="payment.payment_method === 'bank_transfer'" class="mb-4">
        <p class="text-sm text-gray-700">Transfer ke rekening berikut:</p>
        <p class="font-medium mt-2">BCA - 1234567890</p>
        <p class="text-gray-700 font-medium text-lg">Total: Rp{{ formatCurrency(booking?.total_price || 0) }}</p>
        <p class="text-gray-600 text-sm">a.n. PT Gudang Sewa Indonesia</p>
      </div>

      <!-- Info E-Wallet -->
      <div v-if="payment.payment_method === 'ewallet'" class="mb-4">
        <p class="text-sm text-gray-700">Kirim ke e-wallet berikut:</p>
        <p class="font-medium mt-2">OVO / Dana / GoPay - 0812 3456 7890</p>
        <p class="text-gray-700 font-medium text-lg">Total: Rp{{ formatCurrency(booking?.total_price || 0) }}</p>
        <p class="text-gray-600 text-sm">a.n. PT Gudang Sewa Indonesia</p>
      </div>

      <!-- Info QRIS -->
      <div v-if="payment.payment_method === 'qris'" class="mb-4 text-center">
        <p class="text-sm text-gray-700 mb-2">Scan kode QRIS di bawah ini untuk membayar:</p>
        <img
          src="/QrisExample.png"
          alt="QRIS"
          class="w-64 mx-auto my-3 border rounded shadow"
        />
        <p class="text-gray-700 font-medium text-lg">Total: Rp{{ formatCurrency(booking?.total_price || 0) }}</p>
        <p class="text-xs text-gray-500 mt-1">a.n. PT Gudang Sewa Indonesia</p>
      </div>

      <!-- Upload Bukti Pembayaran -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Upload Bukti Pembayaran</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <!-- Preview Gambar -->
      <div v-if="previewImage" class="mb-4">
        <img :src="previewImage" alt="Preview Bukti" class="w-full max-h-64 object-contain" />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        :disabled="loading"
      >
        {{ loading ? 'Memproses...' : 'Kirim Pembayaran' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/services/api';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const bookingId = route.params.id;

const payment = ref({
  payment_method: '',
  payment_proof: null,
});

const booking = ref(null); // data booking
const previewImage = ref(null);
const loading = ref(false);

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', { style: 'decimal', maximumFractionDigits: 0 }).format(value);
}

async function getBooking() {
  try {
    const response = await axios.get(`/bookings/${bookingId}`);
    booking.value = response.data;
  } catch (error) {
    console.error(error);
    Swal.fire('Gagal', 'Gagal memuat data booking.', 'error');
  }
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    payment.value.payment_proof = file;
    previewImage.value = URL.createObjectURL(file);
  }
}

async function submitPayment() {
  if (!payment.value.payment_method) {
    Swal.fire('Oops', 'Pilih metode pembayaran terlebih dahulu.', 'warning');
    return;
  }

  const formData = new FormData();
  formData.append('booking_id', bookingId);
  formData.append('payment_method', payment.value.payment_method);
  if (payment.value.payment_proof) {
    formData.append('payment_proof', payment.value.payment_proof);
  }

  loading.value = true;
  try {
    await axios.post('/payments', formData);
    Swal.fire('Berhasil', 'Pembayaran berhasil dikirim!', 'success');
    router.push('/dashboard/bookings');
  } catch (error) {
    console.error(error);
    Swal.fire('Gagal', error.response?.data?.message || 'Terjadi kesalahan.', 'error');
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getBooking();
});
</script>
