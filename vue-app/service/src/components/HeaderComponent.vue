<template>
  <header class="header-container bg-blue-gradient">
      <img 
      src="https://i.imgur.com/VcR8ROg.png" 
      alt="Header Background" 
      class="header-image"
      />
    <h1 class="header-text">
      {{ headerText }}
    </h1>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    headerText: {
      type: String,
      default: "Technology & Service"
    }
  }
}
</script>

<style scoped>

.header-container {
  @apply relative w-full h-36 overflow-hidden flex items-center ;
}

.header-text {
  @apply relative ml-28 text-3xl md:text-5xl font-bold text-transparent font-sans;
  -webkit-text-stroke: 1px #ffffff;
  z-index: 1;
}
.header-image {
position: absolute;
bottom: 0;
right: 0;
width: 800px;
height: auto;
}
</style>

