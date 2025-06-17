<template>
    <section class="flex flex-col md:flex-row w-full h-screen items-center px-6 md:px-16 lg:px-24 pt-40 md:pt-0">
      <!-- Container Kiri: Title, Subtitle, dan Span -->
      <div class="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
        <h1 class="text-white heading-1 md:text-4xl font-bold leading-tight">
          Empowering IT with <br /> Open-Source Excellence
        </h1>
        <p class="text-white mt-4 text-lg leading-relaxed">
          Building secure, scalable, and high-performance infrastructure with <br /> industry-leading open-source technologies.
        </p>
        <span class="text-white mt-6 text-lg">
          11 years of delivering the right technology for business
        </span>
      </div>
  
      <!-- Container Kanan: Responsive Image/Grid -->
      <div class="w-full md:w-1/2 p-6">
        <!-- Desktop/Laptop: Full Jumbo Image -->
        <div v-if="!isMobile && !isTablet" class="flex items-center justify-center transition-all duration-500 ease-in-out">
          <img 
            :src="'http://10.63.22.84:4100/mfe/home/images/jumbo-right.png'" 
            alt="Technology Icons Grid" 
            class="w-full h-auto max-w-2xl object-contain"
          />
        </div>
        
        <!-- Tablet: Grid 3 columns -->
        <div v-else-if="isTablet" class="grid grid-cols-3 gap-4 transition-all duration-500 ease-in-out">
          <div v-for="(icon, index) in displayedIcons" :key="index" 
               class="flex items-center justify-center p-4">
            <img :src="icon.src" alt="icon" class="w-32 h-32 object-contain" />
          </div>
        </div>
        
        <!-- Mobile: Grid 2 columns -->
        <div v-else class="grid grid-cols-2 gap-6 transition-all duration-500 ease-in-out">
          <div v-for="(icon, index) in displayedIcons" :key="index" 
               class="flex items-center justify-center p-4">
            <img :src="icon.src" alt="icon" class="w-32 h-32 object-contain" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import Group34 from '@/assets/logos/Group34.png';
  import Group38 from '@/assets/logos/Group38.png';
  import Group41 from '@/assets/logos/Group41.png';
  import Group24 from '@/assets/logos/Group24.png';
  import Group27 from '@/assets/logos/Group27.png';
  import Group30 from '@/assets/logos/Group30.png';
  import Group28 from '@/assets/logos/Group28.png';
  import Group39 from '@/assets/logos/Group39.png';
    
    // Semua ikon (42 total)
    const icons = [
      'http://10.63.22.84:4100/mfe/home/logos/Group27.png', 'http://10.63.22.84:4100/mfe/home/logos/Group38.png', 'http://10.63.22.84:4100/mfe/home/logos/Group41.png', 'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group27.png', 'http://10.63.22.84:4100/mfe/home/logos/Group30.png',
      'http://10.63.22.84:4100/mfe/home/logos/Group28.png', 'http://10.63.22.84:4100/mfe/home/logos/Group39.png', 'http://10.63.22.84:4100/mfe/home/logos/Group28.png', 'http://10.63.22.84:4100/mfe/home/logos/Group41.png', 'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group27.png',
      'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group38.png', 'http://10.63.22.84:4100/mfe/home/logos/Group41.png', 'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group27.png', 'http://10.63.22.84:4100/mfe/home/logos/Group30.png',
      'http://10.63.22.84:4100/mfe/home/logos/Group28.png','http://10.63.22.84:4100/mfe/home/logos/Group39.png', 'http://10.63.22.84:4100/mfe/home/logos/Group38.png', 'http://10.63.22.84:4100/mfe/home/logos/Group41.png', 'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group27.png',
      'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group38.png', 'http://10.63.22.84:4100/mfe/home/logos/Group41.png', 'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group27.png', 'http://10.63.22.84:4100/mfe/home/logos/Group30.png',
     'http://10.63.22.84:4100/mfe/home/logos/Group28.png','http://10.63.22.84:4100/mfe/home/logos/Group39.png', 'http://10.63.22.84:4100/mfe/home/logos/Group38.png', 'http://10.63.22.84:4100/mfe/home/logos/Group41.png', 'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group27.png',
      'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group38.png', 'http://10.63.22.84:4100/mfe/home/logos/Group41.png', 'http://10.63.22.84:4100/mfe/home/logos/Group24.png', 'http://10.63.22.84:4100/mfe/home/logos/Group27.png','http://10.63.22.84:4100/mfe/home/logos/Group30.png',
    ].map(src => ({ src }));
  
  // Deteksi ukuran layar dengan breakpoint yang lebih spesifik
  const isMobile = ref(false);
  const isTablet = ref(false);
  
  const updateScreenSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      isMobile.value = width < 768;
      isTablet.value = width >= 768 && width < 1024;
    }
  };
  
  onMounted(() => {
    if (typeof window !== "undefined") {
      updateScreenSize();
      window.addEventListener('resize', updateScreenSize);
    }
  });
  
  onBeforeUnmount(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener('resize', updateScreenSize);
    }
  });
  
  // Logika tampilan ikon dengan jumlah yang disesuaikan
  const displayedIcons = computed(() => {
    if (isMobile.value) return icons.slice(0, 4);  // Mobile (4 ikon, 2x2)
    if (isTablet.value) return icons.slice(0, 12);  // Tablet (12 ikon, 4x3)
    return [];  // Desktop tidak pakai icons
  });
  </script>
  
  <style scoped>
  section {
    background-color: #002B46;
  }
  
  /* Smooth transitions untuk responsive changes */
  .transition-all {
    transition: all 0.5s ease-in-out;
  }
  
  /* Hover effects untuk icons */
  .transform:hover {
    transform: scale(1.05);
  }
  </style>
