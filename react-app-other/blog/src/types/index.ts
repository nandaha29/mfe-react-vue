// Base Article interface
export interface Article {
  id: number;
  title: string;
  description: string;
  content?: string; 
  image: string;
  category: string;
  readTime: string;
  link: string;
  publishedAt?: string;
  author?: string;
  
  // Tambahan fields dari Strapi
  documentId?: string;
  slug?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Category interface
export interface Category {
  id: string;
  name: string;
  active: boolean;
  count?: number;
  
  // Tambahan fields dari Strapi
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// Related Article interface (untuk sidebar/rekomendasi)
export interface RelatedArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  link?: string;
  author?: string;
}

// Filter state interface
export interface FilterState {
  selectedCategory: string;
  searchTerm?: string;
  sortBy?: 'date' | 'title' | 'author';
  sortOrder?: 'asc' | 'desc';
}

// Strapi specific interfaces (untuk transformasi data)
export interface StrapiArticleResponse {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: {
    id: number;
    header: string;
    text: string;
  } | null;
  image: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    formats?: {
      small?: ImageFormat;
      thumbnail?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
  } | null;
  category: {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  } | null;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiCategoryResponse {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// API Response interfaces
export interface StrapiApiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta?: any;
}

// Loading and Error states
export interface LoadingState {
  articles: boolean;
  categories: boolean;
  articleDetail: boolean;
}

export interface ErrorState {
  articles?: string;
  categories?: string;
  articleDetail?: string;
  connection?: string;
}

// Hook return types
export interface UseArticlesReturn {
  articles: Article[];
  categories: Category[];
  filteredArticles: Article[];
  selectedCategory: string;
  searchQuery: string;
  loading: LoadingState;
  error: ErrorState;
  handleCategoryChange: (categoryId: string) => void;
  handleSearch: (query: string) => void;
  clearFilters: () => void;
}

// Component prop types
export interface ArticleCardProps {
  article: Article;
  showCategory?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  showCount?: boolean;
}

export interface SearchProps {
  onSearch: (query: string) => void;
  searchQuery?: string;
  placeholder?: string;
  onClearSearch?: () => void;
}

// Utility types
export type ArticleSortBy = 'date' | 'title' | 'author' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  key: ArticleSortBy;
  direction: SortOrder;
}

// Constants/Enums
export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum CategoryType {
  TECH = 'tech',
  BUSINESS = 'business',
  LIFESTYLE = 'lifestyle',
  NEWS = 'news'
}