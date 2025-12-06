import React from 'react';
import { Plus, Heart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group relative flex flex-col cursor-pointer" onClick={() => onClick(product)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-brand-dark dark:bg-white dark:text-brand-dark text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            New Drop
          </span>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button 
            className="bg-white dark:bg-brand-dark-surface dark:text-white p-2 rounded-full shadow-lg hover:bg-brand-accent hover:text-white dark:hover:bg-brand-accent transition-colors"
            onClick={(e) => { e.stopPropagation(); /* Logic for wishlist */ }}
          >
            <Heart size={18} />
          </button>
           <button 
            className="bg-white dark:bg-brand-dark-surface dark:text-white p-2 rounded-full shadow-lg hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark transition-colors"
          >
            <Eye size={18} />
          </button>
        </div>

        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;