<template>
  <section class="w-full py-16 px-6 md:px-16 lg:px-24 bg-gray-50">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
        Explore Insights in Our Blog
      </h2>
      <p class="text-gray-700 text-lg max-w-2xl mx-auto">
        Find tips, tricks, information on our blog, and get insights today.
      </p>
    </div>

    <!-- Articles Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <!-- Loading skeleton -->
      <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div class="h-48 bg-gray-200"></div>
        <div class="p-4 space-y-3">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div v-for="article in articles" :key="article.id" 
           class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <!-- Article Image -->
        <div class="relative">
          <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover" />
          <span class="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {{ article.category }}
          </span>
        </div>
        
        <!-- Article Content -->
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2 text-gray-900 h-12 line-clamp-2">
            {{ article.title }}
          </h3>
          <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
            {{ article.description }}
          </p>
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500">{{ article.readTime }}</span>
            <a :href="article.link" class="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">No articles available at the moment.</p>
    </div>

    <!-- View All Button -->
    <div class="text-center mt-12">
      <a href="/blog" 
         class="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg">
        View All Articles
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLatestArticles } from '../services/blog-api.js';

const articles = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    articles.value = await getLatestArticles(3);
  } catch (error) {
    console.error('Error loading articles:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
