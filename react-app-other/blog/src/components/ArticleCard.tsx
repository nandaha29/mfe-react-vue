import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          {article.category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 h-12">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {article.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{article.readTime}</span>
          <Link
            to={`/blog/article/${article.id}`}
            className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;