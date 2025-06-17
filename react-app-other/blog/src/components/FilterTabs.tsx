import React from 'react';
import { Category } from '../types';

interface FilterTabsProps {
  categories: Category[];
  onCategoryChange: (categoryId: string) => void; // Tambahkan ini
  selectedCategory?: string; // Tambahkan ini
  className?: string;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  categories,
  onCategoryChange, // Destructure ini
  selectedCategory, // Dan ini
  className = ''
}) => {
  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className={`filter-tabs mb-6 ${className}`}>
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${category.active || selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }
            `}
          >
            {category.name}
            {category.count !== undefined && (
              <span className={`ml-2 text-xs ${
                category.active || selectedCategory === category.id
                  ? 'text-blue-100' 
                  : 'text-gray-500'
              }`}>
                ({category.count})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;