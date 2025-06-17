<template>
  <Header />
  <div class="mx-auto px-28 py-12">
    <!-- section about -->
    <div class="text-center mb-10">
      <h1 class="heading-2 mb-2 text-blue-900 py-4">Certa Systems Indonesia</h1>
      <p class="normal-text max-w-6xl mx-auto leading-relaxed">
        PT Certa Systems Indonesia is a technology service provider that focuses
        on open-source solutions, particularly in the development,
        implementation, management, and support of Linux-based systems. The
        company offers a range of services and products designed to meet the
        needs of complex IT infrastructures and support optimal system
        integration. With experience in providing enterprise-level open-source
        solutions, Certa Systems Indonesia is committed to reducing operational
        costs while enhancing flexibility and system integration for their
        clients.
      </p>
    </div>

    <!-- section company -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      <!-- Looping Card -->
      <div
        v-for="(item, index) in companyServices"
        :key="index"
        class="bg-white p-8 rounded-lg shadow-lg border border-gray-200 h-full flex flex-col items-center hover:border-blue-600 transition-all duration-300"
      >
        <h3 class="text-xl font-bold text-blue-800 mb-4 text-center">
          {{ item.title }}
        </h3>
        <p class="text-gray-700 text-center">
          {{ item.description }}
        </p>
      </div>
    </div>

    <!-- section our client -->
    <Client />

    <!-- section work -->
    <section class="bg-white text-center py-16">
      <!-- Title -->
      <h2 class="text-2xl md:text-3xl font-bold text-blue-900 mb-8">
        Why Work With Us?
      </h2>

      <!-- Card Container -->
      <div class="max-w-3xl mx-auto space-y-6">
        <div
          v-for="(item, index) in benefits"
          :key="index"
          class="flex justify-between items-center p-5 border rounded-xl shadow-md border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <!-- Text Section -->
          <div class="text-left">
            <h3 class="text-lg md:text-xl font-semibold text-gray-900">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm md:text-base">
              {{ item.description }}
            </p>
          </div>

          <!-- Check Icon -->
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
          >
            ✔
          </div>
        </div>
      </div>
    </section>

    <!-- section call -->
    <!-- Wrapper -->
    <div class="cointainer mx-auto px-28 py-12">
      <Wrapper
        title="Looking for a reliable IT partner?"
        description="Want to learn more about our expertise? Let’s discuss how we can support your IT needs."
        buttonText="Contact Us"
        buttonLink="https://yourwebsite.com/contact"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Header from "./HeaderComponent.vue";
import Client from "./ClientSection.vue";
import Wrapper from "./WrapperComponent.vue";
// import {
//   publishMessage,
//   subscribeMessage,
// } from "/mnt/workspace/mfe-certa-web/baseApp/src/natsBus";

const appName = "About";
const lastPage = ref(null);

const companyServices = ref([
  {
    title: "Open Source Solutions",
    description:
      "We specialize in implementing and supporting open-source technologies tailored to your business needs.",
  },
  {
    title: "System Integration",
    description:
      "Seamlessly connect your existing systems with new solutions for improved operational efficiency.",
  },
  {
    title: "IT Infrastructure",
    description:
      "Build robust and scalable IT foundations that support your organization's growth and innovation.",
  },
  {
    title: "Technical Support",
    description:
      "Get reliable assistance and maintenance for your Linux-based systems and open-source applications.",
  },
]);

const benefits = [
  {
    title: "Trusted IT Partner",
    description: "Years of experience in enterprise technology.",
  },
  {
    title: "Flexible & Scalable Solutions",
    description: "Tailored IT infrastructure based on open-source.",
  },
  {
    title: "Proven Expertise",
    description: "Backed by industry-certified professionals.",
  },
];

// const handleNavigation = (message) => {
//   if (message.page !== appName) {
//     console.log(
//       `📥 [${appName}] Received: ${message.action} from ${message.page}`
//     );
//     lastPage.value = message.page;
//   }
// };

// onMounted(() => {
//   subscribeMessage(handleNavigation);
//   publishMessage("entering", appName);
//   console.log(`📢 [${appName}] Published: entering ${appName}`);
// });

// onUnmounted(() => {
//   publishMessage("leaving", appName);
//   console.log(`📢 [${appName}] Published: leaving ${appName}`);
// });
</script>

