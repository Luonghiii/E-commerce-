
import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onProductClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input after animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
        setResults([]);
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-white dark:bg-brand-dark-bg animate-fade-in-down flex flex-col">
       {/* Header */}
       <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Search Store</div>
            <button 
                onClick={onClose}
                className="p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:rotate-90 transition-transform text-brand-dark dark:text-white"
            >
                <X size={24} />
            </button>
       </div>

       {/* Search Input */}
       <div className="container mx-auto px-6 py-4">
            <div className="relative border-b-2 border-brand-dark dark:border-white/20 focus-within:border-brand-accent dark:focus-within:border-white transition-colors">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={32} />
                <input 
                    ref={inputRef}
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What are you looking for?" 
                    className="w-full bg-transparent py-4 pl-12 pr-4 text-3xl md:text-5xl font-black text-brand-dark dark:text-white placeholder-gray-300 dark:placeholder-gray-700 outline-none"
                />
            </div>
       </div>

       {/* Results Area */}
       <div className="flex-1 overflow-y-auto container mx-auto px-6 py-8">
            {query && (
                <div className="mb-6 text-sm text-gray-500">
                    {results.length === 0 ? 'No results found.' : `Found ${results.length} results.`}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map(product => (
                    <div 
                        key={product.id} 
                        onClick={() => { onProductClick(product); onClose(); }}
                        className="flex items-center gap-4 p-4 border border-gray-100 dark:border-white/5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group transition-colors"
                    >
                        <div className="w-16 h-20 bg-gray-200 rounded-md overflow-hidden">
                             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase">{product.category}</p>
                            <h4 className="font-bold text-brand-dark dark:text-white group-hover:text-brand-accent transition-colors">{product.name}</h4>
                            <p className="text-sm font-semibold mt-1 text-gray-900 dark:text-gray-300">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                            </p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                            <ArrowRight size={20} className="text-brand-accent" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Links if no query */}
            {!query && (
                <div className="mt-8">
                    <h4 className="font-bold text-gray-400 text-sm uppercase tracking-widest mb-4">Trending Now</h4>
                    <div className="flex flex-wrap gap-3">
                        {['Hoodie', 'Cargo Pants', 'Sneakers', 'Streetwear', 'Accessories'].map(tag => (
                            <button 
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm font-medium text-brand-dark dark:text-gray-300 hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
       </div>
    </div>
  );
};

export default SearchModal;
