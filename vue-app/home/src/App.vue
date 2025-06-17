<script setup>
import ContactSection from './components/ContactSection.vue';
import HelloWorld from './components/HelloWorld.vue'
import JumbotronSection from './components/JumbotronSection.vue';
import MissionSection from './components/MissionSection.vue';
import BlogSection from './components/BlogSection.vue';
</script>

<template>

  <!-- <HelloWorld msg="Vite + Vue" /> -->
  
  <JumbotronSection/>
  <MissionSection/>
  <ContactSection/>
  <BlogSection/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
