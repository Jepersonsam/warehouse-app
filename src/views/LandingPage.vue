<template>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    <!-- Header -->
    <header class="fixed w-full bg-white/80 backdrop-blur-md z-50 transition-all duration-300 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-extrabold tracking-tight text-blue-600 flex items-center gap-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          Gudang<span class="text-gray-900">Ku</span>
        </router-link>
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Fitur</a>
          <a href="#testimonials" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Testimoni</a>
          <a href="#faq" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition">FAQ</a>
        </nav>
        <div class="flex items-center gap-3">
          <router-link to="/login" class="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition">Masuk</router-link>
          <router-link to="/register" class="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200 transition transform hover:-translate-y-0.5">Daftar Sekarang</router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white -z-10"></div>
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div class="md:w-1/2 space-y-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
            <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Platform Sewa Gudang #1
          </div>
          <h1 class="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Sewa Gudang <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tanpa Ribet.</span>
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed max-w-lg">
            Temukan ribuan gudang terverifikasi untuk kebutuhan bisnis Anda. Proses cepat, transparan, dan aman.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <router-link to="/warehouses" class="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-xl shadow-blue-200 transition transform hover:-translate-y-1">
              Cari Gudang
              <svg class="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </router-link>
            <a href="#how-it-works" class="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition">
              Cara Kerja
            </a>
          </div>
          <div class="flex items-center gap-6 pt-8 border-t border-gray-100">
            <div>
              <p class="text-3xl font-bold text-gray-900">1.5k+</p>
              <p class="text-sm text-gray-500 font-medium">Gudang Aktif</p>
            </div>
            <div class="w-px h-10 bg-gray-200"></div>
            <div>
              <p class="text-3xl font-bold text-gray-900">500+</p>
              <p class="text-sm text-gray-500 font-medium">Partner Bisnis</p>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 relative">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-3xl transform rotate-3 scale-105 opacity-50 blur-2xl"></div>
          <img src="@/assets/landing-page.png" alt="Warehouse App" class="relative rounded-3xl shadow-2xl border border-gray-100/50 transform transition hover:scale-[1.02] duration-500" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solusi Terbaik untuk Bisnis Anda</h2>
          <p class="text-gray-600">Kami menyediakan fitur-fitur unggulan untuk memastikan pengalaman sewa gudang Anda berjalan lancar.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition duration-300 group">
            <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Terverifikasi & Aman</h3>
            <p class="text-gray-600 leading-relaxed">Setiap mitra gudang melalui proses verifikasi ketat untuk menjamin keamanan stok barang Anda.</p>
          </div>
          <div class="p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition duration-300 group">
            <div class="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Lokasi Strategis</h3>
            <p class="text-gray-600 leading-relaxed">Gudang kami tersebar di lokasi-lokasi vital dekat pelabuhan, bandara, dan pusat kota.</p>
          </div>
          <div class="p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition duration-300 group">
            <div class="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Proses Cepat</h3>
            <p class="text-gray-600 leading-relaxed">Booking dan pembayaran instan. Gudang siap digunakan dalam waktu kurang dari 24 jam.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-24 bg-gray-900 text-white relative overflow-hidden">
      <!-- Background Patterns -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">Dipercaya oleh Ribuan Bisnis</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition duration-300">
            <div class="flex items-center gap-1 mb-4 text-yellow-400">
              <span v-for="i in 5">★</span>
            </div>
            <p class="text-gray-300 italic mb-6">"Sangat membantu bisnis ekspedisi saya. Dashboardnya mudah dipahami dan proses booking sangat cepat."</p>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">A</div>
              <div>
                <p class="font-bold">Andi Saputra</p>
                <p class="text-xs text-gray-400">CEO, Logistik Cepat</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition duration-300">
            <div class="flex items-center gap-1 mb-4 text-yellow-400">
              <span v-for="i in 5">★</span>
            </div>
            <p class="text-gray-300 italic mb-6">"Pilihan gudangnya banyak dan strategis. Sangat worth it untuk harga yang ditawarkan."</p>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">R</div>
              <div>
                <p class="font-bold">Rina Wati</p>
                <p class="text-xs text-gray-400">Owner, Batik Cantik</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition duration-300">
            <div class="flex items-center gap-1 mb-4 text-yellow-400">
              <span v-for="i in 5">★</span>
            </div>
            <p class="text-gray-300 italic mb-6">"Fitur verifikasi pembayarannya aman banget. Gak was-was lagi sewa gudang online."</p>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">B</div>
              <div>
                <p class="font-bold">Budi Santoso</p>
                <p class="text-xs text-gray-400">Manager, Gudang Sembako</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 text-center">
      <div class="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 shadow-2xl relative overflow-hidden text-white">
        <div class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-up">
          Solusi Gudang <span class="text-blue-400">Terpercaya</span>
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mb-10 leading-relaxed animate-fade-in-up animate-delay-100">
          Platform penyewaan gudang modern dengan ribuan pilihan lokasi strategis untuk bisnis Anda.
        </p>
        <div class="flex gap-4 animate-fade-in-up animate-delay-200">
          <router-link
            to="/warehouses"
            class="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Cari Gudang
          </router-link>
          <a
            href="#features"
            class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg font-bold px-8 py-4 rounded-full transition-all border border-white/30"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
      </div>
    </section>

    <footer class="bg-white border-t border-gray-100 py-12 px-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">G</span>
          </div>
          <span class="font-bold text-xl text-gray-900">GudangKu</span>
        </div>
        <div class="text-gray-500 text-sm">
          &copy; 2026 GudangKu Inc. All rights reserved.
        </div>
        <div class="flex gap-6">
          <a href="#" class="text-gray-400 hover:text-blue-600 transition"><span class="sr-only">Facebook</span>FB</a>
          <a href="#" class="text-gray-400 hover:text-blue-600 transition"><span class="sr-only">Twitter</span>TW</a>
          <a href="#" class="text-gray-400 hover:text-blue-600 transition"><span class="sr-only">Instagram</span>IG</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// tidak perlu logic saat ini
</script>
