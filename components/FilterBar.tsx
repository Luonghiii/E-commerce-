import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
  totalProducts: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeCategory, 
  onCategoryChange, 
  activeSort, 
  onSortChange,
  totalProducts
}) => {
  return (
    <div className="w-full mb-10 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
        
        {/* Mobile / Tablet Horizontal Scroll for Categories */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="flex space-x-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === cat
                    ? 'bg-brand-dark text-white border-brand-dark dark:bg-white dark:text-brand-dark dark:border-white'
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-brand-dark dark:text-gray-400 dark:border-white/10 dark:hover:border-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Count */}
        <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
            {totalProducts} products found
          </span>
          
          <div className="relative group">
            <select 
              value={activeSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-transparent pl-4 pr-10 py-2 font-bold text-sm text-brand-dark dark:text-white border-none focus:ring-0 cursor-pointer text-right"
            >
              <option value="newest">Newest Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark dark:text-white" />
          </div>
        </div>
      </div>
      
      {/* Mobile Only Counter */}
      <div className="sm:hidden text-xs text-gray-500 dark:text-gray-400 text-center uppercase tracking-widest">
        Showing {totalProducts} results
      </div>
    </div>
  );
};

export default FilterBar;