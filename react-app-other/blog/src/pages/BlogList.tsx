import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import FilterTabs from '../components/FilterTabs';
import ArticleGrid from '../components/ArticleGrid';
import { Article, Category } from '../types';
import { testConnection, getCategories, getArticles } from '../services/api-simple'

const BlogList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6; // 6 artikel per halaman

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');
      
      try {
        // Test connection first
        const connectionOk = await testConnection();
        
        if (!connectionOk) {
          setError('Cannot connect to Strapi server');
          return;
        }

        // Load categories and articles simultaneously
        const [categoriesData, articlesData] = await Promise.all([
          getCategories(),
          getArticles()
        ]);
        
        // Add "All" category
        const allCategories: Category[] = [
          { id: 'all', name: 'All', active: true },
          ...categoriesData.map(cat => ({ ...cat, active: false }))
        ];

        // Set states
        setCategories(allCategories);
        setArticles(articlesData);

      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data from Strapi');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter articles based on selected category and search query
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      // Find the selected category name
      const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      
      if (selectedCategoryName) {
        filtered = filtered.filter(article => 
          article.category.toLowerCase() === selectedCategoryName.toLowerCase()
        );
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.author && article.author.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [articles, selectedCategory, searchQuery, categories]);

  // Update categories with active state
  const categoriesWithActiveState = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      active: cat.id === selectedCategory
    }));
  }, [categories, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Clear search function (optional)
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
          <br />
          <small>Make sure Strapi is running on http://10.63.22.74:1337</small>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />
      
      <SearchSection 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
      />
      
      <FilterTabs 
        categories={categoriesWithActiveState} 
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />

      {/* Results Info */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
          </span>
          
          {selectedCategory !== 'all' && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              Category: {categories.find(cat => cat.id === selectedCategory)?.name || selectedCategory}
            </span>
          )}
          
          {searchQuery && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              Search: "{searchQuery}"
            </span>
          )} 

           {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-blue-600 hover:text-blue-800 text-xs underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      <ArticleGrid 
        articles={currentArticles} 
        loading={loading}
        emptyMessage={
          searchQuery || selectedCategory !== 'all' 
            ? "No articles found matching your criteria."
            : "No articles available."
        }
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              const showPage = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (!showPage) {
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-3 py-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
};

export default BlogList;