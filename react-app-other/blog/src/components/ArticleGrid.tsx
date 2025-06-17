import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
  emptyMessage?: string; // Tambahkan ini untuk handle empty state
  className?: string;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ 
  articles, 
  loading = false,
  emptyMessage = "No articles available.",
  className = ''
}) => {
  // Loading state
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-200 rounded-lg h-80 animate-pulse"
          >
            {/* Loading skeleton detail */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state - jika tidak ada articles
  if (!articles || articles.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        {/* Empty state icon */}
        <div className="mx-auto mb-4">
          <svg 
            className="h-12 w-12 text-gray-400 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Articles Found
        </h3>
        
        <p className="text-gray-500 max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  // Articles grid - jika ada articles
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {articles.map((article) => (
        <ArticleCard 
          key={`${article.id}-${article.category}`} // Force re-render dengan category
          article={article} 
        />
      ))}
    </div>
  );
};

export default ArticleGrid;