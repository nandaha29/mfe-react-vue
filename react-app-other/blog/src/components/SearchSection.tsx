import React, { useState, useEffect } from 'react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  searchQuery?: string; // Tambahkan untuk controlled component
  onClearSearch?: () => void; // Tambahkan untuk clear functionality
  placeholder?: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ 
  onSearch, 
  searchQuery = '', // Default value
  onClearSearch,
  placeholder = 'Your Keyword'
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync dengan prop searchQuery dari parent
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    // Real-time search (optional - hapus jika tidak mau)
    onSearch(value);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
    onClearSearch?.();
  };

  return (
    <div className="flex justify-center mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder}
            value={localQuery}
            onChange={handleInputChange}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Clear button - muncul jika ada input */}
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchSection;