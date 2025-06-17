<template>
    <section class="relative w-full h-[300px] md:h-[400px] flex items-center justify-center text-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img :src="'http://10.63.22.84:4100/mfe/home/images/banner.png'" class="w-full h-full object-cover" alt="Banner Background" />
      </div>
  
      <!-- Overlay (opsional, bisa diaktifkan jika perlu) -->
      <!-- <div class="absolute inset-0 bg-blue/50"></div> -->
  
      <!-- Content -->
      <div class="relative z-10 px-6 md:px-12">
        <h2 class="text-white text-2xl md:text-4xl font-bold leading-tight">
          Partner with Us to Create Secure, Scalable, and Smart IT Solutions
        </h2>
        <router-link
          to="#"
          class="mt-4 inline-block bg-white text-blue-primary border-blue-primary border-md font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Contact Us
        </router-link>
      </div>
    </section>
  </template>
  
  <script setup>
  import bannerImage from '@/assets/images/banner.png'
  </script>
  
  <style scoped>
  .object-cover {
    object-fit: cover;
  }
  .absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  </style>
  