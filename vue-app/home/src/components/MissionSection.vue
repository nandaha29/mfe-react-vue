<template>
    <section class="flex flex-col w-full min-h-screen items-center px-6 md:px-16 lg:px-24 pt-40 md:pt-0 mt-24 space-y-24 mb-20">
      <!-- Row 1 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        <div class="w-2/3 ml-40">
          <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Our Mission: <br /> Empowering Businesses with Open-Source
          </h2>
          <p class="text-gray-700 text-lg leading-relaxed">
            PT Certa Systems Indonesia is a technology partner providing open-source IT Infrastructure solutions. 
            We support businesses in building reliable, secure, and efficient systems through flexible and innovative technology services.
          </p>
        </div>
        <div class="w-full flex justify-center">
          <div class="w-full max-w-lg md:max-w-xl h-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img :src="'http://10.63.22.84:4100/mfe/home/images/mission1.png'" alt="Mission Image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
  
      <!-- Row 2 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        <div class="w-full flex justify-center">
          <div class="w-full max-w-lg md:max-w-xl h-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img :src="'http://10.63.22.84:4100/mfe/home/images/mission1.png'" alt="Future of IT" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="w-2/3 mr-40">
          <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            The Future of IT: <br /> Open, Secure, and Scalable
          </h2>
          <p class="text-gray-700 text-lg leading-relaxed">
            In today’s rapidly evolving digital landscape, open-source technology plays a crucial role in building scalable and secure infrastructures. 
            With a research-driven approach, we deliver adaptable solutions for various business needs.
          </p>
        </div>
      </div>
  
      <!-- Row 3 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        <div class="w-2/3 ml-40">
          <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Optimizing IT Through <br /> Innovation & Security
          </h2>
          <p class="text-gray-700 text-lg leading-relaxed">
            Open-source technology unlocks limitless opportunities for businesses to grow. With expertise in IT infrastructure, cloud computing, 
            and system security, we help companies optimize their technology with reliable and efficient solutions.
          </p>
        </div>
        <div class="w-full flex justify-center">
          <div class="w-full max-w-lg md:max-w-xl h-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img :src="'http://10.63.22.84:4100/mfe/home/images/mission1.png'" alt="Innovation & Security" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import missionImage1 from '@/assets/images/mission1.png'
  import missionImage2 from '@/assets/images/mission1.png' // Ganti jika gambar berbeda
  import missionImage3 from '@/assets/images/mission1.png' // Ganti jika gambar berbeda
  </script>
  
  <style scoped>
  /* Tambahkan custom style di sini jika perlu */
  </style>
  