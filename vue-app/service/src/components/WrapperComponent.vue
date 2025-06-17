<template>
    <div
      class="relative w-full max-w-8xl mx-auto p-8 rounded-2xl bg-blue-gradient text-white text-center overflow-hidden"
    >
      <!-- Vector di pojok kiri atas -->
      <div class="absolute top-50 -right-14 w-96 h-96">
        <img
          src="http://10.63.22.84:4100/mfe/service/vector-circle.png"
          alt="Vector Top Left"
          class="w-full h-full animate-spin-slow"
        />
      </div>
  
      <!-- Vector di pojok kanan bawah -->
      <div class="absolute bottom-9 -left-14 w-96 h-96">
        <img
          src="http://10.63.22.84:4100/mfe/service/vector-circle.png"
          alt="Vector Bottom Right"
          class="w-full h-full animate-spin-slow"
        />
      </div>
  
      <!-- Konten Utama -->
      <div class="relative z-10">
        <h2 class="text-xl md:text-3xl font-lato font-semibold">
          {{ title }}
        </h2>
        <p class="mt-2 text-sm md:text-xl font-lato">
          {{ description }}
        </p>
        <a
          :href="buttonLink"
          class="mt-4 inline-block bg-white text-blue-primary border-blue-primary border-md font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          {{ buttonText }}
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: "Looking for a reliable IT partner?"
      },
      description: {
        type: String,
        default: "Let's discuss how we can help!"
      },
      buttonText: {
        type: String,
        default: "Get a Consultation"
      },
      buttonLink: {
        type: String,
        default: "#"
      }
    }
  }
  </script>
  
  <style>
  @keyframes spin-slow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  </style>
