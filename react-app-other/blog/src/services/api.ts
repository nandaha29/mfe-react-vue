import axios from 'axios';
import { Article, Category } from '../types';

const API_URL = 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Transform functions with null checks
const transformArticle = (strapiArticle: any): Article => {
  if (!strapiArticle?.attributes) {
    console.error('Invalid article data:', strapiArticle);
    return {
      id: 0,
      title: 'Error loading article',
      description: 'Failed to load article data',
      content: '',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
      category: 'Error',
      readTime: '0 min read',
      link: '#',
      publishedAt: new Date().toISOString(),
      author: 'System'
    };
  }

  const attributes = strapiArticle.attributes;
  return {
    id: strapiArticle.id,
    title: attributes.title || 'Untitled',
    description: attributes.description || 'No description available',
    content: attributes.content || '',
    image: attributes.image?.data?.attributes?.url 
      ? `http://localhost:1337${attributes.image.data.attributes.url}`
      : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    category: attributes.article_category?.data?.attributes?.name || 'Uncategorized',
    readTime: attributes.readTime || '5 min read',
    link: attributes.link || '#',
    publishedAt: attributes.publishedAt || new Date().toISOString(),
    author: attributes.author || 'Anonymous'
  };
};

const transformCategory = (strapiCategory: any): Category => {
  if (!strapiCategory?.attributes) {
    console.error('Invalid category data:', strapiCategory);
    return {
      id: 'error',
      name: 'Error Category',
      active: false
    };
  }

  return {
    id: strapiCategory.attributes.slug || strapiCategory.id.toString(),
    name: strapiCategory.attributes.name || 'Unknown Category',
    active: false
  };
};

export const fetchArticles = async (params?: {
  category?: string;
  search?: string;
}): Promise<Article[]> => {
  try {
    console.log('Fetching articles with params:', params);
    
    let query = '/articles?populate=*';
    
    const filters: string[] = [];
    
    if (params?.category && params.category !== 'all') {
      filters.push(`filters[article_category][slug][$eq]=${params.category}`);
    }
    
    if (params?.search) {
      filters.push(`filters[title][$containsi]=${encodeURIComponent(params.search)}`);
    }
    
    if (filters.length > 0) {
      query += '&' + filters.join('&');
    }
    
    console.log('API Query:', query);
    
    const response = await api.get(query);
    
    if (!response.data?.data) {
      console.error('Invalid response format:', response.data);
      return [];
    }
    
    return response.data.data.map(transformArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories...');
    
    const response = await api.get('/categories');
    
    if (!response.data?.data) {
      console.error('Invalid categories response:', response.data);
      return [{ id: 'all', name: 'All', active: true }];
    }
    
    const categories = response.data.data.map(transformCategory);
    
    return [
      { id: 'all', name: 'All', active: true },
      ...categories
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [{ id: 'all', name: 'All', active: true }];
  }
};

export const fetchArticleById = async (id: string): Promise<Article | null> => {
  try {
    console.log('Fetching article by id:', id);
    
    const response = await api.get(`/articles/${id}?populate=*`);
    
    if (!response.data?.data) {
      console.error('Article not found:', id);
      return null;
    }
    
    return transformArticle(response.data.data);
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};