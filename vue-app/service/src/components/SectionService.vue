<template>
  <Header />
  <div class="container mx-auto px-6 md:px-28 py-12 ">
    <div class="text-center mb-10">
      <h1 class="heading-2 mb-2">Services Offered</h1>
      <p class="normal-text max-w-2xl mx-auto">
        Our Expertise in Open-Source & IT Infrastructure
      </p>
    </div>

    <!-- Services List -->
    <div
      v-for="(service, serviceIndex) in services"
      :key="serviceIndex"
      class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
    >
      <!-- Left: Title & Description -->
      <div class="border-r pr-0 md:pr-8 border-gray-300">
        <h2 class="heading-2">{{ service.title }}</h2>
        <p class="normal-text mt-4">
          {{ service.description }}
        </p>
      </div>

      <!-- Right: Accordion -->
      <div class="col-span-2">
        <transition-group name="accordion-fade" tag="div">
          <div
            v-for="(subService, subServiceIndex) in service.subservices"
            :key="subService.id"
            class="accordion-subService"
            :class="{ active: activeIndices[serviceIndex] === subServiceIndex }"
          >
            <!-- Accordion Header -->
            <div class="accordion-header" @click="toggle(serviceIndex, subServiceIndex)">
              <h3>{{ subService.title }}</h3>
              <span class="icon-container" :class="{ active: activeIndices[serviceIndex] === subServiceIndex }">
                <svg
                  class="icon"
                  :class="{ rotate: activeIndices[serviceIndex] === subServiceIndex }"
                  width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>

            <!-- Accordion Content with Transition -->
            <transition name="accordion-slide">
              <div
                v-if="activeIndices[serviceIndex] === subServiceIndex"
                class="accordion-content"
              >
                <p>{{ subService.description }}</p>
              </div>
            </transition>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Call to Action -->
    <Wrapper
      title="Looking for a reliable IT partner?"
      description="We provide the best IT solutions for your business."
      buttonText="Contact Us"
      buttonLink="https://yourwebsite.com/contact"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
// import Wrapper from "./components/WrapperComponent.vue";
// import Header from "./components/HeaderComponent.vue";
import Wrapper from "./WrapperComponent.vue";
import Header from "./HeaderComponent.vue";

// Dummy data langsung di sini
const services = ref([
  {
    id: 1,
    title: "Cloud Infrastructure",
    description: "Deploy, scale, and manage your cloud resources efficiently.",
    subservices: [
      {
        id: 11,
        title: "AWS Consulting",
        description: "Expert guidance and solutions for AWS cloud."
      },
      {
        id: 12,
        title: "Azure Migration",
        description: "Seamless migration to Microsoft Azure."
      }
    ]
  },
  {
    id: 2,
    title: "DevOps & Automation",
    description: "Automate your CI/CD pipeline and infrastructure.",
    subservices: [
      {
        id: 21,
        title: "CI/CD Implementation",
        description: "Set up and optimize your continuous integration and deployment."
      },
      {
        id: 22,
        title: "Infrastructure as Code",
        description: "Automate infrastructure with tools like Terraform and Ansible."
      }
    ]
  }
]);

const activeIndices = ref({});

const toggle = (serviceIndex, subServiceIndex) => {
  activeIndices.value[serviceIndex] =
    activeIndices.value[serviceIndex] === subServiceIndex ? null : subServiceIndex;
};
</script>

<style scoped>
.accordion-subService {
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s, border-color 0.3s;
  margin-bottom: 16px;
  background: #fff;
  overflow: hidden;
}
.accordion-subService.active {
  border-color: #0057ff;
  box-shadow: 0 4px 16px rgba(0, 87, 255, 0.13);
}
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}
.accordion-header:hover {
  background: #f4f8ff;
}
.icon-container {
  width: 36px;
  height: 36px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.icon-container.active {
  background: linear-gradient(45deg, #0057ff, #00d4ff);
}
.icon {
  transition: transform 0.3s, stroke 0.3s;
  stroke: #0057ff;
}
.icon-container.active .icon {
  stroke: #fff;
}
.icon.rotate {
  transform: rotate(180deg);
}
.accordion-content {
  padding: 18px 20px;
  border-top: 1px solid #eee;
  background: #f9faff;
  animation: fadeIn 0.4s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px);}
  to { opacity: 1; transform: translateY(0);}
}
.accordion-slide-enter-active,
.accordion-slide-leave-active {
  transition: max-height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s;
}
.accordion-slide-enter-from,
.accordion-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-slide-enter-to,
.accordion-slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
.accordion-fade-enter-active, .accordion-fade-leave-active {
  transition: opacity 0.3s;
}
.accordion-fade-enter-from, .accordion-fade-leave-to {
  opacity: 0;
}
.accordion-fade-enter-to, .accordion-fade-leave-from {
  opacity: 1;
}
</style>
