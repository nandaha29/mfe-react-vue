<template>
  <section class="bg-white text-center mt-16">
    <!-- Title -->
    <h1 class="heading-2 mb-2 text-blue-900 py-7">Our Clients & Industries</h1>

    <!-- Full-Width Section -->
    <div class="flex flex-col">
      <div
        v-for="(industry, index) in industries"
        :key="index"
        class="relative group w-full min-h-[250px] md:min-h-[350px] overflow-hidden cursor-pointer"
      >
        <!-- Background Image with Zoom Out Effect -->
        <img 
          :src="industry.image" 
          class="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-500 group-hover:scale-100"
          alt="Industry background"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-blue-900 bg-opacity-50"></div>

        <!-- Title (Alternating Between Left & Right) -->
        <h1
          class="absolute z-10 text-white font-semibold text-lg md:text-2xl flex items-center h-full px-10"
          :class="index % 2 === 0 ? 'right-10 text-right' : 'left-10 text-left'"
        >
          {{ industry.title }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import bannerImage1 from '@/assets/images/5.png';
import bannerImage2 from '@/assets/images/6.png';
import bannerImage3 from '@/assets/images/7.png';

const industries = [
  { title: "Public Sector & Cross-Industry", image: 'http://10.63.22.84:4100/mfe/about/5.png' },
  { title: "Telecom & Manufacturing", image: 'http://10.63.22.84:4100/mfe/about/6.png' },
  { title: "Banking & Financials", image: 'http://10.63.22.84:4100/mfe/about/7.png' },
];
</script>