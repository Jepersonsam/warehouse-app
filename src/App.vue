<script setup>
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
</style>
