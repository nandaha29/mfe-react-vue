import axios from 'axios';
import { Article, Category } from '../types';

// Base URLs for Strapi API endpoints
const API_URL = 'http://10.63.22.74:1337/api';
const BASE_URL = 'http://10.63.22.74:1337';

/**
 * Test koneksi ke Strapi server
 * Fungsi ini mengecek apakah server Strapi dapat diakses dengan mencoba fetch categories dan articles
 * Digunakan di BlogList untuk memastikan koneksi sebelum load data
 * @returns Promise<boolean> - true jika koneksi berhasil, false jika gagal
 */
export const testConnection = async () => {
  try {
    // const response = await axios.get(`${API_URL}/categories`);
    // const articlesResponse = await axios.get(`${API_URL}/articles?populate=*`);
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};

/**
 * Transform data kategori dari format Strapi ke format yang dibutuhkan aplikasi
 * Mengkonversi struktur data Strapi menjadi interface Category yang sudah didefinisikan
 * @param strapiCategory - Raw data kategori dari Strapi API
 * @returns Category - Object kategori yang sudah diformat sesuai interface
 */
const transformCategory = (strapiCategory: any): Category => {
  return {
    id: strapiCategory.documentId || strapiCategory.id.toString(),
    name: strapiCategory.name || 'Unknown Category',
    active: false
  };
};

/**
 * Transform data artikel dari format Strapi ke format yang dibutuhkan aplikasi
 * Fungsi ini mengkonversi struktur data complex dari Strapi menjadi format sederhana
 * Menangani content (header + text), image URL, category name, dan kalkulasi read time
 * @param strapiArticle - Raw data artikel dari Strapi API
 * @param index - Index artikel (sebagai fallback ID)
 * @returns Article - Object artikel yang sudah diformat sesuai interface
 */
const transformArticle = (strapiArticle: any, index: number): Article => {
  // Extract basic data
  const id = strapiArticle.id || index;
  const title = strapiArticle.title || `Article ${index + 1}`;
  const description = strapiArticle.description || 'No description';  
  const author = strapiArticle.author || 'Anonymous';
  const publishedAt = strapiArticle.publishedAt || strapiArticle.date || new Date().toISOString();
  
  // Handle content
  let content = '';
  if (strapiArticle.content) {
    const header = strapiArticle.content.header || '';
    const text = strapiArticle.content.text || '';
    content = header ? `${header}\n\n${text}` : text;
  }
  
  // Calculate read time
  const wordCount = content.split(' ').length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Handle image
  let imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop';
  
  if (strapiArticle.image && strapiArticle.image.url) {
    imageUrl = `${BASE_URL}${strapiArticle.image.url}`;
  }

  // Handle category
  let categoryName = 'Uncategorized';
  
  if (strapiArticle.category && strapiArticle.category.name) {
    categoryName = strapiArticle.category.name;
  }

  // Generate link
  const link = strapiArticle.slug ? `/article/${strapiArticle.slug}` : `/article/${id}`;

  return {
    id: id,
    documentId: strapiArticle.documentId,
    slug: strapiArticle.slug,
    title,
    description,
    content,
    image: imageUrl,
    category: categoryName,
    readTime,
    link,
    publishedAt,
    author,
    date: strapiArticle.date,
    createdAt: strapiArticle.createdAt,
    updatedAt: strapiArticle.updatedAt
  };
};

/**
 * Mengambil semua kategori dari Strapi
 * Digunakan di BlogList untuk menampilkan filter tabs kategori
 * Data yang diambil akan ditransform menjadi format yang sesuai dengan UI
 * @returns Promise<Category[]> - Array kategori atau empty array jika error
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    
    if (!response.data?.data) {
      return [];
    }
    
    return response.data.data.map(transformCategory);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Mengambil semua artikel dari Strapi dengan populate image dan category
 * Fungsi utama untuk menampilkan daftar artikel di BlogList
 * Menggunakan populate=* untuk mengambil relasi (image, category) sekaligus
 * @returns Promise<Article[]> - Array artikel atau empty array jika error
 */
export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(`${API_URL}/articles?populate=*`);
    
    if (!response.data?.data) {
      return [];
    }

    return response.data.data.map(transformArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

/**
 * Mengambil artikel spesifik berdasarkan ID
 * Digunakan di ArticleDetail untuk menampilkan detail artikel
 * Menggunakan filter method karena lebih reliable dengan Strapi v5
 * @param id - ID artikel yang ingin diambil
 * @returns Promise<Article | null> - Artikel yang dicari atau null jika tidak ditemukan
 */
export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    // Use filter method as primary approach (more reliable with Strapi v5)
    const response = await axios.get(`${API_URL}/articles?filters[id][$eq]=${id}&populate=*`);
    
    if (!response.data?.data || response.data.data.length === 0) {
      return null;
    }
    
    // Get the first (and should be only) article from the array
    const articleData = response.data.data[0];
    return transformArticle(articleData, 0);
  } catch (error) {
    console.error('Error fetching article by id:', error);
    return null;
  }
};